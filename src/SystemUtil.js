import Utility from './Utility';
export default class SystemUtil{
    constructor(){
        let publicAPIPath='/publicAPI';
        this.saveBaseCount=async(systemBaseCountList)=>{
            try{
                let result=await Utility.fetchAPI(publicAPIPath+'/saveBaseCount','POST',systemBaseCountList);
                return result;
            } catch (error){
                throw error;
            }
        }
    }
}