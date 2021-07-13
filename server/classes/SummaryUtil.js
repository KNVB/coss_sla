class SummaryUtil {
    constructor() {
        let DBO = require("../dbo.js");
        this.generateMonthlySummaryData = async (search) => {
            let dboObj = new DBO();
            try {
                let result = await dboObj.generateMonthlySummaryData(search);
                return result;
            } catch (error) {
                console.log("Something wrong when generating the Monthly Summary Data:" + error.stack);
            } finally {
                dboObj.close();
            };
        }
        this.getA1SystemServicePerformanceSummary = async (search) => {
            let dboObj = new DBO();
            try {
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
            } catch (error) {
                console.log("Something wrong when getting A1 System Services Performance Summary:" + error.stack);
            }
            finally {
                dboObj.close();
            };
        }
        this.getActionTypeSummary = async (search) => {
            let dboObj = new DBO();
            try {
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
            } catch (error) {
                console.log("Something wrong when getting Action Type Summary:" + error.stack);
            }
            finally {
                dboObj.close();
            };
        }
        this.getAppreciationLogs = async (search, year, month) => {
            let dboObj = new DBO();
            try {
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
            } catch (error) {
                console.log("Something wrong when getting Appreciation log:" + error.stack);
            }
            finally {
                dboObj.close();
            };
        }
        this.getIncidentSummary = async (search) => {
            let dboObj = new DBO();
            try {
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
            } catch (error) {
                console.log("Something wrong when getting Incident Summary:" + error.stack);
            }
            finally {
                dboObj.close();
            };
        }
        this.getIsSolvedByCOSSSummary = async (search) => {
            let dboObj = new DBO();
            try {
                let queryResult = await dboObj.getIsSolvedByCOSSSummary(search);
                let statData = {};
                statData.total = Number(queryResult[0].total);
                statData.in_office_hour = Number(queryResult[0].in_office_hour);
                statData.non_office_hour = statData.total - statData.in_office_hour;
                return statData;
            } catch (error) {
                console.log("Something wrong when getting Is Solved By COSS Summary:" + error.stack);
            }
            finally {
                dboObj.close();
            };
        }
        this.getNonA1SystemServicePerformanceSummary = async (search) => {
            let dboObj = new DBO();
            try {
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
            } catch (error) {
                console.log("Something wrong when getting non A1 System Services Performance Summary:" + error.stack);
            }
            finally {
                dboObj.close();
            };
        }
    }
}
module.exports = SummaryUtil