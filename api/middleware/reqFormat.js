
const { sendResponse } = require("../functions/util");

reqFormatMiddleware = (req, res,next) => {
    console.log("!!!=============Nouvelle requete===========!!!")
    console.log("Méthode : "  ,req.method)
    console.log("Chemin  : "  ,req.path)
    console.log("Body    : "  ,req.body)
    console.log("headers  : "  ,req.headers)
    switch(req.method) {
        case "GET":

          break;
        case "POST":
        /*     if(!req.body.data){
                return sendResponse(res,404,"MISSING_DATA_KEY",{}) 
            } */
          break;
        case "PATCH":
            console.log(req.body)
            if(!req.body.data){
                return sendResponse(res,404,"MISSING_DATA_KEY",{}) 
            }else{
                if(!req.body.data.values)return sendResponse(res,404,"MISSING_VALUES_KEY",{}) 
                if(!req.body.data.filter)return sendResponse(res,404,"MISSING_FILTER_KEY",{}) 
            }

        break;
        case "DELETE":
            console.log("req params",req.params)

        break;

        default:
        return sendResponse(res,404,"METHOD_NOT_AUTHORISED",{})
      } 
      next()
    
};

module.exports = reqFormatMiddleware;