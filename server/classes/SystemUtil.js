class SystemUtil{
    constructor(){
        let DBO = require("../dbo.js");
        this.getSystemList = async () => {
            let dboObj = new DBO();
            let finalResult = [];
            try {
                let results = await dboObj.getSystemList();
                results.forEach(result => {
                    finalResult.push({
                        system_id: result.system_id,
                        system_name: result.system_name,
                        is_A1_System: result.is_A1_System
                    })
                });
                return finalResult;
            } catch (error) {
                console.log("Something wrong when getting system list:" + error.stack);
            }
            finally {
                dboObj.close();
            };
        }
    }
}
module.exports = SystemUtil;