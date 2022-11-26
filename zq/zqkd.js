const $ = new Env("中青看点");
const t = new Date().getHours();


/**
 * 执行时间建议 -> 5 2,7,22 * * *
 * 能够执行大部分任务 取决于你抓包多少
 */






//=====  运行入口   ==========================================

(async ()=>{
    await $.wait(1000);
    if (t<=5){
        await qd();
        await $.wait(2000);
        await ydsj();

        await $.done();
        return;
    }
    if (t>=22){
        await wzsp();
        await $.done();
        return;
    }
    await cj();
    await FLSP();
    await wzsp();
    await KKZ();
    await GetReward();


    await cx();
    await $.done();

})()










//---------------------- 参数调整 [可动] -----------------------------

/**刷阅读时间 参数
 * body:抓包 kandian.wkandian.com/v5/user/stay.json 下的请求参数
 *
 * ydsj_body = [
 *     {
 *         name:`随便定`,
 *         body:`参数填这`
 *     },
 * ];
 */
const ydsj_body = [];


/**领取奖励参数
 * body:抓包 toGetReward.json 下的请求参数
 *
 * 例子如下：
 * GetRewardArr = [
 *     [
 *         {"福利视频":`zqkd_param=xxxxx`},
 *         {"阅读 5 分钟":`zqkd_param=xxxxx`},
 *         {"阅读 60 分钟":`zqkd_param=xxxxx`},
 *         {"抽奖赚":"zqkd_param=xxxxx"},
 *         {"转发文章（2)":"zqkd_param=xxxxx"},
 *     ]
 * ];
 *
 */
const GetRewardArr = [];


/**
 * Cookie 参数
 * 抓包 RotaryTable/getData 下请求参数，只需要 cookie 和 cookie_id 数值
 *
 * 格式如下：
 * user = [
 *     {
 *         name:"iphone 8 Plus",
 *         cookie:"xxx",
 *         cookie_id:"xxx",
 *     },
 * ];
 */
const user = [];


/**签到参数
 * 抓包 sign.json? url后的参数
 *
 * 格式如下
 * Qd_Ruery = [
 *     {"iPhone 8P": `zqkd_param=xxxx`},
 * ]
 */
const Qd_Ruery = [];



/** 福利视频 参数
 *抓包 sign.json? url后的参数
 *格式 {name:xxxxx}
 *
 *Flsp_Body = [
 *     {"名字随便定": `参数填这`},
 * ];
 *
 */
const Flsp_Body = [];


/** 文章视频 参数 【一个视频 或者 一篇文章 就抓一个参数 不嫌累的话建议抓十几二十个】
 * 抓包 v5/article/complete.json 下请求参数
 *
 * 格式如下
 *
 * wzsp_body = [
 *     {
 *         name:"iPhone 12",
 *         video:[
 *             "zqkd_param=xxx",
 *         ],
 *         read:[
 *             "zqkd_param=xxx",
 *         ]
 *     }
 * ];
 *
 */
let wzsp_body = [];


/**看看赚 参数 【一篇 一个参数】
 * 抓包 v5/Nameless/adlickstart.json 下请求参数
 *
 * 格式如下
 *
 * kkz=[
 *     {
 *         name:"iPhone 12",
 *         body:[
 *             {"不负夏光":"zqkd_param=xxx"},
 *             {"灿如白银":"zqkd_param=xxxx"},
 *             ]
 *     }
 * ];
 *
 *
 */
const kkz=[];


















//------------------------- 函数 [建议勿动] --------------------------

//刷阅读时间次数
async function ydsj(){if(ydsj_body.length <= 0){$.m(`无刷阅读时间参数 跳过执行[刷阅读时间次数]`);return;}await $.m(`---------刷阅读时间----------\n`);await $.m(`共${ydsj_body.length}个账号`);await $.m(`-------------------\n`);for(let i=0;i<ydsj_body.length;i++){await $.m(`开始刷${ydsj_body[i].name}阅读时间次数`);await $.m(`--------------------\n`);for(let j=0;j<65;j++){await $.post({url:`https://kandian.wkandian.com/v5/user/stay.json`,headers:{'Accept':`*/*`,'Accept-Encoding':`gzip,deflate,br`,'Connection':`keep-alive`,'Content-Type':`application/x-www-form-urlencoded`,'Host':`kandian.wkandian.com`,'User-Agent':`KDApp/3.0.2(iPhone;iOS 15.6;Scale/3.00)`,'Accept-Language':`zh-Hans-CN;q=1`},body:`${ydsj_body[i].body}`}).then(v=>{$.m(`${ydsj_body[i].name}第${j+1}次完成😎`)}).catch(e=>{$.m(`❌发生了错误!原因:${e}`)});await $.wait(61000)}if(i+1===ydsj_body.length){await $.m(`阅读时间已完成,请领取奖励`);await $.m(`---------------------\n`)}}}

