class DBO
{
	constructor(){
		let dbConfig = require('./config');
		dbConfig["multipleStatements"]=true;
		dbConfig["insecureAuth"]=true;
	
		const mysql = require('mysql2');
        const connection = mysql.createConnection(dbConfig);

		this.getCategoryList=async()=>{
			let sqlString ="select * from incident_category order by category_name desc";
			return await executeQuery(sqlString);
		}

		this.getSystemList=async()=>{
			let sqlString ="select * from system_concerned order by system_name";
			return await executeQuery(sqlString);
		}
		this.saveBaseCount=async(systemBaseCountList)=>{
			let data;
			let sql="replace into system_base_count (system_id,cat_id,count) values (?,?,?)";
			Object.keys(systemBaseCountList).forEach(systemId=>{
				data=[systemId,"H",systemBaseCountList[systemId]["H"]];
				executeQuery(sql,data);
				data=[systemId,"P",systemBaseCountList[systemId]["P"]];
				executeQuery(sql,data);
				data=[systemId,"S",systemBaseCountList[systemId]["S"]];
				executeQuery(sql,data);
			})
			return true;
		}
		this.saveIncidentList=async(incidentList)=>{
			//console.log(incidentList);
			let sqlString="";
			let sqlTemplate = "Replace into incident (reference_no,category_id,  system_id,brief_desc,remark,is_Compliance,action_type";
			let valuesString,valuesTemplate = "?,?,?,?,?,?,?";
			
			for (let i=0;i<incidentList.length;i++){
				let compactDataList=incidentList[i].compactData.split("/");
				let data=[incidentList[i].refNo.trim(),incidentList[i].catId,incidentList[i].systemId,incidentList[i].briefDesc.trim(),incidentList[i].remark.trim()];
				sqlString=sqlTemplate;
				valuesString=valuesTemplate;
				data.push(compactDataList[0].trim());
				data.push(compactDataList[1].trim());

				if (compactDataList[2]){
					data.push(compactDataList[2].trim());
					valuesString+=",?";
					sqlString+=",minute_to_complete";
				}

				if (compactDataList[3]){
					data.push(compactDataList[3].trim());
					valuesString+=",?";
					sqlString +=",is_Solved_By_COSS";
				}
				sqlString=sqlString+") values ("+valuesString+")";
				//console.log(sqlString);
				//console.log(data);
				executeQuery(sqlString,data);
				
			}
			return true;
		} 
		this.close=()=>{
			connection.end(err=>{
				if (err) throw err;
				console.log("Disconnect from "+dbConfig["host"]+" successfully!");
			});
		}
		function executeQuery(sql,para){
			return connection.promise().query(sql,para)
            .then(([rows]) => {
				return rows
			})
            .catch(err=>{                
               throw(err);
            })	
		}
    }
}
module.exports = DBO;    