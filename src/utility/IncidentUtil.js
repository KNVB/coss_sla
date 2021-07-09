import Utility from './Utility';
export default class IncidentUtil{
    constructor(){
        let publicAPIPath='/publicAPI';
        this.generateMonthlyReport=async(year,month)=>{
            try{
                let result=await Utility.fetchAPI(publicAPIPath+'/generateMonthlyReport','GET',{"year":year,"month":month});
                return result;
            } catch (error){
                throw error;
            }
        }
        this.generateMonthlySummaryData=async(year,month)=>{
            try{
                let result=await Utility.fetchAPI(publicAPIPath+'/generateMonthlySummaryData','GET',{"year":year,"month":month});
                return result;
            } catch (error){
                throw error;
            }
        }
        this.getIncidentStat=async(year,month)=>{
            try{
                let result=await Utility.fetchAPI(publicAPIPath+'/getIncidentStat','GET',{"year":year,"month":month});
                return result;
            } catch (error){
                throw error;
            }
        }
        this.getCategoryList=async()=>{
            try{
                let result=await Utility.fetchAPI(publicAPIPath+'/getCategoryList','GET');
                return result;
            } catch (error){
                throw error;
            }
        }
        this.getSystemList=async()=>{
            try{
                let result=await Utility.fetchAPI(publicAPIPath+'/getSystemList','GET');
                return result;
            } catch (error){
                throw error;
            }
        }
        this.saveIncidentList=async(incidentList)=>{
            try{
                let result=await Utility.fetchAPI(publicAPIPath+'/saveIncidentList','POST',incidentList);
                return result;
            } catch (error){
                throw error;
            }
        }
    }
}