//转盘抽奖
async function cj(){if(user.length <= 0){$.m(`无Cookie参数 跳过执行[转盘抽奖]`);return;}await $.m(`---------转盘抽奖----------\n`);await $.m(`共${user.length}个账号`);await $.m(`-------------------\n`);for(let i=0;i<user.length;i++){await $.m(`开始账号${user[i].name}转盘抽奖`);await $.m(`--------------\n`);await $.post({url:`https://kd.youth.cn/WebApi/RotaryTable/getData`,headers:{'Referer':`https://kd.youth.cn/html/rotaryTable/index.html?cookie=${user[i].cookie}&cookie_id=${user[i].cookie_id}`}}).then(async res=>{if(res.data.remainTurn===0){$.m("转盘抽奖次数为0")};for(let j=0;j<res.data.remainTurn;j++){await $.post({url:`https://kd.youth.cn/WebApi/RotaryTable/turnRotary`,headers:{'Cookie':"Hm_lpvt_268f0a31fc0d047e5253dd69ad3a4775=1666089236; Hm_lvt_268f0a31fc0d047e5253dd69ad3a4775=1666063562,1666066682; sensorsdata2019jssdkcross=%7B%22distinct_id%22%3A%2269285194%22%2C%22%24device_id%22%3A%22183e9206f44860-0b880272ba1a2a-744c1251-304704-183e9206f45a0f%22%2C%22props%22%3A%7B%22%24latest_traffic_source_type%22%3A%22%E7%9B%B4%E6%8E%A5%E6%B5%81%E9%87%8F%22%2C%22%24latest_referrer%22%3A%22%22%2C%22%24latest_referrer_host%22%3A%22%22%2C%22%24latest_search_keyword%22%3A%22%E6%9C%AA%E5%8F%96%E5%88%B0%E5%80%BC_%E7%9B%B4%E6%8E%A5%E6%89%93%E5%BC%80%22%7D%2C%22first_id%22%3A%22183e9206f44860-0b880272ba1a2a-744c1251-304704-183e9206f45a0f%22%7D; sensorsdata2015jssdkcross=%7B%22distinct_id%22%3A%2269285194%22%2C%22%24device_id%22%3A%22183e92cdd42568-0f4de62f3e2879-744c1251-304704-183e92cdd43b16%22%2C%22props%22%3A%7B%22%24latest_traffic_source_type%22%3A%22%E7%9B%B4%E6%8E%A5%E6%B5%81%E9%87%8F%22%2C%22%24latest_referrer%22%3A%22%22%2C%22%24latest_referrer_host%22%3A%22%22%2C%22%24latest_search_keyword%22%3A%22%E6%9C%AA%E5%8F%96%E5%88%B0%E5%80%BC_%E7%9B%B4%E6%8E%A5%E6%89%93%E5%BC%80%22%7D%2C%22first_id%22%3A%22183e92cdd42568-0f4de62f3e2879-744c1251-304704-183e92cdd43b16%22%7D; sajssdk_2015_cross_new_user=1; sajssdk_2019_cross_new_user=1",'Referer':`https://kd.youth.cn/html/rotaryTable/index.html?cookie=${user[i].cookie}&cookie_id=${user[i].cookie_id}`}}).then(v=>{if(v.code==="10010"){return console.log(`转盘:\t${v.msg}`)}console.log(`转盘:\t本次获得青豆:${v.data.score}\t剩余转盘次数:${v.data.remainTurn}`)}).catch(e=>{console.log(`发生了错误，原因：${e}`)});await $.wait(1500);await $.post({url:`https://kd.youth.cn/WebApi/RotaryTable/toTurnDouble?_=1662915537136`,headers:{'Referer':`https://kd.youth.cn/html/rotaryTable/index.html?cookie=${user[i].cookie}&cookie_id=${user[i].cookie_id}`}}).then(v=>{if(v.status===1){console.log(`翻倍:\t翻倍成功!获得豆子:${v.data.score}`)}if(v.status===0){console.log(`翻倍:\t本轮轮空`)}}).catch(e=>{console.log(`发生了错误，原因：${e}`)});await $.wait(1000)}});await $.m(`账号${user[i].name}转盘抽奖已完成`);await $.m(`--------------------------------`)}}

