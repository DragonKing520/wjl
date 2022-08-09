import base64
import requests
import json
import time
from Crypto.Cipher import AES
from binascii import b2a_hex
from Crypto.Util.Padding import pad

'''
青龙需要安装依赖 pycryptodome(不然报错）
第18行填手机号 其他都是抓包(抓包-点击任务)
有bug自己修 因为我是菜鸟不知道咋解决
'''

# --------------以下为配置区需自行填写--------------#

config_list = [
    {"mobile": "15557588335", "food": True}  # true自动喂食
]

# 企业微信机器  pushplus

QWERTY = ""

TOKEN = ''

# --------------抓包区------------#

'''
金豆商城(用户中心)
抓包 https://wapside.189.cn:9001/jt-sign/api/home/homeInfo 过滤 homeInfo  请求找"para": "xxx"
'''
home_info_body = {
    "para": "a2977bf8e986ae9988c001147ba9dced9d09390d1c2ba2b2272968796cc37dc60775091c0e5959acf7fb29324d617d21977cab607b5e702c25b2e4be3df2d17defbefa15979b1b9e46c82c132cf8b9b36fcd74642abad999ec46f50d091b08af12329490f0a1cf29e543b866dd09d073acb359fbc6e38fe7aaec887b79c2b080bcf57f781d1d1410859724ae4b6ea26dc316e34e7ccf8895f317e3e7f947346601c33d11568b2efae63919981719425602c82bc9c006a641f6e06117b8c8e9c4b9541f3ce63ce62a9026c02f783d6cbf69fc3b097796d20890b3afa2c1291f5829c830d0383f955c6402fa76a6297d0670a98beac5ac542e15889896943b60b9"
}

'''
喂食 
抓包 https://wapside.189.cn:9001/jt-sign/paradise/food 过滤food  请求找"para": "xxx"
'''
food_body = {
    "para": "034755cf05498ad65c8ea9da4e3a481ff94d79d8e150157fe79b3e39b5e86a3d50db5f149519a8c2c3ed5e61c37fbcadf385439626c55f09baa98a94af57dcaa5fe85c80a6f508e50fcebc9d9adbe6f0249affb9867810476ef446f35d436be3b914b92da3d5e702d47543dedadc70b7993b48cd24de843637e0d21eb39a9a78"
}

'''
分享 领流量 20金豆
抓包 https://dxhd.189.cn:7081/actcenter/v1/goldcoinuser/shareToGetCoin.do 过滤share 找到session 请求找'session': 'xxx'
    https://dxhd.189.cn/actcenter/v1/goldcoinuser/getIndexData.do 这个链接也可也找到session
'''
share_body = {
    'activityId': 'telecomrecommend01',
    'session': ''}

'''
云盘 种树 我的订单 10金豆
云盘 抓包 https://wapside.189.cn:9001/jt-sign/paradise/polymerize  过滤 polymerize  请求找"para": "xxx"

种树 抓包 https://wapside.189.cn:9001/jt-sign/paradise/polymerize  过滤 polymerize  请求找"para": "xxx"

我的订单 https://wapside.189.cn/jt-sign/paradise/polymerize 过滤 polymerize  请求找"para": "xxx"
'''
cloud_body = {
    "para": "0aad50734b20c8c361695b1c064cb76a00660af86c8cc6670966d3242a8a776371a6dc5fc71a4621629541379f6230e3543bf016c418de6ebfef7def7a008ae3251067d1b350966e4d9ac97ae0ab214870edd1b8ba8bf5ba7e31d12adfd3e086ee7873705a8de311ecc98fb57b9dbd205418d078243820e84faa145bdf330f2cbd93f4a7e7b0763bc3d09d07ab209d61bc86015a9f03cfd24917233198e59e3f9098718ec4cd60d1cdc0c47ee8e15eecb1a41191b3d4ac3d64384330f1def45c0842eef1948ad06f51fbde82268f1a935720cc1399cd6427cc6fd0e1ad7702fe09b703a8dd44e26ae287e3ef9a5ec5bd1765893b1749a28e91011b46743d6dee7a970622dc95b51b561fbd73260ddd12d303602a70ab4f32327f4cf7331846b8e01d6899809794e9da33253c05ea1260ecd9333575ebcaa93a2f6c8bf06497a260319db937fcebde09299d6240eb07f3ddf0d3674698e2bbcf0dde298c13d07a00973dba058733e1c682d03a59e4de6200299008ad1248868d2b7344a7fd5d5905b6589066079e3076074cc565ddcbb8695c5a32d116d9338e278d7542b7b7cbc4ab678994cdf8ec313e54fe097c965c610385afbf5e230c54db1139b18acaeae165c631fa47a4d64e515b67ce5bdc88fbe9fc681bc44066a00a9a1316c2f0c03cdf91db7b71afa738d74dbb110747a3e6422118162ccb1a475ec0d32f26463a6163c5d3ce8e8cd7804f6a82a369cdd4a0c8c86c3ade1dfa0327c40f683af58e1300ecdf58c9c37b60a7cfa72e4d76258a0df3a692fe4e7e1746376562249efd913f6fba8abcb1130301e2792bc0b7692afef3ae2a3fc09e1e2d2e569a6f785ca9dc012641b5738bed3f1fe0284efdaf96f754d1ddba67de7d259d77140e6920"
}

