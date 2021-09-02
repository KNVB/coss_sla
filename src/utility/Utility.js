import SessionExpiredError from './SessionExpiredError';
export default class Utility {
  static async fetchAPI(url, method, params) {
    console.log("=======================");
    console.log("url=" + url);
    console.log("method=" + method);
    console.log("params=" + params);
    console.log("=======================");
    let requestPara = {
      headers: {
        'Content-Type': 'application/json'
      },
      "method": method || 'GET',
    }
    switch (method.toUpperCase()) {
      case 'GET':
        const paramsObject = new URLSearchParams(params);
        const queryString = paramsObject.toString();
        url += "?" + queryString;
        break;
      case 'POST':
        requestPara["body"] = JSON.stringify(params);
        break;
      default:
        break;
    }
    return fetch(url, requestPara)
      .then(response => this.processResponse(response))
      .catch(err => { throw new Error(err.message) });
  }
  static async processResponse(response){
    if (response.ok){
      let contentType=response.headers.get('content-type');
      switch (contentType){
        case "application/json; charset=utf-8":
          return await response.json();
          break;
        case "text/html; charset=utf-8":
          return await response.text();							
          break;
        default:
          let value=response.headers.get('content-disposition');
          let fileName=value.replace("attachment; filename=","").replaceAll("\"","");
          let blob=await response.blob();
          const newBlob = new Blob([blob], { type:response.headers.get('content-type')});
          const objUrl = window.URL.createObjectURL(newBlob);
          let link = document.createElement('a');
          link.href = objUrl;
          link.download = fileName;
          link.click();
          break;
      }
    } else {
      let responseObj=await response.json();
      if (response.status === 401 ){
        throw new SessionExpiredError(responseObj.message);
      } else {
        throw new Error(responseObj.message);
      }
    }
  }
}