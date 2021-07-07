export default function AppreciationLogs(props) {
    return (
        <div className="d-flex flex-grow-1 flex-column p-1">
            <table border="1">
                <thead>
                    <tr>
                        <td>Total number of Incident</td>
                        <td>Proactive</td>
                        <td>Reactive</td>
                        <td>Ratio</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{props.actionTypeSummary.P + props.actionTypeSummary.R}</td>
                        <td>{props.actionTypeSummary.P}</td>
                        <td>{props.actionTypeSummary.R}</td>
                        <td>
                            {props.actionTypeSummary.actionTypeRatio}
                        </td>
                    </tr>
                </tbody>
            </table>
            <br />
            <table border="1">
                <thead>
                    <tr>
                        <td rowSpan="2">Total number of Incident</td>
                        <td colSpan="3">Solved by Computer Operator Independently</td>
                    </tr>
                    <tr>
                        <td>In office hour (0800H – 1800H)</td>
                        <td>In non-office hour</td>
                        <td>Total</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{props.actionTypeSummary.P + props.actionTypeSummary.R}</td>
                        <td>{props.isSolvedByCOSSSummary.in_office_hour}</td>
                        <td>
                            {props.isSolvedByCOSSSummary.non_office_hour}
                        </td>
                        <td>{props.isSolvedByCOSSSummary.total}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}