type Point = [number, number];
// Exterior alignment follows the final visual; the furnished interior is illustrative.
// Plan coordinates, followed by corresponding roof and ground points in building.png.
const vertices = [
  { plan: [300, 110], roof: [740, 255], ground: [740, 444] },
  { plan: [1235, 110], roof: [1432, 280], ground: [1432, 456] },
  { plan: [1235, 338], roof: [1365, 309], ground: [1365, 505] },
  { plan: [510, 338], roof: [809, 289], ground: [809, 478] },
  { plan: [510, 839], roof: [374, 356], ground: [374, 625] },
  { plan: [300, 839], roof: [75, 333], ground: [75, 582] },
];
const mix = (a: number, b: number, t: number) => a + (b - a) * t;
const clamp = (n: number) => Math.min(1, Math.max(0, n));
const ease = (n: number) => {
  const t = clamp(n);
  return t * t * t * (t * (t * 6 - 15) + 10);
};
// start vertex, end vertex, opening start/end, sill/head as fractions of wall height.
const openings = [
  [5, 4, 0.13, 0.205, 0.28, 0.61],
  [4, 3, 0.1, 0.46, 0, 0.79],
  [4, 3, 0.84, 0.895, 0, 0.78],
  [3, 2, 0.014, 0.88, 0, 0.74],
];
const planOpenings = [
  [0.31, 0.4],
  [0.31, 0.545],
  [0.82, 0.92],
  [0.148, 0.901],
];

// Shared control points keep the drawing attached to the footprint as the camera tilts.
const groundGrid: Point[][] = [
  [
    [740, 444],
    [915, 447],
    [1432, 456],
  ],
  [
    [524, 489],
    [809, 478],
    [1365, 505],
  ],
  [
    [75, 582],
    [374, 625],
    [1230, 870],
  ],
];
const planX = [300, 510, 1235];
const planY = [110, 338, 839];
function groundPoint(x: number, y: number, camera: number): Point {
  const col = x < planX[1] ? 0 : 1;
  const row = y < planY[1] ? 0 : 1;
  const u = (x - planX[col]) / (planX[col + 1] - planX[col]);
  const v = (y - planY[row]) / (planY[row + 1] - planY[row]);
  const a = groundGrid[row][col],
    b = groundGrid[row][col + 1];
  const c = groundGrid[row + 1][col],
    d = groundGrid[row + 1][col + 1];
  return [
    mix(x, mix(mix(a[0], b[0], u), mix(c[0], d[0], u), v), camera),
    mix(y, mix(mix(a[1], b[1], u), mix(c[1], d[1], u), v), camera),
  ];
}

function drawPlan(ctx: CanvasRenderingContext2D, drawing: CanvasImageSource, camera: number) {
  // Small affine tiles approximate the continuous ground plane, not a crossfade to a different view.
  const xs = [0, 150, 300, 405, 510, 691.25, 872.5, 1053.75, 1235, 1385.5, 1536];
  const ys = [0, 55, 110, 224, 338, 463.25, 588.5, 713.75, 839, 931.5, 1024];
  const triangle = (a: Point, b: Point, c: Point) => {
    const p = groundPoint(...a, camera),
      q = groundPoint(...b, camera),
      r = groundPoint(...c, camera);
    const det = (b[0] - a[0]) * (c[1] - a[1]) - (c[0] - a[0]) * (b[1] - a[1]);
    const ax = ((q[0] - p[0]) * (c[1] - a[1]) - (r[0] - p[0]) * (b[1] - a[1])) / det;
    const ay = ((q[1] - p[1]) * (c[1] - a[1]) - (r[1] - p[1]) * (b[1] - a[1])) / det;
    const bx = ((r[0] - p[0]) * (b[0] - a[0]) - (q[0] - p[0]) * (c[0] - a[0])) / det;
    const by = ((r[1] - p[1]) * (b[0] - a[0]) - (q[1] - p[1]) * (c[0] - a[0])) / det;
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(...p);
    ctx.lineTo(...q);
    ctx.lineTo(...r);
    ctx.closePath();
    ctx.clip();
    ctx.transform(ax, ay, bx, by, p[0] - ax * a[0] - bx * a[1], p[1] - ay * a[0] - by * a[1]);
    ctx.drawImage(drawing, 0, 0, 1536, 1024);
    ctx.restore();
  };
  if (camera === 0) {
    ctx.drawImage(drawing, 0, 0, 1536, 1024);
    return;
  }
  for (let y = 0; y < ys.length - 1; y++)
    for (let x = 0; x < xs.length - 1; x++) {
      const a: Point = [xs[x], ys[y]],
        b: Point = [xs[x + 1], ys[y]];
      const c: Point = [xs[x + 1], ys[y + 1]],
        d: Point = [xs[x], ys[y + 1]];
      triangle(a, b, c);
      triangle(a, c, d);
    }
}

