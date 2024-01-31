import fs from 'fs';
import path from 'path';
import { draw } from './utils';


// Setting.
const FORMAT = 'P3';
const IMAGE_WIDTH = 256;
const IMAGE_HEIGHT = 256;
const COLOR = 255;

// Render.
let ppmCode = `${FORMAT}\n${IMAGE_WIDTH} ${IMAGE_HEIGHT}\n${COLOR}\n`;

for(let h = 0; h < 256; h++) {
  for(let w = 0; w < 256; w++) {
    ppmCode += draw(w, h, 0);
  }
}

try {
  fs.writeFileSync(path.join(__dirname, '..', 'result', 'image.ppm'), ppmCode);
  fs.writeFileSync(path.join(__dirname, '..', 'result', 'image.txt'), ppmCode);
  console.log(`Generated PPM Image Success!`);
} catch(err) {
  console.error(err);
  console.log(`Generated PPM Image Failed!`);
}
