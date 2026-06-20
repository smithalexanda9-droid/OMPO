import tgpu, { d } from 'typegpu';

/* Fresnel-Schlick approximation */
export const fresnelSchlick = (cosTheta: number, f0: number, ior: number): number => {
  'use gpu';
  const f0_actual = (1 - ior) / (1 + ior);
  return f0_actual + (1 - f0_actual) * ((1 - cosTheta) ** 5);
};

/* Beer-Lambert law for light absorption */
export const beerLambert = (absorption: any, distance: number): any => {
  'use gpu';
  return d.vec3f(
    Math.exp(-absorption.x * distance),
    Math.exp(-absorption.y * distance),
    Math.exp(-absorption.z * distance)
  );
};

/* Ray-box intersection */
export const intersectBox = (
  rayOrigin: any,
  rayDir: any,
  boxMin: any,
  boxMax: any
): { hit: boolean; tMin: number; tMax: number } => {
  'use gpu';
  const invDir = d.vec3f(1 / rayDir.x, 1 / rayDir.y, 1 / rayDir.z);
  const t0 = (boxMin - rayOrigin) * invDir;
  const t1 = (boxMax - rayOrigin) * invDir;
  
  const tMin = Math.min(t0, t1);
  const tMax = Math.max(t0, t1);
  
  return {
    hit: tMax >= Math.max(tMin, 0),
    tMin: Math.max(tMin, 0),
    tMax: tMax,
  };
};

/* Create render textures */
export const createTextures = (root: any, width: number, height: number) => {
  return [0, 1].map(() => {
    const tex = root
      .createTexture({
        size: [Math.floor(width), Math.floor(height)],
        format: 'rgba8unorm',
      })
      .$usage('render', 'textureBinding');
    return tex;
  });
};

/* Create background texture */
export const createBackgroundTexture = (root: any, width: number, height: number) => {
  return root
    .createTexture({
      size: [Math.floor(width), Math.floor(height)],
      format: 'rgba8unorm',
    })
    .$usage('textureBinding');
};
