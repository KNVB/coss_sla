class CategoryUtil{
    constructor(){
        let DBO = require("../dbo.js");
        this.getCategoryList=async()=>{
            let dboObj = new DBO();
            let finalResult = [];
            try {
                let results = await dboObj.getCategoryList();
                results.forEach(result => {
                    finalResult.push({
                        category_id: result.category_id,
                        category_name: result.category_name,
                        base_count_since_2007: Number(result.base_count_since_2007)
                    })
                });
                return(finalResult);
            } catch (error) {
                console.log("Something wrong when getting category list:" + error.stack);
            }
            finally {
                dboObj.close();
            };
        }
    }
}
module.exports=CategoryUtil