export function createGrowingHouse(canvas: HTMLCanvasElement, source: string, planSource: string) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;
  const photograph = new Image();
  const drawing = new Image();
  const planSurface = document.createElement('canvas');
  planSurface.width = 1536;
  planSurface.height = 1024;
  let planReady = false;
  let position = 0;
  let disposed = false;
  const draw = () => {
    if (disposed) return;
    const w = canvas.clientWidth,
      h = canvas.clientHeight;
    if (!w || !h) return;
    const dpr = Math.min(devicePixelRatio || 1, 2);
    if (canvas.width !== Math.round(w * dpr) || canvas.height !== Math.round(h * dpr)) {
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.fillStyle = '#edeae3';
    ctx.fillRect(0, 0, w, h);
    const scale = Math.min(w / 1536, h / 1024);
    ctx.translate((w - 1536 * scale) / 2, (h - 1024 * scale) / 2);
    ctx.scale(scale, scale);
    const camera = ease((position - 0.1) / 0.43);
    const rise = ease((position - 0.2) / 0.3);
    const roof = ease((position - 0.53) / 0.12);
    const photo = ease((position - 0.7) / 0.22);
    const surroundings = ease((position - 0.48) / 0.4);
    const planOpacity = 1 - ease((position - 0.38) / 0.28);
    const atmosphere = ctx.createLinearGradient(0, 0, 0, 1024);
    atmosphere.addColorStop(0, '#edeae3');
    atmosphere.addColorStop(0.5, '#e8e4d9');
    atmosphere.addColorStop(1, '#ddd6c6');
    ctx.globalAlpha = camera;
    ctx.fillStyle = atmosphere;
    ctx.fillRect(0, 0, 1536, 1024);
    ctx.globalAlpha = 1;
    // Introduce the landscape independently, leaving the aligned model unobscured.
    if (surroundings > 0 && photograph.complete && photograph.naturalWidth) {
      ctx.save();
      ctx.beginPath();
      ctx.rect(0, 0, 1536, 1024);
      const silhouette: Point[] = [
        [75, 333],
        [740, 255],
        [1432, 280],
        [1432, 456],
        [1365, 505],
        [809, 478],
        [374, 625],
        [75, 582],
      ];
      silhouette.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
      ctx.closePath();
      ctx.clip('evenodd');
      ctx.globalAlpha = surroundings;
      ctx.drawImage(photograph, 0, 0, 1536, 1024);
      ctx.restore();
    }
    const point = (index: number, height = 0): Point => {
      const v = vertices[index];
      return [
        mix(v.plan[0], v.ground[0], camera),
        mix(v.plan[1], v.ground[1], camera) - (v.ground[1] - v.roof[1]) * height * rise * camera,
      ];
    };
    const polygon = (points: Point[], fill: string, stroke = '#928f86', line = 1.1) => {
      ctx.beginPath();
      points.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
      ctx.closePath();
      ctx.fillStyle = fill;
      ctx.fill();
      ctx.strokeStyle = stroke;
      ctx.lineWidth = line;
      ctx.stroke();
    };
    ctx.globalAlpha = camera;
    polygon(
      vertices.map((_, i) => point(i)),
      '#eeece5',
      '#555b54',
      3
    );
    ctx.globalAlpha = 1;
    if (planOpacity > 0 && drawing.complete && drawing.naturalWidth) {
      ctx.save();
      ctx.globalAlpha = planOpacity;
      ctx.globalCompositeOperation = 'multiply';
      drawPlan(ctx, planReady ? planSurface : drawing, camera);
      ctx.restore();
    }
    ctx.globalAlpha = ease((position - 0.13) / 0.12);
    const wallFaces = [
      [0, 1, '#deded6'],
      [1, 2, '#d4d5cd'],
      [5, 0, '#e4e4dc'],
      [5, 4, '#e6e5dc'],
      [4, 3, '#f3f1e8'],
      [3, 2, '#eeeee5'],
    ] as const;
    wallFaces.forEach(([a, b, color]) => polygon([point(a), point(b), point(b, 1), point(a, 1)], color));
    const onWall = (a: number, b: number, t: number, z: number): Point => {
      const p = point(a, z),
        q = point(b, z);
      return [mix(p[0], q[0], t), mix(p[1], q[1], t)];
    };
    openings.forEach(([a, b, start, end, sill, head], i) => {
      start = mix(planOpenings[i][0], start, camera);
      end = mix(planOpenings[i][1], end, camera);
      if (rise * camera < 0.01) {
        const p = onWall(a, b, start, 0),
          q = onWall(a, b, end, 0);
        ctx.beginPath();
        ctx.moveTo(...p);
        ctx.lineTo(...q);
        ctx.strokeStyle = '#f7f6f2';
        ctx.lineWidth = 7;
        ctx.stroke();
        ctx.strokeStyle = '#858d87';
        ctx.lineWidth = 1.4;
        ctx.stroke();
      } else {
        polygon(
          [onWall(a, b, start, sill), onWall(a, b, end, sill), onWall(a, b, end, head), onWall(a, b, start, head)],
          i === 1 ? '#a89a81' : '#87908c',
          '#676d66'
        );
        if (i === 3)
          for (let t = start + 0.14; t < end; t += 0.14) {
            const p = onWall(a, b, t, sill),
              q = onWall(a, b, t, head);
            ctx.beginPath();
            ctx.moveTo(...p);
            ctx.lineTo(...q);
            ctx.strokeStyle = '#575e59';
            ctx.lineWidth = 3;
            ctx.stroke();
          }
      }
    });
    ctx.globalAlpha = 1;
    if (roof > 0) {
      ctx.save();
      ctx.globalAlpha = roof;
      polygon([point(0, 1), point(1, 1), point(2, 1), point(3, 1)], '#dbd9d0');
      polygon([point(0, 1), point(3, 1), point(4, 1), point(5, 1)], '#e1dfd5');
      ctx.restore();
    }
    if (photo > 0 && photograph.complete && photograph.naturalWidth) {
      ctx.globalAlpha = photo;
      ctx.drawImage(photograph, 0, 0, 1536, 1024);
      ctx.globalAlpha = 1;
    }
  };
  photograph.onload = draw;
  photograph.src = source;
  drawing.onload = () => {
    const surface = planSurface.getContext('2d');
    if (surface) {
      surface.drawImage(drawing, 0, 0, 1536, 1024);
      surface.globalCompositeOperation = 'destination-in';
      // Feather the paper into the shared stage; no rectangular sheet tilts behind the house.
      for (const [x1, y1, x2, y2] of [
        [0, 0, 1536, 0],
        [0, 0, 0, 1024],
      ]) {
        const mask = surface.createLinearGradient(x1, y1, x2, y2);
        mask.addColorStop(0, 'transparent');
        mask.addColorStop(0.1, '#000');
        mask.addColorStop(0.9, '#000');
        mask.addColorStop(1, 'transparent');
        surface.fillStyle = mask;
        surface.fillRect(0, 0, 1536, 1024);
      }
      planReady = true;
    }
    draw();
  };
  drawing.src = planSource;
  return {
    draw(value: number) {
      position = value;
      draw();
    },
    dispose() {
      disposed = true;
      photograph.onload = null;
      drawing.onload = null;
    },
  };
}
