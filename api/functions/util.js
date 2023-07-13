

sendResponse =  (res,status,message="",data={}) =>{
    console.log("Response: ",{
        message: message,
        data:data
      })
       return res.status(200).send({
          message: message,
          data:data
        });


  }


module.exports = {
    sendResponse
};