//领取奖励
async function GetReward(){if(GetRewardArr.length <= 0){$.m(`无领取奖励参数 跳过执行[领取奖励]`);return;}await $.m(`---------领取奖励----------\n`);await $.m(`共${GetRewardArr.length}个账号`);await $.m(`-------------------\n`);for(let i=0;i<GetRewardArr.length;i++){await $.m(`开始${i+1}个账号`);await $.m(`----------`);for(const a of GetRewardArr[i]){for(const b in a){await $.post({url:`https://kandian.wkandian.com/V5/CommonReward/toGetReward.json`,headers:{'Accept':`*/*`,'Accept-Encoding':`gzip,deflate,br`,'Connection':`keep-alive`,'Content-Type':`application/x-www-form-urlencoded`,'Host':`kandian.wkandian.com`,'User-Agent':`KDApp/3.0.2(iPhone;iOS 15.6;Scale/3.00)`,'Accept-Language':`zh-Hans-CN;q=1`},body:`${a[b]}`}).then(v=>{$.m(`${b}奖励领取成功!`)});await $.wait($.rom(1000,2000))}}await $.m(`💥`);await $.m(`第${i+1}个账号奖励已全部领取`);await $.m(`--------------------\n`)}}

//签到
async function qd(){if(Qd_Ruery.length <= 0){$.m(`无签到参数 跳过执行[签到]`);return;}await $.m(`---------签到----------\n`);await $.m(`共${Qd_Ruery.length}个账号`);await $.m(`-------------------\n`);for(let i=0;i<Qd_Ruery.length;i++){for(const k in Qd_Ruery[i]){await $.m(`${k}开始签到`);await $.m(`----`);await $.get({url:`https://kandian.wkandian.com/V17/NewTaskIos/sign.json?${Qd_Ruery[i][k]}`,headers:{'User-Agent':`KDApp/3.0.2(iPhone;iOS 15.6;Scale/3.00)`,'Host':`kandian.wkandian.com`,'Connection':`keep-alive`,'Accept-Language':`zh-Hans-CN;q=1`,'Accept-Encoding':`gzip,deflate,br`,'Accept':`*/*`}}).then(v=>{if(v){$.m(`${k}签到成功`);$.m(`\n`);$.m(`-------------------\n`)}})}}}

//福利视频
async function FLSP(){if(Flsp_Body.length <= 0){$.m(`无福利视频参数 跳过执行[福利视频]`);return;}await $.m(`---------福利视频----------\n`);await $.m(`共${Flsp_Body.length}个账号`);await $.m(`-------------------\n`);for(let i=0;i<Flsp_Body.length;i++){for(const k in Flsp_Body[i]){await $.m(`${k}开始跑福利视频`);await $.m(`---------------\n`);for(let j=0;j<5;j++){await $.post({url:`https://kandian.wkandian.com/V17/NewTaskIos/recordNum.json`,body:`${Flsp_Body[i][k]}`}).then(v=>{$.m(`福利视频本次阅读成功,第${j+1}次`)}).catch(e=>{$.m(`失败了!!原因:${e}`);});await $.wait(2000)}await $.m(`${k}完成`);await $.m(`--------------------\n`)}}await $.m(`福利视频完成\n`);await $.m(`--------------------\n`);}

