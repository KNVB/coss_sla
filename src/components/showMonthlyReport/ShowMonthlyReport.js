import {Fragment, forwardRef, useEffect, useState } from "react";
import AppreciationLogs from './AppreciationLogs';
import DatePicker from "react-datepicker";
import IncidentSummary from './IncidentSummary';
import ServicePerformance from './ServicePerformance';
import IncidentUtil from "../../utility/IncidentUtil";
import "./ShowMonthlyReport.css";
import "react-datepicker/dist/react-datepicker.css";
export default function ShowMonthlyReport() {
    const [reportMonth, setReportMonth] = useState(new Date());
    const [statData, setStatData] = useState();
    useEffect(() => {
        const getData = async () => {
            let incidentUtil = new IncidentUtil();
            let result = await incidentUtil.getIncidentStat(
                reportMonth.getFullYear(),
                reportMonth.getMonth() + 1
            );
            setStatData(result);
        }
        getData();
    }, [reportMonth]);
    let minDate = new Date(2021, 4, 1);
    let updateReportMonth = (month) => {
        setReportMonth(month);
    };
    let bb=(e,click)=>{
        e.preventDefault();
        click();
    }
    const CustomInput = forwardRef(({ value, onClick }, ref) => (
        <a href="./" onClick={(e)=>bb(e,onClick)} ref={ref}>
          {value}
        </a>
      ));
    return (
        <div className="showStat p-1">
            <div className="title text-center">Monthly Service Pledge Compliance Report</div>
            <ol>
                <li className="title">
                    <div className="d-flex flex-row align-items-center">
                        <div className="pr-1">Report Period:</div>
                        <DatePicker
                            customInput={<CustomInput/>}
                            dateFormat="MMMM yyyy"
                            onChange={(date) => updateReportMonth(date)}                                                       
                            minDate={minDate}
                            selected={reportMonth}
                            showMonthYearPicker
                            showFullMonthYearPicker                            
                            />
                    </div>
                </li>
                {statData &&
                    <Fragment>
                        <li className="title">
                            <div>Computer Operation Support Service</div>
                            <IncidentSummary
                                incidentSummary={statData.incidentSummary} />
                            <ServicePerformance
                                a1SystemServicePerformanceSummary={statData.a1SystemServicePerformanceSummary}
                                nonA1SystemServicePerformanceSummary={statData.nonA1SystemServicePerformanceSummary} />
                        </li>
                        <li className="title">
                            <div>Appendix – Summary of Appreciation Logs</div>
                            <AppreciationLogs
                                actionTypeSummary={statData.actionTypeSummary}
                                isSolvedByCOSSSummary={statData.isSolvedByCOSSSummary} />
                        </li>
                    </Fragment>
                }
            </ol>
            <a href="/">Back to Main Menu</a>
        </div>
    );
}