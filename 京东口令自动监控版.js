// 京东口令自动监控
// [rule: raw [\s\S]*[(|)|#|@|$|%|¥|￥|!|！]([0-9a-zA-Z]{10,14})[(|)|#|@|$|%|¥|￥|!|！][\s\S]*]

function main() {

    sendText("口令解析中······")
    
    var jcode = GetContent();
    
    try {
        var data = request({
        url: "http://158.101.153.139:19840/jCommand",
        headers: {token: "填写你申请的token"},
        method: "post",
        dataType: "json",
        body: {code: jcode}
        })
        
        var data = data.data
        var ret = data.jumpUrl 
        var exports = {}
        var activityId=ret.replace(/.*\?activityId\=([^\&]*)\&?.*/g,"$1")
        var actId=ret.replace(/.*\?actId\=([^\&]*)\&?.*/g,"$1")
        
    //cj组队瓜分
    if (ret.indexOf("https://cjhydz-isv.isvjcloud.com/wxTeam/activity") != -1) {
        exports["jd_cjhy_activityId"] = activityId
       
    }
    //组队瓜分京豆
    if (ret.indexOf("https://lzkjdz-isv.isvjcloud.com/wxTeam/activity2") != -1) {
        exports["jd_zdjr_activityId"] = activityId
       
    }
    //微定制
    if (ret.indexOf("https://cjhydz-isv.isvjcloud.com/microDz/invite/activity/wx/view/index") != -1) {
        exports["jd_wdz_activityId"] = activityId
    }
    //分享有礼
    if (ret.indexOf("https://lzkjdz-isv.isvjcloud.com/wxShareActivity/activity") != -1) {
        exports["jd_fxyl_activityId"] = activityId
    }
    //大牌联合
    if (ret.indexOf("https://jinggengjcq-isv.isvjcloud.com/fronth5/#/pages") != -1) {
        exports["DPLHTY"] = actId
    }
    //购物车锦鲤
    if (ret.indexOf("https://lzkjdz-isv.isvjcloud.com/wxCartKoi/cartkoi/activity") != -1) {
        exports["jd_wxCartKoi_activityId"] = activityId
    }
    //粉丝互动
    if (ret.indexOf("https://lzkjdz-isv.isvjcloud.com/wxFansInterActionActivity/activity") != -1) {
        exports["jd_wxFansInterActionActivity_activityId"] = activityId
    }
    //集卡抽奖
    if (ret.indexOf("https://lzkjdz-isv.isvjcloud.com/wxCollectCard/activity") != -1) {
        exports["jd_wxCollectCard_activityId"] = activityId
    }
    //幸运抽奖
    if (ret.indexOf("https://lzkj-isv.isvjcloud.com/wxCollectionActivity/activity2") != -1) {
        exports["M_WX_LUCK_DRAW_URL"] = ret
    }
    if (ret.indexOf("https://lzkj-isv.isvjcloud.com/lzclient") != -1) {
        exports["M_WX_LUCK_DRAW_URL"] = ret
    }
    if (ret.indexOf("https://lzkj-isv.isvjcloud.com/wxDrawActivity/activity") != -1) {
        exports["M_WX_LUCK_DRAW_URL"] = ret
    }
    if (ret.indexOf("https://cjhy-isv.isvjcloud.com/wxDrawActivity/activity") != -1) {
        exports["M_WX_LUCK_DRAW_URL"] = ret
    }
    //加购有礼
    if (ret.indexOf("https://cjhy-isv.isvjcloud.com/wxCollectionActivity/activity") != -1) {
        exports["M_WX_ADD_CART_URL"] = ret
    }
    var text = []
    for (var key in exports) {
        text.push(fmt.sprintf("export %s=\"%s\"", key, exports[key]))
    }
    if(text.length==0){
        sendText(ret)
    }else{
        var ret = text.join("\n")
        sendText(ret)
        breakIn(ret)
        }

    }catch (e) {
        sendText("无法解析")
        
    }

}

main()