//查询收入
async function cx(){if(user.length<=0){$.m(`无Cookie参数 跳过执行[查询收入]`);return;};await $.m(`-----------------------------------\n`);await $.m(`查询收入\n`);await $.m(`-----------------------------------`);for(let i=0;i<user.length;i++){await $.m(`账号${user[i].name}今日收入\n`);await $.get({url:`https://kd.youth.cn/wap/user/balance?cookie=${user[i].cookie}&cookie_id=${user[i].cookie_id}`}).then(v=>{console.log(`-今日获得青豆->${v.user.today_score}-\n-剩余青豆总数:${v.user.score}-\n-约等于->${v.user.money}元-`)}).catch(e=>{$.m(`发生了错误，原因：${e}`)});await $.m(`-----------------------------------`)}}

//阅读视频文章(文章，视频)
async function wzsp(){if(wzsp_body.length === 0){await $.m(`无文章视频参数 跳过执行[文章视频]`);return;}const run=async(body_arr,name)=>{for(let i=0;i<body_arr.length;i++){for(let j = 0; j < 5; j++){await $.post({url:"https://kandian.wkandian.com/v5/article/complete.json", headers:{'Accept': `*/*`, 'Accept-Encoding': `gzip,deflate,br`, 'Connection': `keep-alive`, 'Content-Type': `application/x-www-form-urlencoded`, 'Host': `kandian.wkandian.com`, 'User-Agent': `KDApp/3.0.2(iPhone;iOS 15.6;Scale/3.00)`, 'Accept-Language': `zh-Hans-CN;q=1`}, body: body_arr[i]}).then(v => {$.m(`第 ${i + 1} 个${name}:第 ${j + 1} 次成功`)}).catch(e=>{$.m(`第 ${i + 1} 个${name}:第 ${j + 1} 次失败,原因:${e}`)});await $.wait(10000);}}};for(let i = 0; i < wzsp_body.length; i++){const video = typeof wzsp_body[i].video !== "undefined" && wzsp_body[i].video.length !== 0;const read = typeof wzsp_body[i].read !== "undefined" && wzsp_body[i].read.length !== 0;await $.m(`账号 ${wzsp_body[i].name} 开始阅读视频文章`);await $.m(`\n`);if(read){await $.m(`---------- 阅读文章 ----------`);await $.m(`共 ${wzsp_body[i].read.length} 篇文章`);await $.m(`----------------------`);await run(wzsp_body[i].read,"文章");await $.m(`----------`);await $.m(`${wzsp_body[i].name} 文章阅读已完成`);await $.m(`----------------------`);}else{await $.m(`无文章参数 跳过执行[阅读文章]\n`);}if (video){await $.m(`---------- 观看视频 ----------`);await $.m(`共 ${wzsp_body[i].video.length} 个视频`);await $.m(`----------------------`);await run(wzsp_body[i].video,"视频");await $.m(`----------`);await $.m(`${wzsp_body[i].name} 观看视频已完成`);await $.m(`----------------------`);}else{await $.m(`无视频参数 跳过执行[观看视频]\n`);}await $.m(`\n`);}}

