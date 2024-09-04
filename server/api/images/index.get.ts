import fs from 'fs';
import path from 'path';

// 递归获取目录内容
const getDirectoryContent = (directoryPath: any, basePath: any) => {
  return new Promise((resolve, reject) => {
    fs.readdir(directoryPath, { withFileTypes: true }, async (err, files) => {
      if (err) {
        return reject(err);
      }

      const results = await Promise.all(files.map(file => {
        const fullPath = path.join(directoryPath, file.name);
        
        if (file.isDirectory()) {
          // 如果是文件夹，继续递归获取子文件夹内容
          return getDirectoryContent(fullPath, basePath).then(subFiles => ({
            name: file.name,
            images: subFiles
          }));
        } else {
          // 如果是文件，返回文件信息
          const relativePath = path.relative(basePath, fullPath);
          return {
            name: file.name,
            url: 'images/' + relativePath  // 返回相对于 basePath 的相对路径
          };
        }
      }));

      resolve(results);
    });
  });
};

export default defineEventHandler(async (event) => {
  const imagesPath = path.join(process.cwd(), 'public/images');

  try {
    // 获取目录内容
    const images = await getDirectoryContent(imagesPath, imagesPath);

    return { code: 200, data: images };
  } catch (err) {
    console.error('Error reading directory:', err);
    return { code: 500, message: 'Error reading directory' };
  }
});
