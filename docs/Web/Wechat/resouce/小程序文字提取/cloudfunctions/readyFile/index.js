// 云函数入口文件
const cloud = require('wx-server-sdk')
const AipOcrClient = require("baidu-aip-sdk").ocr;
const config = {
    appId:"21912493",
    appKey:"m9fHQyBURKLkmV8COq4P1Nxp",
    appSecret:"9bhinui6HPAqEraT8Yy61b8chL23VFFR"
}
const client = new AipOcrClient(config.appId,config.appKey,config.appSecret);
const options = {
    "detect_direction":true,
    "probability":true
}
cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
    const { path } = event;
    console.log(path);
    return new Promise(async (resolve,reject)=>{
        const res = await cloud.downloadFile({
            fileID:path
        })
        const image = res.fileContent.toString("base64");
        client.generalBasic(image,options).then(result =>{
            resolve(result);
        }).catch(err =>{
            reject("网络发生错误~");
        })
    })
}