tree_body = {
    "para": ""
}

wode_body = {
    "para": ""}

'''
登录任务 金豆+5
抓包 https://wapside.189.cn:9001/jt-sign/paradise/receiveReward 过滤 receiveReward  请求找"para": "xxx"
'''
deng_body = {
    "para": ""
}

'''
签到七天兑换话费
抓包 https://wapside.189.cn:9001/jt-sign/reward/activityMsg 查询几天 过滤Msg 请求找"para": "xxx"

抓包 https://wapside.189.cn:9001/jt-sign/reward/convertReward 兑换 过滤convertReward  请求找"para": "xxx"
'''
phone_body = {
    "para": ""
}
reward_body = {
    "para": ""}

'''
10点兑换话费分析

抓包 https://wapact.189.cn:9001/panda/common/goldBeanMall.do 

5元话费 

gold_body = {
    "headerInfo": {
        "functionCode": "gBMExchange"
    },
    "requestContent": {
        "sessionid": "04df5e2ef02b41bbb2f5984d93aef9ec",
        "activitieId": "62177496d760c0565aed56f8"
    }
}

{"headerInfo": { "functionCode": "gBMCheckGoods"},"requestContent":{"sessionid":"a6c2eda2077f49ab9de9965c0c0e292c","activitieId":"621773b85c8a99295abb951e"}}


10元话费  
{
  "headerInfo": {
    "functionCode": "gBMCheckGoods"
  },
  "requestContent": {
    "sessionid": "752ccc38dc3c4a5ea94d8a5679d9c1c6",
    "activitieId": "6217752b4d548b52dae6545e"
  }
}


'''
gold_body = {
    "headerInfo": {
        "functionCode": "gBMExchange"
    },
    "requestContent": {
        "sessionid": "04df5e2ef02b41bbb2f5984d93aef9ec",
        "activitieId": "62177496d760c0565aed56f8"
    }
}

# --------------配置区结束------------#

msg = []

try:
    from notify import send

    print('加载了notify')
except:
    try:
        from sendNotify import send
        print('加载了sendNotify')
    except:
        print('找不到通知文件，没有通知')
        send = None


def qyw_bot(title, content):
    print("企业微信机器人 服务启动")
    url = f'https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key={QWERTY}'
    headers = {'Content-Type': 'application/json;charset=utf-8'}
    data = {
        'msgtype': 'text',
        'text': {'content': f'{title}\n\n{content}'}
    }
    response = requests.post(url=url, data=json.dumps(data), headers=headers, timeout=15).json()

    if response['errcode']==0:
        print('推送成功！')
    else:
        print('推送失败，请检查QWERTY！')


def push(title, content):
    print("PUSHPLUS 服务启动")
    url = 'http://www.pushplus.plus/send'
    data = {
        "token": TOKEN,
        "title": title,
        "content": content
    }
    body = json.dumps(data).encode(encoding='utf-8')
    headers = {'Content-Type': 'application/json'}
    response = requests.post(url=url, data=body, headers=headers).json()
    if response['code']==200:
        print('推送成功！')
    else:
        print('推送失败，请检查TOKEN！')


