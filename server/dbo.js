class DBO
{
	constructor(){
		let dbConfig = require('./config');
		dbConfig["multipleStatements"]=true;
		dbConfig["insecureAuth"]=true;
	
		const mysql = require('mysql2');
        const connection = mysql.createConnection(dbConfig);

		this.getCategoryList=async()=>{
			let sqlString ="select * from incident_category order by category_name";
			return await executeQuery(sqlString);
		}

		this.getSystemList=async()=>{
			let sqlString ="select * from system_concerned order by system_name";
			return await executeQuery(sqlString);
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