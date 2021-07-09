export default function IncidentSummary(props) {
  let since2007Sum = props.incidentSummary.h_count_sum_pre+props.incidentSummary.p_count_sum_pre+props.incidentSummary.s_count_sum_pre;
  let thisMonthSum = props.incidentSummary.h_count_sum+props.incidentSummary.p_count_sum+props.incidentSummary.s_count_sum;
  return (
    <div className="d-flex flex-grow-1 flex-column p-1">
      <div className="title">Number of incidents</div>
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
        <tbody>
          <tr key={"incidentSummary_h"}>
            <td className="text-left">Helpdesk service</td>
            <td>{props.incidentSummary.h_count_sum}</td>
            <td>{props.incidentSummary.h_count_sum_pre}</td>
          </tr>  
          <tr key={"incidentSummary_s"}>
            <td className="text-left">System status monitoring & problem reporting</td>
            <td>{props.incidentSummary.s_count_sum}</td>
            <td>{props.incidentSummary.s_count_sum_pre}</td>
          </tr>
          <tr key={"incidentSummary_p"}>
            <td className="text-left">Problem determination and management</td>
            <td>{props.incidentSummary.p_count_sum}</td>
            <td>{props.incidentSummary.p_count_sum_pre}</td>
          </tr>          
          <tr key="incidentSum">
            <td className="text-left">Total</td>
            <td>{thisMonthSum}</td>
            <td>{since2007Sum}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}