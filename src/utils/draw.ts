export function draw(r: number, g: number, b: number): string {
  return `${Math.floor(r * 255.999)} ${Math.floor(g * 255.999)} ${Math.floor(b * 255.999)}\n`;
};
