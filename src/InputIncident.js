import { useState } from "react";
export default function InputIncident(props){
    const [incidentDataList,setIncidentDataList]=useState([{briefDesc:'',catId:'',compactData:'',refNo:'',remark:'',systemId:''}]);
    let row=[];
    for (let i=0;i<incidentDataList.length;i++){
        row.push(
            <tr key={"row_"+incidentDataList.length}>
                <td>
                    <input name="refNo" required type="text"  value={incidentDataList[i].refNo}/>
                </td>
                <td>
                    <select name="catId">
    
                    </select>
                </td>
                <td>
                    <select name="systemId">
    
                    </select>
                </td>
               
                <td>
                    <textarea name="briefDesc" required value={incidentDataList[i].briefDesc}/>
                </td>
                 
                <td>
                    <input name="compactData" required type="text" value={incidentDataList[i].compactData}/>
                </td>
                <td>
                    <textarea name="remark" required  value={incidentDataList[i].remark}/>
                </td>
            </tr>
        )
    }
    
    return(
        <form>
            <table border="1">
                <tbody>
                    <tr>
                        <td>Incident reference number(Date & Time)</td>
                        <td>Incident category</td>
                        <td>System concerned</td>
                        <td>Incident description in brief</td>
                        <td>
                            Compliance of service pledge (yes/no)And 
                            Proactive / Reactive (P/R) 
                            / Minutes / Solved by COSS independently (Yes / No)
                        </td>
                        <td>Remarks</td>
                    </tr>
                    {row}
                    <tr>
                        <td colSpan="6">
                            <button>Add</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </form>
    )
}