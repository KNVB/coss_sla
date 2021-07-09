class PublicAPI {
    constructor() {
        let DBO = require("./dbo.js");
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
        this.generateMonthlyReport = async (req, res) => {
            let Docxtemplater = require('docxtemplater');
            let fs = require('fs');
            let path = require('path');
            let PizZip = require('pizzip');
            let search = Number(req.query.year) * 100 + Number(req.query.month);
            let fileName = "COSS SLA Monthly Report " + search + ".docx";
            try {
                let content = fs.readFileSync(path.resolve(__dirname, 'template.docx'), 'binary');
                let zip = new PizZip(content);
                let doc = new Docxtemplater(zip, { paragraphLoop: true, linebreaks: true });
                let statData = await this.getStatData(req.query.year, req.query.month);
                statData.reportMonth = monthFullName[Number(req.query.month)] + " " + req.query.year;
                doc.setData(statData);
                doc.render();
                let buf = doc.getZip().generate({ type: 'nodebuffer' });
                fs.writeFileSync(path.resolve(__dirname, 'output.docx'), buf);
                res.download(path.resolve(__dirname, 'output.docx'), fileName.toString());
            } catch (error) {
                console.log("Something wrong when generating monthly report.");
                function replaceErrors(key, value) {
                    if (value instanceof Error) {
                        return Object.getOwnPropertyNames(value).reduce(function (error, key) {
                            error[key] = value[key];
                            return error;
                        }, {});
                    }
                    return value;
                }
                console.log(JSON.stringify({ error: error }, replaceErrors));
                res.sendStatus(500);
            }
        }
        this.generateMonthlySummaryData = async (req, res) => {
            let search = Number(req.query.year) * 100 + Number(req.query.month);
            let dboObj = new DBO();
            try {
                let result=await dboObj.generateMonthlySummaryData(search);
                res.send({result:true});
            } catch (error) {
                res.sendStatus(500);
            }
            finally {
                dboObj.close();
            };
        }
        this.getIncidentStat = async (req, res) => {
            res.send(await this.getStatData(req.query.year, req.query.month));
        }
        this.getStatData = async (year, month) => {
            let search = Number(year) * 100 + Number(month);
            let dboObj = new DBO();
            try {
                let statData = {
                    a1SystemServicePerformanceSummary: await this.getA1SystemServicePerformanceSummary(dboObj, search),
                    actionTypeSummary: await this.getActionTypeSummary(dboObj, search),
                    incidentSummary: await this.getIncidentSummary(dboObj, search),
                    isSolvedByCOSSSummary: await this.getIsSolvedByCOSSSummary(dboObj, search),
                    logs: await this.getAppreciationLogs(dboObj, search, year, month),
                    nonA1SystemServicePerformanceSummary: await this.getNonA1SystemServicePerformanceSummary(dboObj, search)
                }
                return statData;
            } catch (error) {
                console.log("Something wrong when getting statistic:" + error.stack);
            } finally {
                dboObj.close();
            };

        }
        //---------------------------------------------------------------------------------------------------- 
        this.getA1SystemServicePerformanceSummary = async (dboObj, search) => {
            let queryResult = await dboObj.getA1SystemServicePerformanceSummary(search);
            let a1SystemServicePerformanceSummary = {
                systemSummary: [],
                SUM_H: 0,
                SUM_H_PRE: 0,
                SUM_P: 0,
                SUM_P_PRE: 0,
                SUM_S: 0,
                SUM_S_PRE: 0,
            };
            queryResult.forEach(result => {
                a1SystemServicePerformanceSummary.systemSummary.push(
                    {
                        system_name: result.system_name,
                        H: Number(result.H),
                        H_PRE: Number(result.H_pre),
                        S: Number(result.S),
                        S_PRE: Number(result.S_pre),
                        P: Number(result.P),
                        P_PRE: Number(result.P_pre),
                    }
                )
                a1SystemServicePerformanceSummary.SUM_H += Number(result.H);
                a1SystemServicePerformanceSummary.SUM_H_PRE += Number(result.H_pre);
                a1SystemServicePerformanceSummary.SUM_P += Number(result.P);
                a1SystemServicePerformanceSummary.SUM_P_PRE += Number(result.P_pre);
                a1SystemServicePerformanceSummary.SUM_S += Number(result.S);
                a1SystemServicePerformanceSummary.SUM_S_PRE += Number(result.S_pre);
            });
            return a1SystemServicePerformanceSummary;
        }
        this.getActionTypeSummary = async (dboObj, search) => {
            let queryResult = await dboObj.getActionTypeSummary(search);
            let actionTypeSummary = {
                P: Number(queryResult[0].P),
                R: Number(queryResult[0].R)
            };
            actionTypeSummary.actionTypeRatio = Number(
                actionTypeSummary.P / actionTypeSummary.R
            ).toFixed(2) + ":1";
            actionTypeSummary.total = actionTypeSummary.P + actionTypeSummary.R;
            return actionTypeSummary;
        }
        this.getAppreciationLogs = async (dboObj, search, year, month) => {
            let endDate = new Date(year, month, 0);
            let logs = [];
            endDate = (search * 100 + endDate.getDate()) + ' 2215H - 0830H';
            let queryResult = await dboObj.getAppreciationLogs(search, endDate);
            queryResult.forEach(result => {
                logs.push({
                    brief_desc: result.brief_desc,
                    category_name: result.category_name,
                    compact: result.compact,
                    reference_no: result.reference_no,
                    remark: result.remark,
                    system_name: result.system_name
                })
            });
            return logs
        }
        this.getIncidentSummary = async (dboObj, search) => {
            let queryResult = await dboObj.getIncidentSummary(search);
            let incidentSummary = {};
            incidentSummary.h_count_sum = Number(queryResult[0].h_count_sum);
            incidentSummary.h_count_sum_pre = Number(queryResult[0].h_count_sum_pre);
            incidentSummary.p_count_sum = Number(queryResult[0].p_count_sum);
            incidentSummary.p_count_sum_pre = Number(queryResult[0].p_count_sum_pre);
            incidentSummary.s_count_sum = Number(queryResult[0].s_count_sum);
            incidentSummary.s_count_sum_pre = Number(queryResult[0].s_count_sum_pre);
            incidentSummary.total_no_of_incident = incidentSummary.h_count_sum + incidentSummary.p_count_sum + incidentSummary.s_count_sum;
            incidentSummary.total_no_of_incident_pre = incidentSummary.h_count_sum_pre + incidentSummary.p_count_sum_pre + incidentSummary.s_count_sum_pre;
            return incidentSummary;
        }
        this.getIsSolvedByCOSSSummary = async (dboObj, search) => {
            let queryResult = await dboObj.getIsSolvedByCOSSSummary(search);
            let statData = {};
            statData.total = Number(queryResult[0].total);
            statData.in_office_hour = Number(queryResult[0].in_office_hour);
            statData.non_office_hour = statData.total - statData.in_office_hour;
            return statData;
        }
        this.getNonA1SystemServicePerformanceSummary = async (dboObj, search) => {
            let queryResult = await dboObj.getNonA1SystemServicePerformanceSummary(search);
            let nonA1SystemServicePerformanceSummary = {
                systemSummary: [],
                SUM_H: 0,
                SUM_H_PRE: 0,
                SUM_P: 0,
                SUM_P_PRE: 0,
                SUM_S: 0,
                SUM_S_PRE: 0,
            };
            queryResult.forEach(result => {
                nonA1SystemServicePerformanceSummary.systemSummary.push(
                    {
                        system_name: result.system_name,
                        H: Number(result.H),
                        H_PRE: Number(result.H_pre),
                        S: Number(result.S),
                        S_PRE: Number(result.S_pre),
                        P: Number(result.P),
                        P_PRE: Number(result.P_pre),
                    }
                )
                nonA1SystemServicePerformanceSummary.SUM_H += Number(result.H);
                nonA1SystemServicePerformanceSummary.SUM_H_PRE += Number(result.H_pre);
                nonA1SystemServicePerformanceSummary.SUM_P += Number(result.P);
                nonA1SystemServicePerformanceSummary.SUM_P_PRE += Number(result.P_pre);
                nonA1SystemServicePerformanceSummary.SUM_S += Number(result.S);
                nonA1SystemServicePerformanceSummary.SUM_S_PRE += Number(result.S_pre);
            });
            return nonA1SystemServicePerformanceSummary;
        }
        //----------------------------------------------------------------------------------------------------        
        this.getCategoryList = async (req, res) => {
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
                res.send(finalResult);
            } catch (error) {
                console.log("Something wrong when getting category list:" + error.stack);
            }
            finally {
                dboObj.close();
            };
        }
        this.getSystemList = async (req, res) => {
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
                res.send(finalResult);
            } catch (error) {
                console.log("Something wrong when getting system list:" + error.stack);
            }
            finally {
                dboObj.close();
            };
        }
        this.saveBaseCount = async (req, res) => {
            let dboObj = new DBO();
            try {
                let result = await dboObj.saveBaseCount(req.body);
                res.status(200).json({ result: result })
            } catch (error) {
                console.log("Something wrong when saving system base count :" + error.stack);
                res.status(500).json({
                    status: 'error',
                    message: error,
                });
            }
            finally {
                dboObj.close();
            };
        }
        this.saveIncidentList = async (req, res) => {
            let dboObj = new DBO();
            try {
                let result = await dboObj.saveIncidentList(req.body);
                res.status(200).json({ result: result })
            } catch (error) {
                console.log("Something wrong when saving incident list:" + error.stack);
                res.status(500).json({
                    status: 'error',
                    message: error,
                });
            }
            finally {
                dboObj.close();
            };
        }
    }
}
module.exports = PublicAPI;