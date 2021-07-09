import {forwardRef,useState} from "react";
import DatePicker from "react-datepicker";
import IncidentUtil from "../utility/IncidentUtil";
export default function GenerateMonthlyReport(props){
    const [reportMonth, setReportMonth] = useState(new Date());
    let minDate = new Date(2021, 4, 1);
    let bb=(e,click)=>{
        e.preventDefault();
        click();
    }
    let genData=async(e)=>{
        let incidentUtil = new IncidentUtil();
        try{
            let result = await incidentUtil.generateMonthlySummaryData(
                reportMonth.getFullYear(),
                reportMonth.getMonth() + 1
            );
            alert("Generate the monthly summary data completed successfully.");
        }catch (error){
            alert("Something wrong when generating Monthly Summary Data.");
        }
    }
    let genReport=async(e)=>{
        let incidentUtil = new IncidentUtil();
        try{
            let result = await incidentUtil.generateMonthlyReport(
                reportMonth.getFullYear(),
                reportMonth.getMonth() + 1
            );
        }catch (error){
            alert("Something wrong when generating Monthly Report.");
        }
    }
    let updateReportMonth=(month)=>{
        setReportMonth(month);
    }
    
    const CustomInput = forwardRef(({ value, onClick }, ref) => (
        <a href="./" onClick={(e)=>bb(e,onClick)} ref={ref}>
          {value}
        </a>
      ));
    return(
        <div>
            <div>
                Generate Monthly Summary Data for:
                <DatePicker
                    customInput={<CustomInput/>}
                    dateFormat="MMMM yyyy"                        
                    minDate={minDate}
                    onChange={(date) => updateReportMonth(date)}                        
                    selected={reportMonth}
                    showMonthYearPicker
                    showFullMonthYearPicker/>
                <button onClick={genData}>Go</button>
            </div>
            <div>
                Generate Monthly Report for:
                <DatePicker
                    customInput={<CustomInput/>}
                    dateFormat="MMMM yyyy"                        
                    minDate={minDate}
                    onChange={(date) => updateReportMonth(date)}                        
                    selected={reportMonth}
                    showMonthYearPicker
                    showFullMonthYearPicker/>
                <button onClick={genReport}>Go</button>
            </div>
            <a href="/">Back to Main Menu</a>
        </div>
    )
}