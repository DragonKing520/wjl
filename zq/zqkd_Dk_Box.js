const $ = new Env('中青看点[ 宝箱 - 打卡 ]');
const t = new Date();




// 建议定时：cron = */30 * * * *




//=========== 运行入口 =========

(async ()=>{
    await $.wait(500);
    
    if (t.getHours()  === 5 && t.getMinutes() === 0){
        await $.wait($.rom(60000,120000));//随机延时 1～2 分钟

        await signed_day(); //每日打卡
        await $.wait(500)

        await turntable_count();    //打卡转盘
        await $.wait(500)
    }

    if (t.getHours() % 2 === 0 && t.getMinutes() === 0){

        await Timing_Box(); //定时宝箱
        await $.wait(500)
    }


    await Hour_Box();   //半小时宝箱
    await $.wait(500)

    await $.done(); //结束

})()









// ========= 参数[自定] =========

/** user 格式如下，可多账号
 * user = [
 *     {
 *         name:"随便定",
 *         headers_Cookie:"xxx",
 *         cookie:"xxxxxxx",
 *         cookie_id:"xxxxxxx",
 *         Hour_Box_Body:"xxxxxx",
 *     },
 * ];
 *【 定时宝箱参数 】
 * headers_Cookie = 抓包 kd.youth.cn/WebApi/invite/openHourRed 请求头的 Cookie
 *
 *【 半小时宝箱参数 】
 * Hour_Box_Body = 抓包 kd.youth.cn/WebApi/TimePacket/getReward 请求参数的 Body
 *
 * name 自己定
 * 
 *【 cookie、cookie_id 】
 * 抓包 kd.youth.cn 下的 cookie 和 cookie_id 即可，一般不退出账号、不会过期【我三个月至今为过期】
 *
 */

const user =[];




// ============= 函数 ===============
/**
 * 打卡-转盘抽奖
 */

async function turntable_count(){if (user.length <= 0){await $.m("user 无参数 跳过执行[ 打卡 - 转盘抽奖 ]");return;}for (let i = 0; i < user.length; i++) {await $.get({url:`https://kd.youth.cn/WebApi/PunchCard/getMainData?cookie_id=${user[i].cookie_id}&cookie=${user[i].cookie}`}).then(async v=>{let d = v.data.luck;await $.m(`➡️ [ ${user[i].name} ]已坚持打卡 ${d.continue_card_days} 天`);if (d.luckdraw_num <= 0){await $.m(`➡️ 当前抽奖次数为0，距离下次获得次数还剩：${(7 - d.continue_card_days) === 1?"明天即可":7 - d.continue_card_days}`);}else{await $.m(`可抽奖 ${d.luckdraw_num} 次`);for (let j = 0; j < d.luckdraw_num; j++) {await $.post({url:`https://kd.youth.cn/WebApi/PunchCard/luckdraw?`, headers:{'Referer' : `https://kd.youth.cn/h5/20190603cardactive/?cookie_id=${user[i].cookie_id}&cookie=${user[i].cookie}`}}).then(async v=>{switch (v.code) {case 0:await console.log(v.msg);break;case 1:await console.log(`➡️ 转盘[ ${j+1}/${d.luckdraw_num} ]: 成功 - 获得 ${v.data.score} 青豆`);break;default:await $.m(v.msg);}});await $.wait(1000)}}});}}

/**
 * 每日打卡
 */
async function signed_day(){if (user.length <= 0){await $.m(`user 无参数 跳过执行[ 每日打卡 ]`);}for(let i = 0; i < user.length; i++) {await $.post({url:"https://kd.youth.cn/WebApi/PunchCard/doCard", headers:{Referer:`https://kd.youth.cn/h5/20190603cardactive/?cookie_id=${user[i].cookie_id}&cookie=${user[i].cookie}`,}}).then(v=>{console.log(`[ 打卡 - ${user[i].name} ]: ${v.msg}`);});await $.wait(1000);await $.post({url:"https://kd.youth.cn/WebApi/PunchCard/signUp", headers:{Referer:`https://kd.youth.cn/h5/20190603cardactive/?cookie_id=${user[i].cookie_id}&cookie=${user[i].cookie}`,}}).then(v=>{console.log(`[ 报名打卡 - ${user[i].name} ]: ${v.msg} `);})}}

/**
 * 半小时宝箱
 */
