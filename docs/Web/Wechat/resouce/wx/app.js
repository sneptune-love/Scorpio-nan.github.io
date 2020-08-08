// @ts-nocheck
const Koa = require("koa");
const Router = require("koa-router");
const static = require("koa-static");
const bodyparser = require("koa-bodyparser");
const config = require("./config");
const wechat = require("co-wechat");
const { default: axios } = require("axios");
const app = new Koa();
const router = new Router();

router.all('/wechat',wechat(config).middleware(
    async message =>{
        console.log("message",message);
        return "Hello Wechat" + message.Content;
    }
))

const { serverToken, clientToken } = require("./mongoose");
const WechatApi = require("co-wechat-api");
// 后面两个参数就是 token 的 get 和 set 方法
const api = new WechatApi(config.appid,config.appsecret,
    async function(){
        return await serverToken.findOne();
    }, 
    async function(token){
        const res = await serverToken.updateOne({},token,{ upsert:true });
    }
);

router.get('/getUserList', async ctx =>{
    ctx.body = await api.getFollowers();
})


/**
 * 验证签名, 获取 jsconfig 
 */
router.get('/getJsConfig', async ctx =>{
    const res = await api.getJsConfig(ctx.query);
    ctx.body = res;
})

/**
 * 导向到微信登录授权界面
 */
const OAuth = require("co-wechat-oauth");
const oauth = new OAuth(config.appid,config.appsecret,
    async function(openid){
        return await clientToken.getToken(openid);
    },
    async function(openid,token){
        return await clientToken.setToken(openid,token);
    }
);

router.get('/wxAuthorize', async ctx=>{
    const state = ctx.query.id;
    console.log("ctx...",ctx.href);
    let redirectUrl = ctx.href;
    redirectUrl = redirectUrl.replace('wxAuthorize','wxCallback');
    const scope = "snsapi_userinfo";

    const url = oauth.getAuthorizeURL(redirectUrl,state,scope);
    console.log("url",url);
    ctx.redirect(url);
})


/**
 * 接收回调
 */
router.get('/wxCallback', async ctx =>{
    // 授权码
    const code = ctx.query.code;
    console.log("getAccessCode",code);

    const token = await oauth.getAccessToken(code);
    const accessToken = token.data.access_token;
    const openid = token.data.openid;

    ctx.redirect('/?openid=' + openid);
})


/**
 * 获取用户信息 
 */
router.get('/getUserInfo',async ctx =>{
    const openid = ctx.query.openid;
    const userInfo = await oauth.getUser(openid);
    ctx.body = userInfo;
})


app.use(bodyparser());
app.use(static(__dirname + '/'));
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3001);