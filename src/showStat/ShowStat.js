import {Fragment, useEffect, useState } from "react";
import AppreciationLogs from './AppreciationLogs';
import IncidentSummary from './IncidentSummary';
import ServicePerformance from './ServicePerformance';
import IncidentUtil from "../utility/IncidentUtil";
import MonthPicker from "../monthPicker/MonthPicker";
import "./ShowStat.css";
export default function ShowStat() {
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
    return (
        <div className="showStat p-1">
            <div className="title text-center">Monthly Service Pledge Compliance Report</div>
            <ol>
                <li className="title">
                    <div className="d-flex flex-row align-items-center">
                        <div className="pr-1">Report Period:</div>
                        <MonthPicker
                            onChange={updateReportMonth}
                            minDate={minDate} />
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
        </div>
    );
}