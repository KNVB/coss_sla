import IncidentUtil from "../utility/IncidentUtil";
export default function IncidentSummary(props){

    return(
        
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
    )
}