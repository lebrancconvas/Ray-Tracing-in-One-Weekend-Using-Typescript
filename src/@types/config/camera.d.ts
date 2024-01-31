import { Vector } from '../../lib';

export interface ICamera {
  focalLength: number;
  viewportWidth: number;
  viewportHeight: number;
  cameraCenter: Vector;
};