//看看赚
async function KKZ(){if(kkz.length <= 0){$.m(`无看看赚参数 跳过执行[看看赚]`);return;};await $.m(`共 ${kkz.length} 个账号`);await $.m(`--------------------`);for(let i = 0; i < kkz.length; i++){await $.m(`开始 ${kkz[i].name} 的看看赚`);await $.m(`----------`);for(let j = 0; j < kkz[i].body.length; j++){for(const name in kkz[i].body[j]){await $.post({url:`https://kandian.wkandian.com/v5/Nameless/adlickstart.json`,headers:{'Accept': `*/*`, 'Accept-Encoding': `gzip, deflate, br`, 'Connection': `keep-alive`, 'Content-Type': `application/x-www-form-urlencoded`, 'Host': `kandian.wkandian.com`, 'User-Agent': `KDApp/3.0.2 (iPhone; iOS 15.6; Scale/3.00)`, 'Accept-Language': `zh-Hans-CN;q=1`},body: `${kkz[i].body[j][name]}`}).then(v=>{if(v){$.m(`- ${name} 开启成功 -`);}});await $.wait($.rom(1000,3000));for(let e = 0; e < 6; e++){await $.post({url: 'https://kandian.wkandian.com/v5/Nameless/bannerstatus.json', headers:{'Accept': `*/*`, 'Accept-Encoding': `gzip, deflate, br`, 'Connection': `keep-alive`, 'Content-Type': `application/x-www-form-urlencoded`, 'Host': `kandian.wkandian.com`, 'User-Agent': `KDApp/3.0.2 (iPhone; iOS 15.6; Scale/3.00)`, 'Accept-Language': `zh-Hans-CN;q=1`}, body: `${kkz[i].body[j][name]}`}).then(v=>{$.m(`${name} 第${e+1}次阅读成功`)});await $.wait($.rom(1000,3000));}await $.wait(3000);await $.post({url: 'https://kandian.wkandian.com/v5/Nameless/adlickend.json', headers:{'Accept': `*/*`, 'Accept-Encoding': `gzip, deflate, br`, 'Connection': `keep-alive`, 'Content-Type': `application/x-www-form-urlencoded`, 'Host': `kandian.wkandian.com`, 'User-Agent': `KDApp/3.0.2 (iPhone; iOS 15.6; Scale/3.00)`, 'Accept-Language': `zh-Hans-CN;q=1`},body: `${kkz[i].body[j][name]}`}).then(v=>{$.m(`- ${name} 奖励领取成功 -`);$.m(`\n`);});await $.wait($.rom(1000,3000));}};$.m(`--${kkz[i].name} 看看赚已完成 -`);$.m(`------------------------`);$.m(`\n`);}}

//-------------- [建议勿动] ----------------------
function Env(name){const isNode=typeof require==="function";const isQuanX=typeof $task==='object';this.name=typeof name==="undefined"?'':name;console.log(`- ${this.name} \u5f00\u59cb\u6267\u884c -\n-----------------------------------\n`);const start=((n)=>{return new Date().getTime()})();const node=(()=>{if(isNode){const axios=require('axios');const query=require('querystring');return{axios,query}}})();const get=(options)=>{if(options===undefined){return};if(isQuanX){options.method='GET';return new Promise((resolve,reject)=>{$task.fetch(options).then(v=>{let data=JSON.parse(v.body);resolve(data)}).catch(err=>{reject(err)})})};options=typeof options==="string"?{url:options}:options;if(Boolean(options["query"])){typeof options["query"]==="string"?options["url"]+=`?${options["query"]}`:options["url"]+="?"+node.query.stringify(options["query"])};return new Promise((resolve,reject)=>{node.axios.get(options.url,(typeof options==="string")?{}:options.body,(typeof options==="string")?{}:{headers:options.headers}).then(v=>{resolve(v.data)}).catch(err=>{reject(err)})})};const post=(options)=>{if(options===undefined){return};if(isQuanX){options.method='POST';return new Promise((resolve,reject)=>{$task.fetch(options).then(v=>{let data=JSON.parse(v.body);resolve(data)}).catch(err=>{reject(err)})})};options=typeof options==="string"?{url:options}:options;if(Boolean(options["query"])){typeof options["query"]==="string"?options["url"]+=`?${options["query"]}`:options["url"]+="?"+node.query.stringify(options["query"])}return new Promise((resolve,reject)=>{node.axios.post(options.url,(typeof options==="string")?{}:options.body,(typeof options==="string")?{}:{headers:options.headers}).then(v=>{resolve(v.data)}).catch(err=>{reject(err)})})};const rom=(min,max)=>{let n=Math.floor(Math.random()*max);while(n<min)n=Math.floor(Math.random()*max);return n};const wait=(ms)=>{return new Promise(resolve=>{setTimeout(resolve,ms)})};const time=new Date();const done=(data)=>{console.log(`\n-----------------------------------\n- ${this.name} \u6267\u884c\u7ed3\u675f,\u5171\u7528\u65f6${(new Date().getTime()-start)/1000}\u79d2 -`);if(isQuanX){$done(data)}};const m=(msg)=>{let left="";let len=0;if(msg===undefined){return}msg=typeof msg==="string"?msg:msg.toString();for(let i=0;i<msg.length;i++){if(msg.charCodeAt(i)>255){len+=2}else{len++}}if(len>=35){console.log(msg);return}for(let i=0;i<(35-len)/2;i++){left+=" "}console.log(left+msg);return};return{wait,rom,done,time,get,post,m}};
