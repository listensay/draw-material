import fs from 'fs';
import formidable from 'formidable';

// 上传路径
const uploadDir = './public/images/';

// 创建上传目录
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

export default defineEventHandler(async (event) => {
  const body = getQuery(event)
  
  const form = formidable({
    uploadDir: uploadDir + body.path,  // 上传到公共目录下
    multiples: true, // 支持多文件
    maxFileSize: 20 * 1024 * 1024, // 20MB 大小限制
    keepExtensions: true, // 保留文件扩展名
    // 文件名重命名
    filename: (name, ext) => {
      return `${body.name}-${new Date().getTime()}${ext}`;
    },
    // 文件过滤
    filter: part => {
      // 判断文件名是否为图片格式
      if (part.originalFilename?.match(/\.(jpg|jpeg|png)$/i)) {
        return true;
      }
      return false;
    },
  });

  const upload = () => {
    return new Promise((resolve, reject) => {
      form.parse(event.node.req, (err, fields, files) => {
        if (err) {
          if (err.message.includes('options.maxTotalFileSize')) {
            return reject(new Error('图片超出限制！最大限制 20MB')); // 修正大小限制提示信息
          }
          return reject(err);
        }

        const result = [];
        for (const key in files) {
          const fileArray = Array.isArray(files[key]) ? files[key] : [files[key]];
          fileArray.forEach(file => {
            result.push({
              name: file.newFilename,
              url: '/images/' + file.newFilename,
            });
          });
        }
        resolve(result);
      });
    });
  };

  try {
    const data = await upload();
    console.log(data);
    return { code: 200, data, message: '上传成功!' };
  } catch (err) {
    console.error(err);
    return { code: 400, message: '上传失败!' };
  }
});
