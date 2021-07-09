import {useState } from "react";
import DatePicker from "react-datepicker";
export default function ListIncident(props){
    const [startDate, setStartDate] = useState(new Date());
    return(
        <div>
            <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                dateFormat="MM/yyyy"
                showMonthYearPicker
                showFullMonthYearPicker/>
            <a href="/">Back to Main Menu</a>
        </div>
    )
}