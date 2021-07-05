class DBO
{
	constructor(){
		let dbConfig = require('./config');
		dbConfig["multipleStatements"]=true;
		dbConfig["insecureAuth"]=true;
	
		const mysql = require('mysql2');
        const connection = mysql.createConnection(dbConfig);
		
		this.getActionTypeSummary=async(year,month)=>{
			let search =year*100+Number(month);
			let sqlString="select sum(case when action_type='P' then 1 else 0 end) as P,";
			sqlString+="sum(case when action_type='R' then 1 else 0 end) as R ";
			sqlString+="from incident ";
			sqlString+="where reference_no like ?";
			return await executeQuery(sqlString,[search+"%"]);
		}
		this.getA1SystemServicePerformanceSummary=async(year,month)=>{
			return await this.getServicePerformanceSummary(year,month,'Y');
		}
		this.getCategoryList=async()=>{
			let sqlString ="select * from incident_category order by category_name desc";
			return await executeQuery(sqlString);
		}		
		this.getIncidentSummary=async(year,month)=>{
			let search =year*100+Number(month);
			let sqlString="SELECT category_name,";
			sqlString+="sum(case when month = ? then count else 0 end) as this_month,";
			sqlString+="sum(case when month < ? then count else 0 end) as since_2007 ";
			sqlString+="FROM incident_summary a inner join incident_category b ";
			sqlString+="on a.category_id=b.category_id ";
			sqlString+="group by a.category_id";			
			return await executeQuery(sqlString,[search,search]);
		}
		this.getIsSolvedByCOSSSummary=async(year,month)=>{
			let search =year*100+Number(month);
			let sqlString="select count(*)  as total,";
			sqlString+="sum(case when  left(right(reference_no,5),4) between 800 and 1800 then 1 else 0 end) as in_office_hour ";
			sqlString+="from  incident where reference_no like ? and is_solved_by_coss ='Yes'";
			return await executeQuery(sqlString,[search+"%"]);
		}
		this.getNonA1SystemServicePerformanceSummary=async(year,month)=>{
			return await this.getServicePerformanceSummary(year,month,'N');
		}
		this.getServicePerformanceSummary=async(year,month,isA1System)=>{
			let search =year*100+Number(month);
			let sqlString="select system_name,";
			sqlString+="sum(case when category_id='H' then 1 else 0 end) as H,";
            sqlString+="sum(case when category_id='S' then 1 else 0 end) as S,";
            sqlString+="sum(case when category_id='P' then 1 else 0 end) as P ";
			sqlString+="from system_concerned a left join incident b on a. system_id=b.system_id and ";
			sqlString+="reference_no like ? ";
			sqlString+="where is_A1_System=? ";
			sqlString+="group by system_name";
			return await executeQuery(sqlString,[search+"%",isA1System]);
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