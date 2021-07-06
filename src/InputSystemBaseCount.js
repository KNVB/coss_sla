import { useEffect, useState } from "react";
import IncidentUtil from './utility/IncidentUtil';
import SystemUtil from './utility/SystemUtil';
export default function InputSystemBaseCount(props) {
    const [systemBaseCountList, setSystemBaseCountList] = useState([]);
    const [tableRowList, setTableRowList] = useState([]);
    let setValue=(e,systemId,catId)=>{
        let temp=JSON.parse(JSON.stringify(systemBaseCountList));
        temp[systemId][catId]=Number(e.target.value);
        setSystemBaseCountList(temp);
    }
    useEffect(() => {
        let incidentUtil = new IncidentUtil();
        const getData = async () => {

            let tempSystemBaseCountList = {};
            let systemList = await incidentUtil.getSystemList();

            for (let i = 0; i < systemList.length; i++) {
                tempSystemBaseCountList[systemList[i].system_id] = { "H": 0, "P": 0, "S": 0 }
                tempSystemBaseCountList[systemList[i].system_id].systemName = systemList[i].system_name;
            }
            setSystemBaseCountList(tempSystemBaseCountList);
        }
        getData();
    }, []);
    useEffect(() => {
        let tempTableRowList = [];
        Object.keys(systemBaseCountList).forEach(systemId => {
            tempTableRowList.push(
                <tr key={"systemBaseCount_" + systemId}>
                    <td>{systemBaseCountList[systemId].systemName}</td>
                    <td>
                        <input
                            min={0}
                            onChange={(e)=>{setValue(e,systemId,"H")}}
                            required
                            type="number"
                            value={systemBaseCountList[systemId]["H"]} />
                    </td>
                    <td>
                        <input
                            min={0}
                            onChange={(e)=>{setValue(e,systemId,"S")}}
                            required
                            type="number"
                            value={systemBaseCountList[systemId]["S"]} />
                    </td>
                    <td>
                        <input
                            min={0}
                            onChange={(e)=>{setValue(e,systemId,"P")}}
                            required
                            type="number"
                            value={systemBaseCountList[systemId]["P"]} />
                    </td>
                </tr>
            );
        })
        setTableRowList(tempTableRowList);
    }, [systemBaseCountList])
    let saveDataToDb=(e)=>{
        e.preventDefault();
        let systemUtil=new SystemUtil();
        systemUtil.saveBaseCount(systemBaseCountList)
        .then(saveResult=>{
            if (saveResult.result){
              alert("Base Count Saved to Db successfully");
            }
          })
    }
   
    return (
        <div className="d-flex flex-grow-1 justify-content-center">
            <form>
                <table border="1" width="100%">
                    <thead>
                        <tr>
                            <td className="text-center" rowSpan="2">System Name</td>
                            <td className="text-center" colSpan="3"> Category Name</td>
                        </tr>
                        <tr>
                            <td className="text-center">Helpdesk service</td>
                            <td className="text-center">System status monitoring &<br />problem reporting</td>
                            <td className="text-center">Problem determination and management</td>
                        </tr>
                    </thead>
                    <tbody>
                        {tableRowList}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan="3">
                                <button onClick={saveDataToDb}>Save</button>
                                <a href="/">Back to Main Menu</a>
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </form>
        </div>
    )
}