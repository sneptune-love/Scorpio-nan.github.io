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

/**
 * 获取token
 */
const TokenCache = {
    access_token : "",
    updateTime: Date.now(),
    expires_in: 7200
}
router.get('/getToken',async ctx =>{
    const url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${config.appid}&secret=${config.appsecret}`;
    const res = await axios.get(url);

    Object.assign(TokenCache,res.data,{
        updateTime:Date.now()
    })
    
    ctx.body = TokenCache;
})

/**
 * 获取用户列表
 */
router.get('/getUserList', async ctx =>{
    const url= `https://api.weixin.qq.com/cgi-bin/user/get?access_token=${TokenCache.access_token}`;
    const res = await axios.get(url);

    ctx.body = res.data;
})






app.use(bodyparser());
app.use(static(__dirname + '/'));
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3001);