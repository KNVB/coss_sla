class PublicAPI{
    constructor(){
        let DBO=require("./dbo.js");
        let monthFullName = [
            "",
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
        ];
        this.genReport=async(req,res)=>{
            let Docxtemplater = require('docxtemplater');
            let fs = require('fs');
            let path = require('path');
            let PizZip = require('pizzip');
            let dboObj=new DBO();
            let queryResult;
            let statData={
                a1Perforamce:[],
                logs:[],
                nonA1Perforamce:[],
                SUM_A1H:0,
                SUM_A1H_PRE:0,
                SUM_A1P:0,
                SUM_A1P_PRE:0,
                SUM_A1S:0,
                SUM_A1S_PRE:0,
                SUM_H:0,
                SUM_H_PRE:0,
                SUM_P:0,
                SUM_P_PRE:0,
                SUM_S:0,
                SUM_S_PRE:0
            };
            try{
                let search =Number(req.query.year)*100+Number(req.query.month);
                let fileName="COSS SLA Monthly Report "+search+".docx";
                
                statData.reportMonth=monthFullName[Number(req.query.month)]+ " "+req.query.year;
                queryResult=await dboObj.getA1SystemServicePerformanceSummary(search);
               

                queryResult.forEach(result => {
                    statData.a1Perforamce.push(
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
                    statData.SUM_A1H+=Number(result.H);
                    statData.SUM_A1H_PRE+=Number(result.H_pre);
                    statData.SUM_A1P+=Number(result.P);
                    statData.SUM_A1P_PRE+=Number(result.P_pre);
                    statData.SUM_A1S+=Number(result.S);
                    statData.SUM_A1S_PRE+=Number(result.S_pre);
                });
                queryResult=await dboObj.getActionTypeSummary(search);
                statData.P=Number(queryResult[0].P);
                statData.R=Number(queryResult[0].R);
                statData.actionTypeRatio=Number(
                    statData.P / statData.R
                ).toFixed(2) + ":1";

                queryResult=await dboObj.getIncidentSummary(search);                
                statData.h_count_sum=Number(queryResult[0].h_count_sum);
                statData.h_count_sum_pre=Number(queryResult[0].h_count_sum_pre);
                statData.p_count_sum=Number(queryResult[0].p_count_sum);
                statData.p_count_sum_pre=Number(queryResult[0].p_count_sum_pre);
                statData.s_count_sum=Number(queryResult[0].s_count_sum);
                statData.s_count_sum_pre=Number(queryResult[0].s_count_sum_pre);
                
                statData.total_no_of_incident=statData.h_count_sum+statData.p_count_sum+statData.s_count_sum;
                statData.total_no_of_incident_pre=statData.h_count_sum_pre+statData.p_count_sum_pre+statData.s_count_sum_pre;

                queryResult=await dboObj.getIsSolvedByCOSSSummary(search);
                statData.solvedByCOSSTotal=Number(queryResult[0].total);
                statData.in_office_hour=Number(queryResult[0].in_office_hour);
                statData.non_office_hour=statData.solvedByCOSSTotal-statData.in_office_hour;

                queryResult=await dboObj.getNonA1SystemServicePerformanceSummary(search);
                queryResult.forEach(result => {
                    statData.nonA1Perforamce.push(
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
                    statData.SUM_H+=Number(result.H);
                    statData.SUM_H_PRE+=Number(result.H_pre);
                    statData.SUM_P+=Number(result.P);
                    statData.SUM_P_PRE+=Number(result.P_pre);
                    statData.SUM_S+=Number(result.S);
                    statData.SUM_S_PRE+=Number(result.S_pre);
                });


                let content = fs.readFileSync(path.resolve(__dirname, 'template.docx'), 'binary');
                let zip = new PizZip(content);
                let doc = new Docxtemplater(zip, { paragraphLoop: true, linebreaks: true });
                doc.setData(statData);
                doc.render();
	            let buf = doc.getZip().generate({type: 'nodebuffer'});
	            fs.writeFileSync(path.resolve(__dirname, 'output.docx'), buf);
                
                res.download(path.resolve(__dirname, 'output.docx'),fileName.toString());

                
            }catch (error){
                console.log("Something wrong when generating Report:"+error.stack);
            }
            finally{
				dboObj.close();
			};
        }
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