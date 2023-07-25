const canvasSketch = require('canvas-sketch');
const { lerp } = require('canvas-sketch-util/math');
const Random = require('canvas-sketch-util/random');

const settings = {
  dimensions: [2048, 2048],
};

const sketch = () => {
  const count = 8;

  const createGrid = () => {
    const points = [];
    for (let x = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
        const u = x / (count - 1);
        const v = y / (count - 1);

        const corner = Random.pick([0, 0.5, 1, 1.5]);
        const arcStart = Math.PI * corner;
        const arcEnd = arcStart + Math.PI * 1.5;
        points.push({
          position: [u, v],
          arcStart,
          arcEnd,
        });
      }
    }
    return points;
  };

  // const points = createGrid();
  const points = createGrid().filter(() => Math.random() > 0.15);

  return ({ context, width, height }) => {
    const margin = width * 0.175;
    context.fillStyle = '#1719BD';
    context.fillRect(0, 0, width, height);

    points.forEach((data) => {
      const { position, arcStart, arcEnd } = data;
      const [u, v] = position;
      const x = lerp(margin, width - margin, u);
      const y = lerp(margin, height - margin, v);
      console.log(arcStart, arcEnd);
      context.beginPath();
      // context.moveTo(x, y);
      context.arc(x, y, 190, arcStart, arcEnd, false);
      context.lineWidth = 20;
      context.strokeStyle = 'white';
      context.stroke();
    });
  };
};

canvasSketch(sketch, settings);
