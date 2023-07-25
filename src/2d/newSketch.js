const canvasSketch = require('canvas-sketch');
const { lerp } = require('canvas-sketch-util/math');

const settings = {
  dimensions: [2048, 2048],
};

const createGrid = () => {
  const count = 5;

  const points = [];
  for (let x = 0; x < count; x++) {
    for (let y = 0; y < count; y++) {
      const u = x / (count - 1);
      const v = y / (count - 1);

      points.push([u, v]);
    }
  }
  return points;
};

const sketch = () => {
  const points = createGrid();
  return ({ context, width, height }) => {
    const margin = width * 0.175;
    context.fillStyle = 'blue';
    context.fillRect(0, 0, width, height);

    points.forEach((data) => {
      const [u, v] = data;
      const x = lerp(margin, width - margin, u);
      const y = lerp(margin, height - margin, v);

      context.beginPath();
      context.arc(x, y, 100, 0, Math.PI * 2);
      context.fillStyle = 'white';
      context.fill();
    });
  };
};

canvasSketch(sketch, settings);
