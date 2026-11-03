/** 36-point starburst polygon used behind the hero character (percent coordinates). */
export function starburstPolygon(points = 36): string {
  return Array.from({ length: points }, (_, i) => {
    const angle = (i / points) * Math.PI * 2 - Math.PI / 2;
    const radius = i % 2 ? 38 + (i % 4 === 1 ? 2 : -2) : 50 - (i % 6 === 0 ? 0 : 3);
    return `${(50 + Math.cos(angle) * radius).toFixed(2)}% ${(50 + Math.sin(angle) * radius).toFixed(2)}%`;
  }).join(",");
}
