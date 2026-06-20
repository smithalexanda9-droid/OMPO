/* Ray marching configuration constants */

export const MAX_STEPS = 200;
export const MAX_DIST = 20.0;
export const SURF_DIST = 0.001;

/* Ambient lighting */
export const AMBIENT_COLOR = [1.0, 1.0, 1.0];
export const AMBIENT_INTENSITY = 0.2;

/* Specular highlights */
export const SPECULAR_INTENSITY = 0.8;
export const SPECULAR_POWER = 32.0;

/* Ambient occlusion */
export const AO_BIAS = 0.001;
export const AO_INTENSITY = 1.0;
export const AO_RADIUS = 0.2;
export const AO_STEPS = 4;

/* Refraction settings */
export const JELLY_IOR = 1.5;
export const JELLY_SCATTER_STRENGTH = 0.6;

/* Line rendering */
export const LINE_HALF_THICK = 0.08;
export const LINE_RADIUS = 0.015;

/* Ground material */
export const GROUND_ALBEDO = [0.9, 0.9, 0.9];