def encrypt(text):
    key = '34d7cb0bcdf07523'.encode('utf-8')
    cipher = AES.new(key, AES.MODE_ECB)
    pad_pkcs7 = pad(text.encode('utf-8'), AES.block_size, style='pkcs7')  # 选择pkcs7补全
    cipher_text = cipher.encrypt(pad_pkcs7)
    return b2a_hex(cipher_text)


def telecom_task(config):
    sign(config)  # 签到
    #   gold(config)  # 10点兑换话费 测试有可能报错
    food(config)  # 喂食
    cloud(config)  # 云盘
    tree(config)  # 种树
    #  deng(config)  # 登录 body容易失效(第二次)
    share(config)  # 分享任务
    wode(config)  # 查看我的订单
    time.sleep(0.1)
    convert_reward(config)  # 签到七天领话费，兑换的时候抓第二个包
    home(config)  # 用户中心
    msg.append("---------------------------------")


def home(config):  # 用户中心
    msg.append("\n" + "开始查询我的金豆...")
    if home_info_body["para"]!='':
        mobile = config['mobile']
        h5_headers = get_h5_headers(mobile)
        url = "https://wapside.189.cn:9001/jt-sign/api/home/homeInfo"
        home_info_ret = requests.post(url, json=home_info_body, headers=h5_headers).json()
        if home_info_ret['resoultMsg']!="成功":
            msg.append(home_info_ret['resoultMsg'])
            return
        home_info_ret = requests.post(url, json=home_info_body, headers=h5_headers).json()
        new_coin = home_info_ret['data']['userInfo']['totalCoin']
        msg.append("领取完毕, 现有金豆: " + str(new_coin))
    else:
        msg.append('用户中心未抓包！')


def sign(config):  # 签到
    msg.append("\n" + "开始签到...")
    if config['mobile']!='':
        mobile = config['mobile']
        h5_headers = get_h5_headers(mobile)
        time1 = int(round(time.time() * 1000))
        body_json = {
            "phone": f"{mobile}",
            "date": time1,
            "signSource": "smlprgrm"
        }
        body_str = json.dumps(body_json)
        s = str(encrypt(body_str), 'utf-8')
        sign_body = {
            "encode": s
        }
        url = "https://wapside.189.cn:9001/jt-sign/api/home/sign"
        sign_ret = requests.post(url, json=sign_body, headers=h5_headers).json()
        mobilea = mobile.replace(mobile[4:11], '*******')
        if sign_ret['data']['code']==1:
            msg.append('手机号:' + mobilea + '\n' + "签到成功, 本次签到获得 " + str(sign_ret['data']['coin']) + " 豆")
        else:
            msg.append('手机号:' + mobilea + '\n' + sign_ret['data']['msg'])
    else:
        msg.append('配置中未填写手机号！')


def convert_reward(config):
    msg.append("\n" + "开始执行满7天兑换话费...")
    if phone_body["para"]!='':
        mobile = config['mobile']
        url = "https://wapside.189.cn:9001/jt-sign/reward/activityMsg"
        activity_ret = requests.post(url, json=phone_body, headers=get_h5_headers(mobile)).json()
        msg.append("你已连续签到 " + str(activity_ret['totalDay']) + " 天")
        if reward_body["para"]!='':
            if activity_ret['recordNum'] > 0:
                # 可以领取
                url1 = 'https://wapside.189.cn:9001/jt-sign/reward/convertReward'
                reward_ret = requests.post(url=url1, json=reward_body, headers=get_h5_headers(mobile)).json()
                msg.append(reward_ret)
                if reward_ret['code']!='0':
                    msg.append(reward_ret['msg'])
                else:
                    msg.append(reward_ret['msg'])
            else:
                pass
                #  msg.append('可能已兑换过或者未到时间')
        else:
            msg.append('签到7天第二个兑换请求未抓包！')
    else:
        msg.append('签到7天第一个请求未抓包！')


def food(config):
    msg.append("\n" + "开始执行喂食...")
    if food_body["para"]!='':
        if config['food']:
            mobile = config['mobile']
            while True:
                time.sleep(0.1)
                url = 'https://wapside.189.cn:9001/jt-sign/paradise/food'
                food_ret = requests.post(url, json=food_body, headers=get_h5_headers(mobile)).json()
                msg.append(food_ret['resoultMsg'])
                if food_ret['resoultCode']!='0':
                    break
    else:
        msg.append('喂食任务未抓包！')


