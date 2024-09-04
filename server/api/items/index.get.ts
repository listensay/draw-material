import fs from 'fs';
import path from 'path';

// 获取目录下的所有文件夹名称
const getDirectories = (directoryPath: any) => {
  return new Promise((resolve, reject) => {
    fs.readdir(directoryPath, { withFileTypes: true }, (err, files) => {
      if (err) {
        return reject(err);
      }

      const directories = files
        .filter(file => file.isDirectory())
        .map(dir => dir.name);

      resolve(directories);
    });
  });
};

export default defineEventHandler(async (event) => {
  const imagesPath = path.join(process.cwd(), 'public/images');

  try {
    // 获取目录内容
    const directories = await getDirectories(imagesPath);

    return { code: 200, data: directories };
  } catch (err) {
    console.error('Error reading directory:', err);
    return { code: 500, message: 'Error reading directory' };
  }
});
