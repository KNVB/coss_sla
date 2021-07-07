export default function ServicePerformance(props) {
    let a1SystemServicePerformanceSummary=[];
    let nonA1SystemServicePerformanceSummary=[];
    let sum = { H: 0, H_PRE: 0, P: 0, P_PRE: 0, S: 0, S_PRE: 0 };
    for (
        let i = 0;
        i < props.a1SystemServicePerformanceSummary.length;
        i++
    ) {
        a1SystemServicePerformanceSummary.push(
            <tr key={"a1SystemServicePerformanceSummary_" + i}>
              <td className="text-left">{props.a1SystemServicePerformanceSummary[i].system_name}</td>
              <td>{props.a1SystemServicePerformanceSummary[i].H}</td>
              <td>0</td>
              <td>{props.a1SystemServicePerformanceSummary[i].H}</td>
              <td>{props.a1SystemServicePerformanceSummary[i].H_PRE}</td>
              <td>{props.a1SystemServicePerformanceSummary[i].S}</td>
              <td>0</td>
              <td>{props.a1SystemServicePerformanceSummary[i].S}</td>
              <td>{props.a1SystemServicePerformanceSummary[i].S_PRE}</td>
              <td>{props.a1SystemServicePerformanceSummary[i].P}</td>
              <td>0</td>
              <td>{props.a1SystemServicePerformanceSummary[i].P}</td>
              <td>{props.a1SystemServicePerformanceSummary[i].P_PRE}</td>
              <td>0/0</td>
              <td>0/0</td>
            </tr>
          );
          sum.H += props.a1SystemServicePerformanceSummary[i].H;
          sum.H_PRE += props.a1SystemServicePerformanceSummary[i].H_PRE;
          sum.S += props.a1SystemServicePerformanceSummary[i].S;
          sum.S_PRE += props.a1SystemServicePerformanceSummary[i].S_PRE;
          sum.P += props.a1SystemServicePerformanceSummary[i].P;
          sum.P_PRE += props.a1SystemServicePerformanceSummary[i].P_PRE;
    }
    a1SystemServicePerformanceSummary.push(
        <tr
          key={
            "a1SystemServicePerformanceSummary_" +
            props.a1SystemServicePerformanceSummary.length
          }
        >
          <td className="text-right">Total</td>
          <td>{sum.H}</td>
          <td>0</td>
          <td>{sum.H}</td>
          <td>{sum.H_PRE}</td>
          <td>{sum.S}</td>
          <td>0</td>
          <td>{sum.S}</td>
          <td>{sum.S_PRE}</td>
          <td>{sum.P}</td>
          <td>0</td>
          <td>{sum.P}</td>
          <td>{sum.P_PRE}</td>
          <td>0/0</td>
          <td>0/0</td>
        </tr>
      );
      sum = { H: 0, H_PRE: 0, P: 0, P_PRE: 0, S: 0, S_PRE: 0 };
      for (
        let i = 0;
        i < props.nonA1SystemServicePerformanceSummary.length;
        i++
      ) {
        nonA1SystemServicePerformanceSummary.push(
          <tr key={"nonA1SystemServicePerformanceSummary_" + i}>
            <td className="text-left">
              {props.nonA1SystemServicePerformanceSummary[i].system_name}
            </td>
            <td>{props.nonA1SystemServicePerformanceSummary[i].H}</td>
            <td>0</td>
            <td>{props.nonA1SystemServicePerformanceSummary[i].H}</td>
            <td>{props.nonA1SystemServicePerformanceSummary[i].H_PRE}</td>
            <td>{props.nonA1SystemServicePerformanceSummary[i].S}</td>
            <td>0</td>
            <td>{props.nonA1SystemServicePerformanceSummary[i].S}</td>
            <td>{props.nonA1SystemServicePerformanceSummary[i].S_PRE}</td>
            <td>{props.nonA1SystemServicePerformanceSummary[i].P}</td>
            <td>0</td>
            <td>{props.nonA1SystemServicePerformanceSummary[i].P}</td>
            <td>{props.nonA1SystemServicePerformanceSummary[i].P_PRE}</td>
            <td>0/0</td>
            <td>0/0</td>
          </tr>
        );
        sum.H += props.nonA1SystemServicePerformanceSummary[i].H;
        sum.H_PRE += props.nonA1SystemServicePerformanceSummary[i].H_PRE;
        sum.S += props.nonA1SystemServicePerformanceSummary[i].S;
        sum.S_PRE += props.nonA1SystemServicePerformanceSummary[i].S_PRE;
        sum.P += props.nonA1SystemServicePerformanceSummary[i].P;
        sum.P_PRE += props.nonA1SystemServicePerformanceSummary[i].P_PRE;
      }
      nonA1SystemServicePerformanceSummary.push(
        <tr key={"nonA1SystemServicePerformanceSummary_" + props.nonA1SystemServicePerformanceSummary.length}>
          <td className="text-right">Total</td>
          <td>{sum.H}</td>
          <td>0</td>
          <td>{sum.H}</td>
          <td>{sum.H_PRE}</td>
          <td>{sum.S}</td>
          <td>0</td>
          <td>{sum.S}</td>
          <td>{sum.S_PRE}</td>
          <td>{sum.P}</td>
          <td>0</td>
          <td>{sum.P}</td>
          <td>{sum.P_PRE}</td>
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