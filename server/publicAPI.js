class PublicAPI {
    constructor() {
        let CategoryUtil = require("./classes/CategoryUtil");
        let IncidentUtil = require("./classes/IncidentUtil");
        let SummaryUtil = require('./classes/SummaryUtil');
        let SystemUtil = require('./classes/SystemUtil');
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
        this.generateMonthlySummaryData = async (req, res) => {
            let search = Number(req.query.year) * 100 + Number(req.query.month);
            try{
                let summaryUtil=new SummaryUtil();
                let result =await summaryUtil.generateMonthlySummaryData(search);
                res.send({ result: true });
            }catch (error) {
                console.log("Something wrong when getting statistic:" + error.stack);
            }
        }
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
        this.getIncidentStat = async (req, res) => {
            res.send(await this.getStatData(req.query.year, req.query.month));
        }
        this.getStatData = async (year, month) => {
            let search = Number(year) * 100 + Number(month);
            try {
                let summaryUtil=new SummaryUtil();
                let statData = {
                    a1SystemServicePerformanceSummary: await summaryUtil.getA1SystemServicePerformanceSummary(search),
                    actionTypeSummary: await summaryUtil.getActionTypeSummary(search),
                    incidentSummary: await summaryUtil.getIncidentSummary(search),
                    isSolvedByCOSSSummary: await summaryUtil.getIsSolvedByCOSSSummary(search),
                    logs:await summaryUtil.getAppreciationLogs(search, year, month),
                    nonA1SystemServicePerformanceSummary:await summaryUtil.getNonA1SystemServicePerformanceSummary(search)
                }
                return statData;
            } catch (error) {
                console.log("Something wrong when getting statistic:" + error.stack);
            }
        }
        //----------------------------------------------------------------------------------------------------        
        this.getCategoryList = async (req, res) => {
            let categoryUtil = new CategoryUtil();
            res.send(await categoryUtil.getCategoryList());
        }
        this.getSystemList = async (req, res) => {
            let systemUtil = new SystemUtil();
            res.send(await systemUtil.getSystemList());
        }
        this.saveIncidentList = async (req, res) => {
            let incidentUtil =new IncidentUtil();
            let result=await incidentUtil.saveIncidentList(req.body);
            res.send({ result: true });
        }
    }
}
module.exports = PublicAPI;