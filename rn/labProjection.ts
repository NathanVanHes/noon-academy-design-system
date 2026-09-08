/**
 * 3D world → 2D screen projection.
 * Ported from noon-bg-lab. Shared by BrandParticles, BrandContours, BrandFaceted.
 */

export interface ViewConfig {
  pitch: number;
  yaw: number;
  distance: number;
  fov: number;
  cameraHeight: number;
}

export interface ScreenPoint {
  sx: number;
  sy: number;
  depth: number;
}

export function project(
  wx: number, wy: number, wz: number,
  view: ViewConfig, w: number, h: number,
): ScreenPoint | null {
  const cyy = Math.cos(view.yaw);
  const syy = Math.sin(view.yaw);
  const cpp = Math.cos(view.pitch);
  const spp = Math.sin(view.pitch);

  const x1 = wx * cyy - wz * syy;
  const z1 = wx * syy + wz * cyy;
  const y1 = wy;

  const xt = x1;
  const yt = y1 - view.cameraHeight;
  const zt = z1 + view.distance;

  const xc = xt;
  const yc = yt * cpp + zt * spp;
  const zc = -yt * spp + zt * cpp;

  if (zc < 1) return null;

  const f = view.fov;
  const sx = (xc * f) / zc + w / 2;
  const sy = (-yc * f) / zc + h / 2;
  return { sx, sy, depth: zc };
}