def share(config):
    msg.append("\n" + "开始执行分享...")
    if share_body['session']!='':
        mobile = config['mobile']
        url = 'https://dxhd.189.cn:7081/actcenter/v1/goldcoinuser/shareToGetCoin.do'
        resp = requests.post(url, data=share_body, headers=get_h5_headers(mobile)).json()
        if resp['success']:
            msg.append('获得 20 豆')
        else:
            msg.append('今日已分享')
    else:
        msg.append('分享任务未抓包！')


def cloud(config):
    msg.append("\n" + "开始访问云盘...")
    if cloud_body["para"]!='':
        mobile = config['mobile']
        url = 'https://wapside.189.cn:9001/jt-sign/paradise/polymerize'
        resp = requests.post(url=url, json=cloud_body, headers=get_h5_headers(mobile)).json()
        if resp['resoultCode']==0:
            msg.append("云盘任务已完成")
        else:
            msg.append("失败原因" + str(resp))
    else:
        msg.append('云盘任务未抓包！')


def tree(config):
    msg.append("\n" + "开始种树任务...")
    if tree_body["para"]!='':
        mobile = config['mobile']
        url = 'https://wapside.189.cn:9001/jt-sign/paradise/polymerize'
        resp = requests.post(url=url, json=tree_body, headers=get_h5_headers(mobile)).json()
        if resp['resoultCode']==0:
            msg.append("种树任务已完成")
        else:
            msg.append("失败原因" + str(resp))
    else:
        msg.append('种树任务未抓包！')


def wode(config):
    msg.append("\n" + "开始查询我的订单...")
    if wode_body["para"]!='':
        mobile = config['mobile']
        url = 'https://wapside.189.cn:9001/jt-sign/paradise/polymerize'
        resp = requests.post(url=url, json=wode_body, headers=get_h5_headers(mobile)).json()
        if resp['resoultCode']==0:
            msg.append("我的订单任务已完成")
        else:
            msg.append("失败原因：" + str(resp))
    else:
        msg.append('查询我的订单任务未抓包！')


def deng(config):
    msg.append("\n" + "开始登录任务...")
    if deng_body["para"]!='':
        mobile = config['mobile']
        url = 'https://wapside.189.cn:9001/jt-sign/paradise/receiveReward'
        resp = requests.post(url=url, json=deng_body, headers=get_h5_headers(mobile)).json()
        if resp['resoultCode']==0:
            msg.append("登录任务已完成")
        else:
            msg.append("失败原因：" + str(resp["resoultMsg"]))
    else:
        msg.append('登录任务未抓包！')


# 五元话费
def gold(config):
    mobile = config['mobile']
    msg.append("\n" + "开始10点兑换话费...")
    if time.strftime("%H:%M")=="10:00":
        url = 'https://wapact.189.cn:9001/panda/common/goldBeanMall.do'
        resp = requests.post(url=url, json=gold_body, headers=get_h5_headers(mobile)).json()
        if resp['responseContent']['resultCode']!='0':
            msg.append(resp)
        elif resp['responseContent']['resultCode']=='0':
            msg.append('兑换成功')
        elif resp['responseContent']['resultCode']=='412':
            msg.append('兑换次数已达上限')
        elif resp['responseContent']['resultCode']=='413':
            msg.append('商品已兑完')
        elif resp['responseContent']['resultCode']=='420':
            msg.append('金豆不够,快去攒金豆')
        elif resp['responseContent']['resultCode']=='410':
            msg.append('该活动已失效~')
    else:
        msg.append('未到时间已取消操作')


def get_h5_headers(mobile):
    base64_mobile = str(base64.b64encode(mobile[5:11].encode('utf-8')), 'utf-8').strip(r'=+') + "!#!" + str(
        base64.b64encode(mobile[0:5].encode('utf-8')), 'utf-8').strip(r'=+')
    return {"User-Agent": "CtClient;9.2.0;Android;10;MI 10;" + base64_mobile}


def format_msg():
    star = ''
    for item in msg:
        star += item + "\r\n"
    return star


def main_handler():
    for config in config_list:
        telecom_task(config)
    print(format_msg())
    if QWERTY!='':
        qyw_bot('电信签到任务', format_msg())
    elif TOKEN!='':
        push('电信签到任务', format_msg())
    send('电信签到任务', format_msg())
    return format_msg()


main_handler()
