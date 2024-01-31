import fs from 'fs';
import path from 'path';
import { draw } from './utils';
import { config, imageConfig, cameraConfig } from './config';
import { Vector, Point, Color, Ray } from './lib';

function hitSphere(center: Point, radius: number, ray: Ray): boolean {
  let oc: Vector = ray.origin.sub(center);
  let a = ray.direction.dot(ray.direction);
  let b = 2.0 * (oc.dot(ray.direction));
  let c = (oc.dot(oc)) - (radius * radius);
  let discriminant = (b*b) - (4*a*c);
  return discriminant >= 0;
}

function rayColor(r: Ray) {
  if(hitSphere(new Point(0, 0, -1), 0.5, r)) {
    return new Color(1, 0, 0);
  }
  let unitDirection = r.direction.unit();
  let a = 0.5 * (unitDirection.y + 1.0);
  let color01 = new Color(1.0, 1.0, 1.0).mulc(1.0 - a);
  let color02 = new Color(0.5, 0.7, 1.0).mulc(a);
  return color01.add(color02);
}

// Setting.
const FORMAT = config.format;
const IMAGE_WIDTH = imageConfig.imageWidth;
const IMAGE_HEIGHT = (imageConfig.imageHeight < 1) ? 1 : imageConfig.imageHeight;
const COLOR = config.color;

// Image
const ASPECT_RATIO = imageConfig.aspectRatio;

// Camera
const FOCAL_LENGTH = cameraConfig.focalLength;
const VIEWPORT_HEIGHT = cameraConfig.viewportHeight;
const VIEWPORT_WIDTH = cameraConfig.viewportWidth;
const CAMERA_CENTER = cameraConfig.cameraCenter;

let viewportU = new Vector(VIEWPORT_WIDTH, 0, 0);
let viewportV = new Vector(0, -VIEWPORT_HEIGHT, 0);

let pixelDeltaU = viewportU.mulc(1 / IMAGE_WIDTH);
let pixelDeltaV = viewportV.mulc(1 / IMAGE_HEIGHT);

let viewportUpperLeft = ((CAMERA_CENTER.sub(new Vector(0, 0, FOCAL_LENGTH))).sub(viewportU.mulc(0.5))).sub(viewportV.mulc(0.5));
let pixel00Loc = ((pixelDeltaU.add(pixelDeltaV)).mulc(0.5)).add(viewportUpperLeft);

// Render.
let ppmCode = `${FORMAT}\n${IMAGE_WIDTH} ${IMAGE_HEIGHT}\n${COLOR}\n`;

for(let h = 0; h < IMAGE_HEIGHT; h++) {
  for(let w = 0; w < IMAGE_WIDTH; w++) {
    let pixelCenter = (pixel00Loc.add(pixelDeltaU.mulc(w))).add(pixelDeltaV.mulc(h));
    let rayDirection = pixelCenter.sub(CAMERA_CENTER);
    let ray = new Ray(pixelCenter, rayDirection);
    ppmCode += draw(rayColor(ray).x, rayColor(ray).y, rayColor(ray).z);
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
