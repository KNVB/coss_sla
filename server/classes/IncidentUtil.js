class IncidentUtil{
    constructor(){
        let DBO = require("../dbo.js");
        this.saveIncidentList=async(incidentList)=>{
            let dboObj = new DBO();
            try {
                let result = await dboObj.saveIncidentList(incidentList);
                return true
            } catch (error) {
                console.log("Something wrong when saving incident list:" + error.stack);
            }
            finally {
                dboObj.close();
            };
        }
    }
}
module.exports=IncidentUtil