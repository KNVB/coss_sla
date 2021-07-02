import { useEffect, useState } from 'react';
import CategoryUtil from './CategoryUtil';
export default function ShowStat(props){
    const [dataRow,setDataRow]=useState([]);
    useEffect(()=>{
        const getData = async () => {
            let now =new Date();
            let temp=[];
            let categoryUtil =new  CategoryUtil();
            let baseCount = await categoryUtil.getBaseCount(now.getFullYear(),now.getMonth());
            for (let i=0;i<baseCount.length;i++){
                temp.push(
                    <tr key={"catCount_"+i}>
                        <td>{baseCount[i].cat_name}</td>
                        <td>{baseCount[i].cat_count}</td>
                        <td>{baseCount[i].base_count_since_2007}</td>
                    </tr>
                );
            }
            setDataRow(temp);
        }
        getData();
    },[])
 
    return (
        <div>
            <div>Show Stat</div>
            <div>
                Number of incidents
                <table border="1">
                    <thead>
                        <tr>
                            <td rowSpan="2"></td>
                            <td colSpan="2">
                                Number of incidents
                            </td>
                        </tr>
                        <tr>
                            <td>This month</td>
                            <td>Since 1-7-2007</td>
                        </tr>
                    </thead>
                    <tbody>
                        {dataRow}
                    </tbody>
                </table>
            </div>
        </div>
    )
}