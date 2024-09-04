import fs from 'fs';
import path from 'path';

// 检查目录是否存在
const checkDirectoryExists = (directoryPath: any) => {
  return new Promise((resolve, reject) => {
    fs.access(directoryPath, fs.constants.F_OK, (err) => {
      if (err) {
        // 目录不存在
        return resolve(false);
      }
      // 目录存在
      resolve(true);
    });
  });
};

// 创建文件夹目录
const createDirectory = (directoryPath: any) => {
  return new Promise((resolve, reject) => {
    fs.mkdir(directoryPath, { recursive: true }, (err) => {
      if (err) {
        return reject(err);
      }
      resolve(`Directory created at: ${directoryPath}`);
    });
  });
};

export default defineEventHandler(async (event) => {
  const { name } = await readBody(event); // 假设请求体中包含文件夹名称
  const imagesPath = path.join(process.cwd(), 'public/images');
  const newDirectoryPath = path.join(imagesPath, name);

  try {
    // 检查目录是否存在
    const directoryExists = await checkDirectoryExists(newDirectoryPath);
    if (directoryExists) {
      return { code: 400, message: 'Directory already exists' };
    }

    // 创建目录
    const result = await createDirectory(newDirectoryPath);
    return { code: 200, message: result };
  } catch (err) {
    console.error('目录已经存在:', err);
    setResponseStatus(event, 400)
    return { code: 500, message: '目录已经存在' };
  }
});
