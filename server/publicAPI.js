class PublicAPI{
    constructor(){
        let DBO=require("./dbo.js");
        this.getCategoryCount=async(req,res)=>{
            let dboObj=new DBO();
            let finalResult=[];
            try{
                console.log(req.query.year);
                let results=await dboObj.getCategoryCount(req.query.year,req.query.month);
                results.forEach(result => {
                    finalResult.push({
                        base_count_since_2007:result.base_count_since_2007,
                        cat_name:result.category_name,
                        cat_count:result.cat_count
                    }); 
                });
                res.send(finalResult); 
            }catch (error){
                console.log("Something wrong when getting category count:"+error.stack);
            }
            finally{
				dboObj.close();
			};            
        }
        this.getCategoryList=async(req,res)=>{
            let dboObj=new DBO();
            let finalResult=[];
            try{
                let results=await dboObj.getCategoryList();
                results.forEach(result => {
                    finalResult.push({
                        category_id:result.category_id,
                        category_name:result.category_name,
                        base_count_since_2007:Number(result.base_count_since_2007)
                    })
                });
                res.send(finalResult);
            }catch (error){
                console.log("Something wrong when getting category list:"+error.stack);
            }
            finally{
				dboObj.close();
			};            
        }
        this.getSystemList=async(req,res)=>{
            let dboObj=new DBO();
            let finalResult=[];
            try{
                let results=await dboObj.getSystemList();
                results.forEach(result => {
                    finalResult.push({
                        system_id:result.system_id,
                        system_name:result.system_name,
                        is_A1_System:result.is_A1_System
                    })
                });
                res.send(finalResult);
            }catch (error){
                console.log("Something wrong when getting system list:"+error.stack);
            }
            finally{
				dboObj.close();
			};
        }
        this.saveBaseCount=async(req,res)=>{
            let dboObj=new DBO();
            try{
                let result=await dboObj.saveBaseCount(req.body);
                res.status(200).json({result:result})
            }catch (error){
                console.log("Something wrong when saving system base count :"+error.stack);
                res.status(500).json({
                    status: 'error',
                    message: error,
                });
            }
            finally{
				dboObj.close();
			};
        }
        this.saveIncidentList=async(req,res)=>{
            let dboObj=new DBO();
            try{
                let result=await dboObj.saveIncidentList(req.body);
                res.status(200).json({result:result})
            }catch (error){
                console.log("Something wrong when saving incident list:"+error.stack);
                res.status(500).json({
                    status: 'error',
                    message: error,
                });
            }
            finally{
				dboObj.close();
			};
        }
    }
}
module.exports = PublicAPI;