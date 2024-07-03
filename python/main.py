import os
from flask import Flask, jsonify

path = "static/images"  #文件夹目录
files = os.listdir(path) #得到文件夹下的所有文件名称
data = []

id = 0
for index, file in enumerate(files):
    if file != '.DS_Store':
        f = os.listdir(path + "/" +file)

        images = []
        for image in f:
            images.append(path + "/" + file +"/"+ image)


        data.append({ 'name': file, 'paths':  images, 'id': index })

app = Flask(__name__)

@app.route('/')
def hello_world():
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
