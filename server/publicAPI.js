class PublicAPI{
    constructor(){
        let DBO=require("./dbo.js");
        this.getIncidentStat=async(req,res)=>{
            let actionTypeSummary={};
            let dboObj=new DBO();

            let finalResult={};
            let isSolvedByCOSSSummary={};
            let a1SystemServicePerformanceSummary=[];
            let nonA1SystemServicePerformanceSummary=[];
            let incidentSummary={};
            try{
                
                let results=await dboObj.getIncidentSummary(req.query.year,req.query.month);
                results.forEach(result => {
                    incidentSummary.h_count_sum=Number(result.h_count_sum);
                    incidentSummary.h_count_sum_pre=Number(result.h_count_sum_pre);
                    incidentSummary.p_count_sum=Number(result.p_count_sum);
                    incidentSummary.p_count_sum_pre=Number(result.p_count_sum_pre);
                    incidentSummary.s_count_sum=Number(result.s_count_sum);
                    incidentSummary.s_count_sum_pre=Number(result.s_count_sum_pre);
                });
                
                results=await dboObj.getActionTypeSummary(req.query.year,req.query.month);
                actionTypeSummary.P=Number(results[0].P);
                actionTypeSummary.R=Number(results[0].R);
                results=await dboObj.getIsSolvedByCOSSSummary(req.query.year,req.query.month);
                isSolvedByCOSSSummary.total=Number(results[0].total);
                isSolvedByCOSSSummary.in_office_hour=Number(results[0].in_office_hour);
                results=await dboObj.getA1SystemServicePerformanceSummary(req.query.year,req.query.month);
                results.forEach(result => {
                    a1SystemServicePerformanceSummary.push(
                        {
                            system_name:result.system_name,
                            H:Number(result.H),
                            H_PRE:Number(result.H_pre),
                            S:Number(result.S),
                            S_PRE:Number(result.S_pre),
                            P:Number(result.P),
                            P_PRE:Number(result.P_pre),
                        }
                    )
                });
                results=await dboObj.getNonA1SystemServicePerformanceSummary(req.query.year,req.query.month);
                results.forEach(result => {
                    nonA1SystemServicePerformanceSummary.push(
                        {
                            system_name:result.system_name,
                            H:Number(result.H),
                            H_PRE:Number(result.H_pre),
                            S:Number(result.S),
                            S_PRE:Number(result.S_pre),
                            P:Number(result.P),
                            P_PRE:Number(result.P_pre),
                        }
                    )
                });
                finalResult.actionTypeSummary=actionTypeSummary;
                finalResult.a1SystemServicePerformanceSummary= a1SystemServicePerformanceSummary;
                finalResult.nonA1SystemServicePerformanceSummary=nonA1SystemServicePerformanceSummary;
                finalResult.isSolvedByCOSSSummary=isSolvedByCOSSSummary;
                finalResult.incidentSummary=incidentSummary;
                res.send(finalResult); 
            }catch (error){
                console.log("Something wrong when getting incident statistic:"+error.stack);
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