export class Vector {
  x: number;
  y: number;
  z: number;

  constructor(x: number, y: number, z: number) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  add(v: Vector): Vector {
    return new Vector(this.x + v.x, this.y + v.y, this.z + v.z);
  }

  sub(v: Vector): Vector {
    return new Vector(this.x - v.x, this.y - v.y, this.z - v.z);
  }

  mulc(c: number): Vector {
    return new Vector(this.x * c, this.y * c, this.z * c);
  }

  mulv(v: Vector): Vector {
    return new Vector(this.x * v.x, this.y * v.y, this.z * v.z);
  }

  divc(c: number): Vector {
    return new Vector(this.x / c, this.y / c, this.z / c);
  }

  length(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  }

  dot(v: Vector): number {
    return this.x * v.x + this.y * v.y + this.z * v.z;
  }

  cross(v: Vector): Vector {
    return new Vector(
      this.y * v.z - this.z * v.y,
      this.z * v.x - this.x * v.z,
      this.x * v.y - this.y * v.x
    );
  }

  unit(): Vector {
    return this.divc(this.length());
  }
}
