export default function ServicePerformance(props) {
    let a1SystemServicePerformanceSummary=[];
    let nonA1SystemServicePerformanceSummary=[];
    for (
        let i = 0;
        i < props.a1SystemServicePerformanceSummary.systemSummary.length;
        i++
    ) {
        a1SystemServicePerformanceSummary.push(
            <tr key={"a1SystemServicePerformanceSummary_" + i}>
              <td className="text-left">{props.a1SystemServicePerformanceSummary.systemSummary[i].system_name}</td>
              <td>{props.a1SystemServicePerformanceSummary.systemSummary[i].H}</td>
              <td>0</td>
              <td>{props.a1SystemServicePerformanceSummary.systemSummary[i].H}</td>
              <td>{props.a1SystemServicePerformanceSummary.systemSummary[i].H_PRE}</td>
              <td>{props.a1SystemServicePerformanceSummary.systemSummary[i].S}</td>
              <td>0</td>
              <td>{props.a1SystemServicePerformanceSummary.systemSummary[i].S}</td>
              <td>{props.a1SystemServicePerformanceSummary.systemSummary[i].S_PRE}</td>
              <td>{props.a1SystemServicePerformanceSummary.systemSummary[i].P}</td>
              <td>0</td>
              <td>{props.a1SystemServicePerformanceSummary.systemSummary[i].P}</td>
              <td>{props.a1SystemServicePerformanceSummary.systemSummary[i].P_PRE}</td>
              <td>0/0</td>
              <td>0/0</td>
            </tr>
          );         
    }
    a1SystemServicePerformanceSummary.push(
        <tr
          key={
            "a1SystemServicePerformanceSummary_" +
            props.a1SystemServicePerformanceSummary.length
          }
        >
          <td className="text-right">Total</td>
          <td>{props.a1SystemServicePerformanceSummary.SUM_H}</td>
          <td>0</td>
          <td>{props.a1SystemServicePerformanceSummary.SUM_H}</td>
          <td>{props.a1SystemServicePerformanceSummary.SUM_H_PRE}</td>
          <td>{props.a1SystemServicePerformanceSummary.SUM_S}</td>
          <td>0</td>
          <td>{props.a1SystemServicePerformanceSummary.SUM_S}</td>
          <td>{props.a1SystemServicePerformanceSummary.SUM_S_PRE}</td>
          <td>{props.a1SystemServicePerformanceSummary.SUM_P}</td>
          <td>0</td>
          <td>{props.a1SystemServicePerformanceSummary.SUM_P}</td>
          <td>{props.a1SystemServicePerformanceSummary.SUM_P_PRE}</td>
          <td>0/0</td>
          <td>0/0</td>
        </tr>
      );
      for (
        let i = 0;
        i < props.nonA1SystemServicePerformanceSummary.systemSummary.length;
        i++
      ) {
        nonA1SystemServicePerformanceSummary.push(
          <tr key={"nonA1SystemServicePerformanceSummary_" + i}>
            <td className="text-left">
              {props.nonA1SystemServicePerformanceSummary.systemSummary[i].system_name}
            </td>
            <td>{props.nonA1SystemServicePerformanceSummary.systemSummary[i].H}</td>
            <td>0</td>
            <td>{props.nonA1SystemServicePerformanceSummary.systemSummary[i].H}</td>
            <td>{props.nonA1SystemServicePerformanceSummary.systemSummary[i].H_PRE}</td>
            <td>{props.nonA1SystemServicePerformanceSummary.systemSummary[i].S}</td>
            <td>0</td>
            <td>{props.nonA1SystemServicePerformanceSummary.systemSummary[i].S}</td>
            <td>{props.nonA1SystemServicePerformanceSummary.systemSummary[i].S_PRE}</td>
            <td>{props.nonA1SystemServicePerformanceSummary.systemSummary[i].P}</td>
            <td>0</td>
            <td>{props.nonA1SystemServicePerformanceSummary.systemSummary[i].P}</td>
            <td>{props.nonA1SystemServicePerformanceSummary.systemSummary[i].P_PRE}</td>
            <td>0/0</td>
            <td>0/0</td>
          </tr>
        );     
      }
      nonA1SystemServicePerformanceSummary.push(
        <tr key={"nonA1SystemServicePerformanceSummary_" + props.nonA1SystemServicePerformanceSummary.length}>
          <td className="text-right">Total</td>
          <td>{props.nonA1SystemServicePerformanceSummary.SUM_H}</td>
          <td>0</td>
          <td>{props.nonA1SystemServicePerformanceSummary.SUM_H}</td>
          <td>{props.nonA1SystemServicePerformanceSummary.SUM_H_PRE}</td>
          <td>{props.nonA1SystemServicePerformanceSummary.SUM_S}</td>
          <td>0</td>
          <td>{props.nonA1SystemServicePerformanceSummary.SUM_S}</td>
          <td>{props.nonA1SystemServicePerformanceSummary.SUM_S_PRE}</td>
          <td>{props.nonA1SystemServicePerformanceSummary.SUM_P}</td>
          <td>0</td>
          <td>{props.nonA1SystemServicePerformanceSummary.SUM_P}</td>
          <td>{props.nonA1SystemServicePerformanceSummary.SUM_P_PRE}</td>
          <td>0/0</td>
          <td>0/0</td>
        </tr>
      );      
    return (
        <div className="d-flex flex-grow-1 flex-column p-1">
            <div className="title">Service pledge performance:</div>
            <table border="1">
                <thead>
                    <tr>
                        <td rowSpan="4"></td>
                        <td colSpan="12">Number of incidents</td>
                        <td colSpan="2" rowSpan="2">
                            Downtime <br />
                            (hour/minute)
                        </td>
                    </tr>
                    <tr>
                        <td colSpan="4">Helpdesk service</td>
                        <td colSpan="4">
                            System status monitoring &<br /> problem reporting
                        </td>
                        <td colSpan="4">
                            Problem determination and <br />
                            management
                        </td>
                    </tr>
                    <tr>
                        <td colSpan="3">This Month</td>
                        <td rowSpan="2" className="trouble">
                            Since 1-7-2007
                        </td>
                        <td colSpan="3">This Month</td>
                        <td rowSpan="2" className="trouble">
                            Since 1-7-2007
                        </td>
                        <td colSpan="3">This Month</td>
                        <td rowSpan="2" className="trouble">
                            Since 1-7-2007
                        </td>
                        <td rowSpan="2" className="trouble">
                            This Month
                        </td>
                        <td rowSpan="2" className="trouble">
                            Since 1-7-2007
                        </td>
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
                <tbody>{nonA1SystemServicePerformanceSummary}</tbody>
            </table>
            <br />
            <table border="1">
                <thead>
                    <tr>
                        <td rowSpan="4">A1 Systems</td>
                        <td colSpan="12">Number of incidents</td>
                        <td colSpan="2" rowSpan="2">
                            Downtime <br />
                            (hour/minute)
                        </td>
                    </tr>
                    <tr>
                        <td colSpan="4">Helpdesk service</td>
                        <td colSpan="4">
                            System status monitoring &<br /> problem reporting
                        </td>
                        <td colSpan="4">
                            Problem determination and <br />
                            management
                        </td>
                    </tr>
                    <tr>
                        <td colSpan="3">This Month</td>
                        <td rowSpan="2" className="trouble">
                            Since 1-7-2007
                        </td>
                        <td colSpan="3">This Month</td>
                        <td rowSpan="2" className="trouble">
                            Since 1-7-2007
                        </td>
                        <td colSpan="3">This Month</td>
                        <td rowSpan="2" className="trouble">
                            Since 1-7-2007
                        </td>
                        <td rowSpan="2" className="trouble">
                            This Month
                        </td>
                        <td rowSpan="2" className="trouble">
                            Since 1-7-2007
                        </td>
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
                <tbody>{a1SystemServicePerformanceSummary}</tbody>
            </table>
        </div>
    )
}