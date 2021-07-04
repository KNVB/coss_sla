import { useEffect, useState } from "react";
import IncidentUtil from "./IncidentUtil";
export default function ShowStat(props) {
  const [dataRow, setDataRow] = useState([]);
  useEffect(() => {
    const getData = async () => {
      let now = new Date();
      let temp = [];
      let incidentUtil = new IncidentUtil();
      let thisMonthSum = 0,
        since2007Sum = 0;
      let result = await incidentUtil.getIncidentStat(2021, 6);
      for (let i = 0; i < result.summary.length; i++) {
        temp.push(
          <tr key={"incidentSummary_" + i}>
            <td>{result.summary[i].category_name}</td>
            <td>{result.summary[i].this_month}</td>
            <td>{result.summary[i].since_2007}</td>
          </tr>
        );
        thisMonthSum += result.summary[i].this_month;
        since2007Sum += result.summary[i].since_2007;
      }
      temp.push(
        <tr key="incidentSum">
          <td>Total</td>
          <td>{thisMonthSum}</td>
          <td>{since2007Sum}</td>
        </tr>
      );
      setDataRow(temp);
    };
    getData();
  }, []);

  return (
    <div>
      <div>Show Stat</div>
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
          <tbody>{dataRow}</tbody>
        </table>
      </div>
    </div>
  );
}
