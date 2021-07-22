import { useEffect, useState } from "react";
import Incident from "../utility/Incident";
import IncidentUtil from '../utility/IncidentUtil';
export default function InputIncident(props) {
  
  const [categoryOptionList,setCategoryOptionList]=useState([]);
  const [defaultIncident,setDefaultIncident]=useState();
  const [incidentList, setIncidentDataList] = useState([]);
  const [systemOptionList,setSystemOptionList]=useState([]);

  let row = [];
  let addRow = (e) => {
    e.preventDefault();
    let temp = JSON.parse(JSON.stringify(incidentList));
    temp.push(defaultIncident);
    setIncidentDataList(temp);
  };
  let saveToDb=async(e)=>{
    e.preventDefault();
    /*
    let incidentUtil=new IncidentUtil();
    incidentUtil.saveIncidentList(incidentList)
    .then(saveResult=>{
      if (saveResult.result){
        alert("Incident Saved to Db successfully");
            
      }
    })
    */
    let incident = new Incident();
    //incident.catId=categoryOptionList[0].props.value;
    //incident.systemId=systemOptionList[0].props.value;
    setIncidentDataList([]);

  }
  let updateChange=(e,index)=>{
    let temp = JSON.parse(JSON.stringify(incidentList)); 
    if(e.target.name==="systemId"){
      temp[index].systemId=Number(e.target.value);
    }else {
      temp[index][e.target.name]=e.target.value;
    }
    setIncidentDataList(temp);
  }
  useEffect(()=>{
    let incidentUtil=new IncidentUtil();  
    const getData = async () => {
        let incident = new Incident();
        let temp=[];
        let categoryList=await incidentUtil.getCategoryList();
        for (let i=0;i<categoryList.length;i++){
            temp.push(
                <option key={"option_"+categoryList[i].category_id} value={categoryList[i].category_id}>
                    {categoryList[i].category_name}     
                </option>
            )
        }
        setCategoryOptionList(temp);
        let systemList=await incidentUtil.getSystemList();
        temp=[];
        for (let i=0;i<systemList.length;i++){
            temp.push(
                <option key={"option_"+systemList[i].system_id} value={systemList[i].system_id}>
                    {systemList[i].system_name}     
                </option>
            )
        }
        setSystemOptionList(temp);
        incident.catId=categoryList[0].category_id;
        incident.systemId=systemList[0].system_id;
        setDefaultIncident(incident);
        setIncidentDataList([incident]);
    };
    getData();
  },[])
  for (let i = 0; i < incidentList.length; i++) {
    let incident = incidentList[i];
    row.push(
      <tr key={"row_" + i}>
        <td>
          <input 
            name="refNo"
            onChange={(e)=>{ updateChange(e,i)}} 
            required 
            type="text" 
            value={incident.refNo} />
        </td>
        <td>
            <select 
                name="catId"
                onChange={(e)=>{ updateChange(e,i)}}
                value={incident.catId}>
                {categoryOptionList}
            </select>
        </td>
        <td>
            <select
              name="systemId"
              onChange={(e)=>{ updateChange(e,i)}}
              value={incident.systemId}>
                {systemOptionList}
            </select>
        </td>
        <td>
            <textarea 
                name="briefDesc"
                onChange={(e)=>{ updateChange(e,i)}} 
                required 
                value={incident.briefDesc} />
        </td>
        <td>
          <input
            name="compactData"
            onChange={(e)=>{ updateChange(e,i)}}
            required
            type="text"
            value={incident.compactData}
          />
        </td>
        <td>
            <textarea 
                name="remark"
                onChange={(e)=>{ updateChange(e,i)}} 
                required value={incident.remark} />
        </td>
      </tr>
    );
  }

  return (
    <form method="post">
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
            <td colSpan="3">
              <button onClick={addRow}>Add Row</button>
            </td>
            <td colSpan="3">
              <button onClick={saveToDb}>Save</button>
            </td>
          </tr>
          <tr>
            <td colSpan="6">
              <a href="/">Back to Main Menu</a>
            </td>
          </tr>
        </tbody>
      </table>
    </form>
  );
}