async function Hour_Box() {if (user.length <= 0) {await $.m(`user 无参数 跳过执行[ 半小时宝箱 ]`);return;}for (let i = 0; i < user.length; i++) {if (user[i].Hour_Box_Body === undefined || user[i].Hour_Box_Body === ""){await console.log(`账号 ${user[i].name} 无半小时宝箱参数[ Hour_Box_Body ] : 跳过执行 ${user[i].name} [ 半小时宝箱 ]`);continue;}await $.post({url: `https://kd.youth.cn/WebApi/TimePacket/getReward`, headers: {Referer: `https://kd.youth.cn/h5/20200612makeMoney/?cookie=${user[i].cookie}&cookie_id=${user[i].cookie_id}`}, body: user[i].Hour_Box_Body}).then(v => {console.log(`[ 半小时宝箱 ${user[i].name} ]: 领取成功`);}).catch(e=>{console.log(`[ 半小时宝箱 ${user[i].name} ]: 领取失败\n原因: ${e}`);});}}

/**
 * 定时宝箱
 */
async function Timing_Box(){if (user.length <= 0){await $.m(`user 无参数 跳过执行 [ 定时宝箱 ]`);return;}for (let i = 0; i < user.length; i++) {if(user[i].headers_Cookie === undefined || user[i].headers_Cookie === ""){await console.log(`账号 ${user[i].name} 无定时宝箱参数[ headers_Cookie ] : 跳过执行 ${user[i].name} [ 定时宝箱 ]`);continue;}await $.post({url: `https://kd.youth.cn/WebApi/invite/openHourRed`, headers: {Cookie: user[i].headers_Cookie, Referer: `https://kd.youth.cn/h5/20190410invitefriend/?cookie_id=${user[i].cookie_id}&cookie=${user[i].cookie}`}}).then(v=>{if (v.code===1){console.log(`[ 定时宝箱 - ${user[i].name} ]：开启成功 获得 ${v.data.score}青豆`)}else {console.log(`[ 定时宝箱 - ${user[i].name} ]：开启失败 ${v.msg}`)};}).catch(e=>{console.log(`发生了错误，原因：${e}`);});}}

function Env(name){const isNode=typeof require==="function";const isQuanX=typeof $task==='object';this.name=typeof name==="undefined"?'':name;console.log(`- ${this.name} \u5f00\u59cb\u6267\u884c -\n-----------------------------------\n`);const start=((n)=>{return new Date().getTime()})();const node=(()=>{if(isNode){const axios=require('axios');const query=require('querystring');return{axios,query}}})();const get=(options)=>{if(options===undefined){return};if(isQuanX){options.method='GET';return new Promise((resolve,reject)=>{$task.fetch(options).then(v=>{let data=JSON.parse(v.body);resolve(data)}).catch(err=>{reject(err)})})};options=typeof options==="string"?{url:options}:options;if(Boolean(options["query"])){typeof options["query"]==="string"?options["url"]+=`?${options["query"]}`:options["url"]+="?"+node.query.stringify(options["query"])};return new Promise((resolve,reject)=>{node.axios.get(options.url,(typeof options==="string")?{}:options.body,(typeof options==="string")?{}:{headers:options.headers}).then(v=>{resolve(v.data)}).catch(err=>{reject(err)})})};const post=(options)=>{if(options===undefined){return};if(isQuanX){options.method='POST';return new Promise((resolve,reject)=>{$task.fetch(options).then(v=>{let data=JSON.parse(v.body);resolve(data)}).catch(err=>{reject(err)})})};options=typeof options==="string"?{url:options}:options;if(Boolean(options["query"])){typeof options["query"]==="string"?options["url"]+=`?${options["query"]}`:options["url"]+="?"+node.query.stringify(options["query"])}return new Promise((resolve,reject)=>{node.axios.post(options.url,(typeof options==="string")?{}:options.body,(typeof options==="string")?{}:{headers:options.headers}).then(v=>{resolve(v.data)}).catch(err=>{reject(err)})})};const rom=(min,max)=>{let n=Math.floor(Math.random()*max);while(n<min)n=Math.floor(Math.random()*max);return n};const wait=(ms)=>{return new Promise(resolve=>{setTimeout(resolve,ms)})};const time=new Date();const done=(data)=>{console.log(`\n-----------------------------------\n- ${this.name} \u6267\u884c\u7ed3\u675f,\u5171\u7528\u65f6${(new Date().getTime()-start)/1000}\u79d2 -`);if(isQuanX){$done(data)}};const m=(msg)=>{let left="";let len=0;if(msg===undefined){return}msg=typeof msg==="string"?msg:msg.toString();for(let i=0;i<msg.length;i++){if(msg.charCodeAt(i)>255){len+=2}else{len++}}if(len>=35){console.log(msg);return}for(let i=0;i<(35-len)/2;i++){left+=" "}console.log(left+msg);return};return{wait,rom,done,time,get,post,m}};