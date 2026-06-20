import { d, Struct } from 'typegpu';

export const Ray = Struct({
  origin: d.vec3f,
  direction: d.vec3f,
});

export const DirectionalLight = Struct({
  direction: d.vec3f,
  color: d.vec3f,
});

export const HitInfo = Struct({
  distance: d.f32,
  objectType: d.u32,
  t: d.f32,
});

export const LineInfo = Struct({
  t: d.f32,
  distance: d.f32,
  normal: d.vec2f,
});

export const SdfBbox = Struct({
  left: d.f32,
  right: d.f32,
  bottom: d.f32,
  top: d.f32,
});

export const ObjectType = {
  SLIDER: 0,
  BACKGROUND: 1,
};

export const sampleLayout = Struct({
  currentTexture: d.texture2d(d.f32),
});

export const rayMarchLayout = Struct({
  backgroundTexture: d.texture2d(d.f32),
});
