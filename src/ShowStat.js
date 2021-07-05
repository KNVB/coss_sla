import { useEffect, useState } from "react";
import IncidentUtil from "./IncidentUtil";
import MonthPicker from './monthPicker/MonthPicker';
import './ShowStat.css';
export default function ShowStat() {
  const [dataRow, setDataRow] = useState({});
  const [reportMonth,setReportMonth]=useState(new Date());
  useEffect(() => {
    const getData = async () => {
      let actionTypeSummaryRow;
      let a1SystemServicePerformanceSummary=[];
      let nonA1SystemServicePerformanceSummary=[];
      
      let incidentUtil = new IncidentUtil();
      let isSolvedByCOSSSummaryRow;
      let since2007Sum = 0;
      let incidentSummaryRow = [];
      let thisMonthSum = 0;
      let result = await incidentUtil.getIncidentStat(reportMonth.getFullYear(),reportMonth.getMonth()+1);
      actionTypeSummaryRow=(
        <tr>
          <td>{(result.actionTypeSummary.P+result.actionTypeSummary.R)}</td>
          <td>{result.actionTypeSummary.P}</td><td>{result.actionTypeSummary.R}</td>
          <td>{Number(result.actionTypeSummary.P/result.actionTypeSummary.R).toFixed(2)+":1"}</td>
        </tr>      
      );
      for (let i = 0; i < result.incidentSummary.length; i++) {
        incidentSummaryRow.push(
          <tr key={"incidentSummary_" + i}>
            <td>{result.incidentSummary[i].category_name}</td>
            <td>{result.incidentSummary[i].this_month}</td>
            <td>{result.incidentSummary[i].since_2007}</td>
          </tr>
        );
        thisMonthSum += result.incidentSummary[i].this_month;
        since2007Sum += result.incidentSummary[i].since_2007;
      }
      incidentSummaryRow.push(
        <tr key="incidentSum">
          <td>Total</td>
          <td>{thisMonthSum}</td>
          <td>{since2007Sum}</td>
        </tr>
      );
      for (let i=0;i<result.a1SystemServicePerformanceSummary.length;i++){
        a1SystemServicePerformanceSummary.push(
          <tr key={"a1SystemServicePerformanceSummary_" + i}>
            <td>{result.a1SystemServicePerformanceSummary[i].system_name}</td>
            <td>{result.a1SystemServicePerformanceSummary[i].H}</td>
            <td>0</td>
            <td>{result.a1SystemServicePerformanceSummary[i].H}</td>
            <td>0</td>
            <td>{result.a1SystemServicePerformanceSummary[i].S}</td>
            <td>0</td>
            <td>{result.a1SystemServicePerformanceSummary[i].S}</td>
            <td>0</td>
            <td>{result.a1SystemServicePerformanceSummary[i].P}</td>
            <td>0</td>
            <td>{result.a1SystemServicePerformanceSummary[i].P}</td>
            <td>0</td>
            <td>0/0</td>
            <td>0/0</td>
          </tr>
        )
      }
      for (let i=0;i<result.nonA1SystemServicePerformanceSummary.length;i++){
        nonA1SystemServicePerformanceSummary.push(
          <tr key={"nonA1SystemServicePerformanceSummary_" + i}>
            <td>{result.nonA1SystemServicePerformanceSummary[i].system_name}</td>
            <td>{result.nonA1SystemServicePerformanceSummary[i].H}</td>
            <td>0</td>
            <td>{result.nonA1SystemServicePerformanceSummary[i].H}</td>
            <td>0</td>
            <td>{result.nonA1SystemServicePerformanceSummary[i].S}</td>
            <td>0</td>
            <td>{result.nonA1SystemServicePerformanceSummary[i].S}</td>
            <td>0</td>
            <td>{result.nonA1SystemServicePerformanceSummary[i].P}</td>
            <td>0</td>
            <td>{result.nonA1SystemServicePerformanceSummary[i].P}</td>
            <td>0</td>
            <td>0/0</td>
            <td>0/0</td>
          </tr>
        )
      }

      isSolvedByCOSSSummaryRow=(
        <tr>
          <td>{thisMonthSum}</td>
          <td>{result.isSolvedByCOSSSummary.in_office_hour}</td>
          <td>{result.isSolvedByCOSSSummary.total-result.isSolvedByCOSSSummary.in_office_hour}</td>
          <td>{result.isSolvedByCOSSSummary.total}</td>
        </tr>
      );
      setDataRow({
        a1SystemServicePerformanceSummary:a1SystemServicePerformanceSummary,
        actionTypeSummaryRow:actionTypeSummaryRow,
        nonA1SystemServicePerformanceSummary:nonA1SystemServicePerformanceSummary,
        isSolvedByCOSSSummaryRow:isSolvedByCOSSSummaryRow,
        incidentSummaryRow:incidentSummaryRow
      });
    };
    getData();
  }, [reportMonth]);
  let minDate=new Date(2021,4,1);
  let updateReportMonth=(month)=>{
    setReportMonth(month);
  }
  return (
    <div>
      <div>Show Stat</div>
      <MonthPicker minDate={minDate} onChange={updateReportMonth}/>
      <div className="p-1">
        Number of incidents
        <table border="1">
          <thead>
            <tr>
              <td rowSpan="2"></td>
              <td colSpan="2">Number of incidents</td>
            </tr>
            <tr>
              <td>This month</td>
              <td>Since 1-7-2007</td>
            </tr>
          </thead>
          <tbody>{dataRow.incidentSummaryRow}</tbody>
        </table>
        <br/>
        <table border="1">
          <thead>
            <tr>
              <td >Total number of Incident</td>
              <td >Proactive</td>
              <td >Reactive</td>
              <td >Ratio</td>
            </tr>
          </thead>
          <tbody>{dataRow.actionTypeSummaryRow}</tbody>
        </table>
        <br/>
        Service pledge performance:
        <table border="1">
          <thead>
            <tr>
              <td rowSpan="4"></td>
              <td colSpan="12">Number of incidents</td>
              <td colSpan="2" rowSpan="2">Downtime <br/>(hour/minute)</td>
            </tr>
            <tr>
              <td colSpan="4">Helpdesk service</td>
              <td colSpan="4">System status monitoring &<br/> problem reporting</td>
              <td colSpan="4">Problem determination and <br/>management</td>
            </tr>
            <tr>
              <td colSpan="3">This Month</td>
              <td rowSpan="2" className="trouble">Since 1-7-2007</td>
              <td colSpan="3" >This Month</td>
              <td rowSpan="2" className="trouble">Since 1-7-2007</td>
              <td colSpan="3" >This Month</td>
              <td rowSpan="2" className="trouble">Since 1-7-2007</td>
              <td rowSpan="2" className="trouble">This Month</td>
              <td rowSpan="2" className="trouble">Since 1-7-2007</td>
            </tr>
            <tr>
              <td className="trouble">Compliance</td>
              <td className="trouble">Non-Compliance</td>
              <td className="trouble">Total</td>
              <td className="trouble">Compliance</td>
              <td className="trouble">Non-Compliance</td>
              <td className="trouble">Total</td>
              <td className="trouble">Compliance</td>
              <td className="trouble">Non-Compliance</td>
              <td className="trouble">Total</td>
            </tr>
          </thead>
          <tbody>
            {dataRow.nonA1SystemServicePerformanceSummary}
          </tbody>
        </table>
        <br/>
        <table border="1">
          <thead>
            <tr>
              <td rowSpan="4">A1 Systems</td>
              <td colSpan="12">Number of incidents</td>
              <td colSpan="2" rowSpan="2">Downtime <br/>(hour/minute)</td>
            </tr>
            <tr>
              <td colSpan="4">Helpdesk service</td>
              <td colSpan="4">System status monitoring &<br/> problem reporting</td>
              <td colSpan="4">Problem determination and <br/>management</td>
            </tr>
            <tr>
              <td colSpan="3">This Month</td>
              <td rowSpan="2" className="trouble">Since 1-7-2007</td>
              <td colSpan="3" >This Month</td>
              <td rowSpan="2" className="trouble">Since 1-7-2007</td>
              <td colSpan="3" >This Month</td>
              <td rowSpan="2" className="trouble">Since 1-7-2007</td>
              <td rowSpan="2" className="trouble">This Month</td>
              <td rowSpan="2" className="trouble">Since 1-7-2007</td>
            </tr>
            <tr>
              <td className="trouble">Compliance</td>
              <td className="trouble">Non-Compliance</td>
              <td className="trouble">Total</td>
              <td className="trouble">Compliance</td>
              <td className="trouble">Non-Compliance</td>
              <td className="trouble">Total</td>
              <td className="trouble">Compliance</td>
              <td className="trouble">Non-Compliance</td>
              <td className="trouble">Total</td>
            </tr>
          </thead>
          <tbody>
            {dataRow.a1SystemServicePerformanceSummary}
          </tbody>
        </table>
        <br/>
        <table border="1">
          <thead>
            <tr>
              <td rowSpan="2">Total number of Incident</td>
              <td colSpan="3">Solved by Computer Operator Independently</td>
            </tr>
            <tr>  
              <td >In office hour (0800H – 1800H)</td>
              <td >In non-office hour</td>
              <td >Total</td>
            </tr>
          </thead>
          <tbody>{dataRow.isSolvedByCOSSSummaryRow}</tbody>
        </table>
        <a href="/">Back to Main Menu</a>
      </div>
    </div>
  );
}
