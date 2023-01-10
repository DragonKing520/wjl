"""
cron: 0 */8 * * *
new Env('美的签到');
"""
import os
import re
import time
import json
import datetime
import requests
import datetime
import random
from notify import send
from ql_util import get_random_str
from ql_api import get_envs, disable_env, post_envs, put_envs
from requests.packages import urllib3
urllib3.disable_warnings()

# 需要安装环境cryptography pyOpenSSL certifi
# pip install cryptography
# pip install pyOpenSSL
# pip install certifi

# 抓包链接https://mvip.midea.cn

# 青龙变量名称（cookie）  
# Meidi_COOKIE
# 变量值：  
# 格式: uid=xxx;sukey=xxx;

# 青龙变量名称（多账号签到间隔时间，可不填，默认间隔15到30秒）  
# Meidi_Flag
# 变量值：  
# 格式: False或者True，False代表不随机，True代表开启随机

# 获取要执行兑换的cookie
def get_cookie():
    ck_list = []
    cookie = None
    cookies = get_envs("Meidi_COOKIE")
    for ck in cookies:
        if ck.get('status') == 0:
            ck_list.append(ck)
            #ck_list.append(ck.get('value'))
    if len(ck_list) < 1:
        print('共配置{}条CK,请添加环境变量,或查看环境变量状态'.format(len(ck_list)))
    return ck_list


def sign(user,cookie):
    if cookie is None:
        return
    url = 'https://mvip.midea.cn/my/score/create_daily_score'
    headers = {
        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'cookie': cookie,
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36',
    }
    res = requests.get(url, headers=headers, verify=False).text
    print('账号：{},签到状态：{}\n'.format(user,res))


if __name__ == '__main__':
    # 获取cookie等参数
    user_map = get_cookie()
    #多账号随机间隔执行时间，默认15到30秒之间
    start_time = 15
    end_time = 30
    meidi_Flag = get_envs("Meidi_Flag")
    flag = True
    for ck in meidi_Flag:
        if ck.get('status') == 0:
            flag_temp = ck.get('value')
            if flag_temp == 'False':
                flag = False
            #判断时间问题
            if flag == False:
                start_time = 1
                end_time = 3

    for i in range(len(user_map)):
        user = user_map[i].get('remarks')
        user_cookie = user_map[i].get('value')
        print('开始执行第【{}】个账号【{}】的签到操作'.format((i+1),user))
        
        #解决随机时间问题
        ran_time = random.randint(start_time, end_time)
        if flag == True:
            print('随机休眠{}秒执行操作'.format(ran_time))

        time.sleep(ran_time)
        #开始
        sign(user,user_cookie)