import './styles.css';
import tgpu, { common, d, std } from 'typegpu';

const initApp = async () => {
  const canvas = document.getElementById('webgpu-canvas') as HTMLCanvasElement;

  if (!navigator.gpu) {
    alert('WebGPU is not supported in your browser. Please use Chrome 113+ or Edge 113+');
    return;
  }

  const adapter = await navigator.gpu.requestAdapter();
  if (!adapter) {
    alert('Could not find a suitable GPU adapter');
    return;
  }

  const device = await adapter.requestDevice();
  const context = canvas.getContext('webgpu')!;
  const format = navigator.gpu.getPreferredCanvasFormat();

  const root = tgpu.initFromDevice({ device });
  root.configureContext({ canvas, format, alphaMode: 'premultiplied' });

  const globals = root.createUniform(
    {
      time: d.f32,
      resolution: d.vec2f,
      aspect: d.f32,
    },
    {
      time: 0,
      resolution: [canvas.width, canvas.height],
      aspect: canvas.width / canvas.height,
    }
  );

  const sphereSDF = tgpu.fn([d.vec3f, d.f32], d.f32)((p, r) => {
    'use gpu';
    return std.length(p) - r;
  });

  const torusSDF = tgpu.fn([d.vec3f, d.f32, d.f32], d.f32)((p, major, minor) => {
    'use gpu';
    const q = d.vec2f(std.length(d.vec2f(p.x, p.z)) - major, p.y);
    return std.length(q) - minor;
  });

  const sceneSDF = tgpu.fn([d.vec3f], d.f32)(p => {
    'use gpu';
    const bottle = sphereSDF(p - d.vec3f(0.0, -0.2, 4.5), 1.15);
    const ring = torusSDF(p - d.vec3f(0.0, -0.05, 4.5), 1.4, 0.12);
    const floor = p.y + 1.5;
    return std.min(std.min(bottle, ring), floor);
  });

  const estimateNormal = tgpu.fn([d.vec3f], d.vec3f)(p => {
    'use gpu';
    const eps = 0.001;
    return std.normalize(
      d.vec3f(
        sceneSDF(p + d.vec3f(eps, 0.0, 0.0)) - sceneSDF(p - d.vec3f(eps, 0.0, 0.0)),
        sceneSDF(p + d.vec3f(0.0, eps, 0.0)) - sceneSDF(p - d.vec3f(0.0, eps, 0.0)),
        sceneSDF(p + d.vec3f(0.0, 0.0, eps)) - sceneSDF(p - d.vec3f(0.0, 0.0, eps))
      )
    );
  });

  const rayMarch = tgpu.fn([d.vec3f, d.vec3f], d.f32)((ro, rd) => {
    'use gpu';
    let t = 0.0;
    for (let i = 0; i < 64; i++) {
      const position = ro + rd * t;
      const dist = sceneSDF(position);
      if (dist < 0.001) break;
      t += dist;
      if (t > 22.0) break;
    }
    return t;
  });

  const rayMarchFragment = tgpu.fragmentFn({ in: { uv: d.vec2f }, out: d.vec4f })((input) => {
    'use gpu';
    const uv = input.uv * 2.0 - d.vec2f(1.0, 1.0);
    const aspect = globals.$.aspect;
    const scaled = d.vec2f(uv.x * aspect, uv.y) * 1.35;
    
    // Smooth pan and wobble
    const time = globals.$.time;
    const wobble = std.sin(time * 0.7) * 0.35;
    const panX = std.sin(time * 0.3) * 0.6;
    const panY = std.cos(time * 0.25) * 0.4;
    const zoom = 1.0 + std.sin(time * 0.4) * 0.15;
    
    const rayOrigin = d.vec3f(wobble + panX, 0.15 + panY, -3.5 + zoom * 0.5);
    const rayDirection = std.normalize(d.vec3f(scaled.x * zoom, scaled.y * zoom, 1.0));
    const travel = rayMarch(rayOrigin, rayDirection);
    const hitPoint = rayOrigin + rayDirection * travel;
    const normal = estimateNormal(hitPoint);
    const lightDir = std.normalize(d.vec3f(-0.4, 0.8, -0.5));

    const diffuse = std.max(std.dot(normal, lightDir), 0.0);
    const rim = std.pow(std.max(0.0, std.dot(normal, d.vec3f(0.0, 0.0, -1.0))), 10.0);
    const baseColor = d.vec3f(0.88, 0.56, 0.28);
    const glassGlow = d.vec3f(0.92, 0.7, 0.34) * rim * 0.35;
    const shading = baseColor * (0.08 + diffuse * 0.9) + glassGlow;
    const fog = d.vec3f(0.04, 0.03, 0.05) * (travel * 0.08);
    const finalColor = shading + fog;
    const alpha = std.saturate(1.0 - travel * 0.035);

    return d.vec4f(finalColor * alpha, 1.0);
  });

  const pipeline = root.with(globals).createRenderPipeline({
    vertex: common.fullScreenTriangle,
    fragment: rayMarchFragment,
    targets: [{ format }],
  });

  const resizeCanvas = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    globals.write({
      time: performance.now() * 0.001,
      resolution: [canvas.width, canvas.height],
      aspect: canvas.width / canvas.height,
    });
  };

  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  const renderFrame = (time: number) => {
    globals.write({
      time: time * 0.001,
      resolution: [canvas.width, canvas.height],
      aspect: canvas.width / canvas.height,
    });

    pipeline
      .withColorAttachment({
        view: context.getCurrentTexture().createView(),
        clearValue: { r: 0.03, g: 0.02, b: 0.04, a: 1.0 },
        loadOp: 'clear',
        storeOp: 'store',
      })
      .draw(3);

    requestAnimationFrame(renderFrame);
  };

  requestAnimationFrame(renderFrame);
  setupScrollContent();
};

const setupScrollContent = () => {
  const scrollContainer = document.getElementById('scroll-container');
  if (scrollContainer) {
    scrollContainer.style.zIndex = '10';
  }
};

window.addEventListener('load', initApp);

const handleSubmit = (event: Event) => {
  event.preventDefault();
  document.getElementById('bookingForm')!.style.display = 'none';
  document.getElementById('successMsg')!.style.display = 'block';
  console.log('Form submitted');
};

(window as any).handleSubmit = handleSubmit;
