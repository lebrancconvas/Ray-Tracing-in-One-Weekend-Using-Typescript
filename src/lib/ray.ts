import { Vector } from './vector';
import { Point } from './point';

export class Ray extends Vector {
  constructor(public origin: Point, public direction: Vector) {
    super(direction.x, direction.y, direction.z);
  }

  public at(t: number): Point {
    return new Point(
      this.origin.x + t * this.x,
      this.origin.y + t * this.y,
      this.origin.z + t * this.z
    );
  }
}
