import fs from 'fs';
import https from 'https';
import path from 'path';

const fontsDir = path.join(process.cwd(), 'public', 'fonts');
if (!fs.existsSync(fontsDir)) {
  fs.mkdirSync(fontsDir, { recursive: true });
}

const fonts = [
  'Vazirmatn-Regular.woff2',
  'Vazirmatn-Medium.woff2',
  'Vazirmatn-Bold.woff2',
  'Vazirmatn-Black.woff2'
];

const baseUrl = 'https://cdn.jsdelivr.net/gh/rastikerdar/vazirmatn@v33.003/fonts/webfonts/';

fonts.forEach(font => {
  const file = fs.createWriteStream(path.join(fontsDir, font));
  https.get(baseUrl + font, response => {
    response.pipe(file);
    file.on('finish', () => {
      file.close();
      console.log(`Downloaded ${font}`);
    });
  });
});
