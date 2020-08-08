// @ts-nocheck
const Mongoose = require("mongoose");
const { Schema } = Mongoose;
Mongoose.connect("mongodb://localhost:27017/weixin",{
    useNewUrlParser:true
},()=>{ console.log("Mongoose connect") });


exports.serverToken = Mongoose.model("ServerToken",{
    accessToken: String
})

// ClientAccessToken
const schema = new Schema({
    access_token:String,
    expires:Number,
    refresh_token:String,
    openid:String,
    scope:String,
    create_at:String
})

// 构建两个静态的方法, 取值
schema.statics.getToken = async function (openid){
    return await this.findOne({ openid: openid });
}

// 存值
schema.statics.setToken = async function (openid,token){
    const query = {
        openid:openid
    }
    const options = {
        upsert:true
    }
    return await this.updateOne(query,token,options);
}

exports.clientToken = Mongoose.model("clientToken",schema);
