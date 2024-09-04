import requests  # 网络请求库,用于请求网页并获取数据
import jsonpath  # 筛选json数据
import os  # 系统模块

# 设置存储路径
storage_path = '../public/images/'

def sanitize_filename(name):
    # 替换空格为短横线，同时移除无效文件名字符
    return name.replace(' ', '-').replace('/', '-').replace('\\', '-')

def lol():
    # js文件
    url = 'https://game.gtimg.cn/images/lol/act/img/js/heroList/hero_list.js'
    User_Agent = ''  # 此处需要通过开发者工具的Network以下的Headers复制User-Agent使用
    
    # 构建请求头
    headers = {
        'User_Agent': User_Agent
    }

    # 请求数据
    response = requests.get(url, headers=headers).json()

    # 筛选数据
    hero_ids = jsonpath.jsonpath(response, '$..heroId')  # 英雄id
    hero_names = jsonpath.jsonpath(response, '$..name')  # 英雄名字

    for hero_id, hero_name in zip(hero_ids, hero_names):
        # 链接
        hero_info_url = f'https://game.gtimg.cn/images/lol/act/img/js/hero/{hero_id}.js'
        hero_info = requests.get(hero_info_url).json()
        skin_info_list = hero_info['skins']  # 皮肤数据
        skin_id_list = jsonpath.jsonpath(skin_info_list, '$..skinId')  # 获取皮肤id
        skin_name_list = jsonpath.jsonpath(skin_info_list, '$..name')  # 获取皮肤名字

        # 使用sanitize_filename函数清理英雄名称
        hero_name_cleaned = sanitize_filename(hero_name)

        # 构建完整的存储路径
        hero_path = os.path.join(storage_path, hero_name_cleaned)

        # 新建角色名称文件夹，将爬取的图片分类保存在英雄的文件夹内
        if not os.path.exists(hero_path):
            os.makedirs(hero_path)

        for skin_id, skin_name in zip(skin_id_list, skin_name_list):
            url1 = f'https://game.gtimg.cn/images/lol/act/img/skin/big{skin_id}.jpg'

            # 请求拼接后的图片数据
            image = requests.get(url1)
            # 返回404则不会保存
            if image.status_code == 200:
                # 使用sanitize_filename函数清理皮肤名称
                skin_name_cleaned = sanitize_filename(skin_name)
                with open(f'{hero_path}/{skin_name_cleaned}.jpg', 'wb') as file:
                    file.write(image.content)
                print(f'<{skin_name}>下载成功')

lol()
