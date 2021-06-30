import { useEffect, useState } from "react";
import Incident from "./Incident";
import IncidentUtil from './IncidentUtil';
export default function InputIncident(props) {
  let incident = new Incident();
  const [categoryList,setCategoryList]=useState([]);
  const [incidentList, setIncidentDataList] = useState([incident]);
  const [systemList,setSystemList]=useState([]);  
  let row = [];
  let addRow = (e) => {
    let temp = JSON.parse(JSON.stringify(incidentList));
    temp.push(new Incident());
    setIncidentDataList(temp);
  };
  let updateBriefDesc=(e,index)=>{
    let temp = JSON.parse(JSON.stringify(incidentList)); 
    temp[index].briefDesc=e.target.value;
    setIncidentDataList(temp);  
  }
  let updateCompactData=(e,index)=>{
    let temp = JSON.parse(JSON.stringify(incidentList));  
    temp[index].compactData=e.target.value;
    setIncidentDataList(temp);
  }
  let updateRefNo=(e,index)=>{
    let temp = JSON.parse(JSON.stringify(incidentList));  
    temp[index].refNo=e.target.value;
    setIncidentDataList(temp);
  }
  let updateRemark=(e,index)=>{
    let temp = JSON.parse(JSON.stringify(incidentList));
    temp[index].remark=e.target.value;
    setIncidentDataList(temp);
  }
  useEffect(()=>{
    let incidentUtil=new IncidentUtil();  
    const getData = async () => {
        let temp=[];
        let categoryList=await incidentUtil.getCategoryList();
        for (let i=0;i<categoryList.length;i++){
            temp.push(
                <option key={"option_"+categoryList[i].category_id} value={categoryList[i].category_id}>
                    {categoryList[i].category_name}     
                </option>
            )
        }
        setCategoryList(temp);
        let systemList=await incidentUtil.getSystemList();
        temp=[];
        for (let i=0;i<systemList.length;i++){
            temp.push(
                <option key={"option_"+systemList[i].system_id} value={systemList[i].system_id}>
                    {systemList[i].system_name}     
                </option>
            )
        }
        setSystemList(temp);
    };
    getData();
  },[])
  for (let i = 0; i < incidentList.length; i++) {
    incident = incidentList[i];
    row.push(
      <tr key={"row_" + i}>
        <td>
          <input 
            name="refNo"
            onChange={(e)=>{ updateRefNo(e,i)}} 
            required 
            type="text" 
            value={incident.refNo} />
        </td>
        <td>
            <select 
                name="catId">
                {categoryList}
            </select>
        </td>
        <td>
            <select name="systemId">
                {systemList}
            </select>
        </td>

        <td>
            <textarea 
                name="briefDesc"
                onChange={(e)=>{ updateBriefDesc(e,i)}} 
                required 
                value={incidentList.briefDesc} />
        </td>
        <td>
          <input
            name="compactData"
            onChange={(e)=>{updateCompactData(e,i)}}
            required
            type="text"
            value={incidentList.compactData}
          />
        </td>
        <td>
            <textarea 
                name="remark"
                onChange={(e)=>{ updateRemark(e,i)}} 
                required value={incidentList.remark} />
        </td>
      </tr>
    );
  }

  return (
    <form>
      <table border="1">
        <tbody>
          <tr>
            <td>Incident reference number(Date & Time)</td>
            <td>Incident category</td>
            <td>System concerned</td>
            <td>Incident description in brief</td>
            <td>
              Compliance of service pledge (yes/no)And Proactive / Reactive
              (P/R) / Minutes / Solved by COSS independently (Yes / No)
            </td>
            <td>Remarks</td>
          </tr>
          {row}
          <tr>
            <td colSpan="6">
              <button onClick={addRow}>Add Button</button>
            </td>
          </tr>
        </tbody>
      </table>
    </form>
  );
}
