import fs from 'fs';
import path from 'path';

// 获取本地图片列表
export default defineEventHandler(async (event) => {
  // 获取public/images目录下的图片
  const imagesPath = path.join(process.cwd(), 'public/images');
  const images = fs.readdirSync(imagesPath);
  return { code: 200, data: images };
})
