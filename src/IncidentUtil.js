import Utility from './Utility';
export default class IncidentUtil{
    constructor(){
        let publicAPIPath='/publicAPI';
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
    }
}