import Utility from './Utility';
export default class CategoryUtil{
    constructor(){
        let publicAPIPath='/publicAPI';
        this.getBaseCount=async(year,month)=>{
            try{
                let result=await Utility.fetchAPI(publicAPIPath+'/getCategoryCount','GET',{"year":year,"month":month});
                return result;
            } catch (error){
                throw error;
            }
        }
    }
}