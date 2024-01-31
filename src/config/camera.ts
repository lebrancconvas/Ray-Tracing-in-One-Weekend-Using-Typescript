import { ICamera } from '../@types';
import { imageConfig } from './image';
import { Vector } from '../lib';

export const cameraConfig: ICamera = {
  focalLength: 1.0,
  viewportWidth: 2.0 * (imageConfig.imageWidth / imageConfig.imageHeight),
  viewportHeight: 2.0,
  cameraCenter: new Vector(0, 0, 0)
};
