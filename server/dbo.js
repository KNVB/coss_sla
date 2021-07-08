class DBO
{
	constructor(){
		let dbConfig = require('./config');
		dbConfig["multipleStatements"]=true;
		dbConfig["insecureAuth"]=true;
	
		const mysql = require('mysql2');
        const connection = mysql.createConnection(dbConfig);
		this.getA1SystemServicePerformanceSummary=async(search)=>{
			return await this.getServicePerformanceSummary(search,'Y');
		}
		this.getActionTypeSummary=async(search)=>{
			let sqlString="select sum(case when action_type='P' then 1 else 0 end) as P,";
			sqlString+="sum(case when action_type='R' then 1 else 0 end) as R ";
			sqlString+="from incident ";
			sqlString+="where reference_no like ?";
			return await executeQuery(sqlString,[search+"%"]);
		}
		this.getAppreciationLogs=async(search,endDate)=>{
			let sqlString="select ";
			sqlString+="brief_desc,";
			sqlString+="category_name,";
			sqlString+="system_name,";
			sqlString+="reference_no,";
			sqlString+="remark,";
			sqlString+="CONCAT(is_Compliance,";
			sqlString+="		'/',";
			sqlString+="	action_type,"; 
			sqlString+="	case when minute_to_complete is null then '' else concat('/',minute_to_complete) end,";
			sqlString+="	case when is_Solved_By_COSS is null then '' else concat('/',is_Solved_By_COSS) end";
			sqlString+=") as compact ";			
			sqlString+="from incident a inner join system_concerned b on a.system_id=b.system_id ";
			sqlString+="inner join incident_category c on a.category_id=c.category_id ";
			sqlString+="where reference_no like ? and ";
			sqlString+="reference_no <> ? ";
			sqlString+="order by reference_no";
			return await executeQuery(sqlString,[search+"%",endDate]);
		}
		this.getCategoryList=async()=>{
			let sqlString ="select * from incident_category order by category_name desc";
			return await executeQuery(sqlString);
		}		
		this.getIncidentSummary=async(search)=>{
			let sqlString ="select ";
			sqlString+="case when h_count_sum is null then 0 else h_count_sum end as h_count_sum,h_count_sum_pre,";
			sqlString+="case when p_count_sum is null then 0 else p_count_sum end as p_count_sum,p_count_sum_pre,";
			sqlString+="case when s_count_sum is null then 0 else s_count_sum end as s_count_sum,s_count_sum_pre ";
			sqlString+="from ";
			sqlString+="(";
			sqlString+="	SELECT"
			sqlString+="		sum(s_count) AS s_count_sum,";
			sqlString+="		sum(h_count) AS h_count_sum,";
			sqlString+="		sum(p_count) AS p_count_sum";
			sqlString+="	FROM"
			sqlString+="		incident_summary";
			sqlString+="	WHERE";
			sqlString+="		month = ?";
			sqlString+=") as t1,";
			sqlString+="(";
			sqlString+="SELECT";
			sqlString+="		sum(s_count) AS s_count_sum_pre,";
			sqlString+="		sum(h_count) AS h_count_sum_pre,";
			sqlString+="		sum(p_count) AS p_count_sum_pre";
			sqlString+="	FROM";
			sqlString+="		incident_summary";
			sqlString+="	WHERE";
			sqlString+="		month < ?";
			sqlString+=") as t2";
			return await executeQuery(sqlString,[search,search]);
		}
		this.getIsSolvedByCOSSSummary=async(search)=>{
			let sqlString="select count(*)  as total,";
			sqlString+="sum(case when  left(right(reference_no,5),4) between 800 and 1800 then 1 else 0 end) as in_office_hour ";
			sqlString+="from  incident where reference_no like ? and is_solved_by_coss ='Yes'";
			return await executeQuery(sqlString,[search+"%"]);
		}
		this.getNonA1SystemServicePerformanceSummary=async(search)=>{
			return await this.getServicePerformanceSummary(search,'N');
		}
		this.getServicePerformanceSummary=async(search,isA1System)=>{
			let sqlString ="select ";
			sqlString+="system_name,";
			sqlString+="sum(case when month = ? then h_count else 0 end) as H,";
			sqlString+="sum(case when month < ? then h_count else 0 end) as H_pre,";
			sqlString+="sum(case when month = ? then s_count else 0 end) as S,";
			sqlString+="sum(case when month < ? then s_count else 0 end) as S_pre,";
			sqlString+="sum(case when month = ? then p_count else 0 end) as P,";
			sqlString+="sum(case when month < ? then p_count else 0 end) as P_pre ";
			sqlString+="from incident_summary a inner join system_concerned b on a.system_id=b.system_id ";
			sqlString+="where is_A1_System=?";
			sqlString+="group by a.system_id,system_name";
			return await executeQuery(sqlString,[search,search,search,search,search,search,isA1System]);
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