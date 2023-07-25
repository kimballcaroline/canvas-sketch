global.THREE = require('three');

const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');
const palettes = require('nice-color-palettes');
// const eases = require('eases');
const BezierEasing = require('bezier-easing');

const settings = {
  animate: true,
  dimensions: [512, 512],
  fps: 24,
  duration: 10,
  // Get a WebGL canvas rather than 2D
  context: 'webgl',
  // Turn on MSAA
  attributes: { antialias: true },
};

const sketch = ({ context, width, height }) => {
  // Create a renderer
  const renderer = new THREE.WebGLRenderer({
    context,
  });

  // WebGL background color
  renderer.setClearColor('hsl(0, 0%, 95%)', 1);

  // Setup a camera, we will update its settings on resize
  const camera = new THREE.OrthographicCamera();

  // Setup your scene
  const scene = new THREE.Scene();

  // Re-use the same Geometry across all our cubes
  const geometry = new THREE.BoxGeometry(1, 1, 1);

  const palette = random.pick(palettes);

  for (let i = 0; i < 30; i++) {
    // Create the mesh
    const mesh = new THREE.Mesh(
      geometry,
      new THREE.MeshStandardMaterial({ color: random.pick(palette) })
    );
    // Randomize cube shapes
    mesh.scale.set(
      random.range(-1, 1),
      random.range(-1, 1),
      random.range(-1, 1)
    );
    // Randomize the positioning of the cubes
    mesh.position.set(
      random.range(-1, 1),
      random.range(-1, 1),
      random.range(-1, 1)
    );
    //Resize the cubes to be smaller
    mesh.scale.multiplyScalar(0.5);
    // Then add the group to the scene
    scene.add(mesh);
  }
  scene.add(new THREE.AmbientLight('hsl(239, 78%, 90%)'));
  //add light
  const light = new THREE.DirectionalLight('yellow', 0.8);
  light.position.set(0, 1, 4);
  scene.add(light);

  const easeFN = BezierEasing(0.67, 0.03, 0.29, 0.99);

  // draw each frame
  return {
    // Handle resize events here
    resize({ pixelRatio, viewportWidth, viewportHeight }) {
      renderer.setPixelRatio(pixelRatio);
      renderer.setSize(viewportWidth, viewportHeight);

      camera.aspect = viewportWidth / viewportHeight;
      // Ortho zoom
      const zoom = 2.0;

      // Bounds
      camera.left = -zoom * camera.aspect;
      camera.right = zoom * camera.aspect;
      camera.top = zoom;
      camera.bottom = -zoom;

      // Near/Far
      camera.near = -100;
      camera.far = 100;

      // Set position & look at world center
      camera.position.set(zoom, zoom, zoom);
      camera.lookAt(new THREE.Vector3());
      // Update camera properties
      camera.updateProjectionMatrix();
    },
    // And render events here
    render({ playhead }) {
      const t = Math.sin(playhead * Math.PI * 2);
      scene.rotation.z = easeFN(t);
      // Draw scene with our camera
      renderer.render(scene, camera);
    },
    // Dispose of WebGL context (optional)
    unload() {
      renderer.dispose();
    },
  };
};

canvasSketch(sketch, settings);
