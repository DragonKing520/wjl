const $ = new Env("中青看点[ 转发文章 ]");
//建议 cron = 1 5,11,18 * * *


// ===== 运行入口 =======

(async ()=>{

    await $.wait(1000,1500);
    await forwarding();
    await $.done();
})()




//---------------------------- 分割线 ----------------------------





// ============= 参数[自定] ==============

const body = [];

/**
 *  格式 如下
 * body =[
 *     {
 *         name:`随便定`,
 *         query:`抓包 kandian.wkandian.com/v6/article/share/put.json 下url 中 zqkd_param 开头参数`,
 *         cookie:"抓包 kd.youth.cn 下的 cookie 和 cookie_id 即可",
 *         cookie_id:"抓包 kd.youth.cn 下的 cookie 和 cookie_id 即可，一般不退出账号、不会过期【我三个月至今为过期】",
 *         zs:` 【早上、中午、晚上的参数不会一样 所以要注意】抓包 kd.youth.cn/WebApi/ShareNew/execExtractTask 请求下的body参数`,
 *         zw:`抓包 kd.youth.cn/WebApi/ShareNew/execExtractTask 下body参数`,
 *         ws:`抓包 kd.youth.cn/WebApi/ShareNew/execExtractTask 下body参数`,
 *     }
 * ]
 *
 */










//================ 函数 ===============


async function forwarding(){if (body.length <= 0) {$.m(`无转发文章[ body ] 跳过执行[ 转发文章 ]`);}const t = new Date().getHours();const m = t >= 5 && t <= 10 ? "zs" : t >= 11 && t <= 16 ? "zw" : t >= 17 && t <= 22 ? "ws" : "未在有效转发领取奖励时间段";for (let i = 0; i < body.length; i++) {if(body[i].query === undefined || body[i].cookie === undefined || body[i].cookie_id === undefined) {console.log(`账号 ${body[i].name} 无[ cookie/cookie_id/query ]参数 跳过执行该账号`);continue;};for(let j = 0; j < 2; j++){await $.get({url:`https://kandian.wkandian.com/v6/article/share/put.json?${body[i].query}`, headers:{'User-Agent': `KDApp/3.0.2 (iPhone; iOS 15.6; Scale/3.00)`, 'Host': `kandian.wkandian.com`, 'Connection': `keep-alive`, 'Accept-Language': `zh-Hans-CN;q=1`, 'Accept-Encoding': `gzip, deflate, br`, 'Accept': `*/*`}}).then(v => {console.log(`[ 转发文章 ${j + 1}/2 ${body[i].name}]: 成功`);}).catch(e => {console.log(`[ 转发文章 ${j + 1}/2 ${body[i].name}]: 失败\n原因: ${e}`)});await $.wait($.rom(1000, 1500));}if (m === "未在有效转发领取奖励时间段") {await console.log(`[ 转发文章-领取奖励 ]: ${m}`);return;}if(body[i][m] === undefined) {console.log(`[ 转发文章-领取奖励 ]:无领取参数[ ${m} ]`);return}await $.post({url: `https://kd.youth.cn/WebApi/ShareNew/execExtractTask`, headers: {Referer: `https://kd.youth.cn/h5/20200612makeMoney/?cookie=${body[i].cookie}&cookie_id=${body[i].cookie_id}`}, body: body[i][m]}).then(v => {console.log(`[ ${body[i].name} 转发文章奖励领取 ]: 成功!`)}).catch(e => {console.log(` ❌ 发生了错误，原因:${e}`)});await $.wait(500);}}


//勿动
function Env(name){const isNode=typeof require==="function";const isQuanX=typeof $task==='object';this.name=typeof name==="undefined"?'':name;console.log(` -${this.name}开始执行-\n-----------------------------------\n`);const start=((n)=>{return new Date().getTime()})();const node=(()=>{if(isNode){const axios=require('axios');const query=require('querystring');return{axios,query}}})();const get=(options)=>{if(options===undefined){return};if(isQuanX){options.method='GET';return new Promise((resolve,reject)=>{$task.fetch(options).then(v=>{let data=JSON.parse(v.body);resolve(data)}).catch(err=>{reject(err)})})};options=typeof options==="string"?{url:options}:options;if(Boolean(options["query"])){typeof options["query"]==="string"?options["url"]+=`?${options["query"]}`:options["url"]+="?"+node.query.stringify(options["query"])};return new Promise((resolve,reject)=>{node.axios.get(options.url,(typeof options==="string")?{}:options.body,(typeof options==="string")?{}:{headers:options.headers}).then(v=>{resolve(v.data)}).catch(err=>{reject(err)})})};const post=(options)=>{if(options===undefined){return};if(isQuanX){options.method='POST';return new Promise((resolve,reject)=>{$task.fetch(options).then(v=>{let data=JSON.parse(v.body);resolve(data)}).catch(err=>{reject(err)})})};options=typeof options==="string"?{url:options}:options;if(Boolean(options["query"])){typeof options["query"]==="string"?options["url"]+=`?${options["query"]}`:options["url"]+="?"+node.query.stringify(options["query"])}return new Promise((resolve,reject)=>{node.axios.post(options.url,(typeof options==="string")?{}:options.body,(typeof options==="string")?{}:{headers:options.headers}).then(v=>{resolve(v.data)}).catch(err=>{reject(err)})})};const rom=(min,max)=>{let n=Math.floor(Math.random()*max);while(n<min)n=Math.floor(Math.random()*max);return n};const wait=(ms)=>{return new Promise(resolve=>{setTimeout(resolve,ms)})};const time=new Date().getTime();const done=(data)=>{console.log(`\n-----------------------------------\n-${this.name}执行结束，共用时${(new Date().getTime()-start)/1000}秒-`);if(isQuanX){$done(data)}};return{get,post,wait,rom,done,time}};