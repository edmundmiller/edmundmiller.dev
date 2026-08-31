// Adapted from ThreeUI commit 35c95642a631a2b48439e535be591f022410581b.
// Copyright (c) 2026 Meng To. Licensed under the MIT License in ./LICENSE.

export type PredictiveArcMode = 'dark' | 'light';

export type PredictiveArcOptions = {
  mode: PredictiveArcMode;
  speed: number;
  spacing: number;
  dotSize: number;
  archHeight: number;
  thickness: number;
  brightness: number;
  hue: number;
  saturation: number;
};

export const PREDICTIVE_ARC_DEFAULTS: PredictiveArcOptions = {
  mode: 'dark',
  speed: 1,
  spacing: 5,
  dotSize: 6,
  archHeight: 0.7,
  thickness: 1,
  brightness: 1,
  hue: 0,
  saturation: 1,
};

export function createPredictiveArcRenderer(
  canvas: HTMLCanvasElement,
  getOptions: () => PredictiveArcOptions,
) {
  const context = canvas.getContext('2d', { alpha: false });
  if (!context) {
    return null;
  }
  let width = 1;
  let height = 1;
  let time = 0;

  const resize = (nextWidth: number, nextHeight: number) => {
    width = Math.max(1, nextWidth);
    height = Math.max(1, nextHeight);
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * pixelRatio);
    canvas.height = Math.round(height * pixelRatio);
    context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  };

  const render = () => {
    const options = getOptions();
    const isLight = options.mode === 'light';
    context.fillStyle = isLight ? '#eef1f6' : '#030303';
    context.fillRect(0, 0, width, height);
    time += 0.015 * options.speed;

    const centerX = width / 2;
    const archPeakY = height * 0.35;
    const archWidth = width * 1.5;
    const archHeight = height * options.archHeight;
    context.globalCompositeOperation = isLight ? 'source-over' : 'lighter';

    for (let x = 0; x < width; x += options.spacing) {
      const normX = (x - centerX) / (archWidth / 2);
      const curveY = archPeakY + normX * normX * archHeight;
      for (let y = 0; y < height; y += options.spacing) {
        const distanceToCurve = Math.abs(y - curveY);
        const thickness = (140 + (1 - Math.abs(normX)) * 80) * options.thickness;
        if (distanceToCurve >= thickness) {
          continue;
        }
        let intensity = 1 - distanceToCurve / thickness;
        const waveX = Math.sin(x * 0.015 + time);
        const waveY = Math.cos(y * 0.02 + time);
        intensity = intensity * 0.7 + waveX * waveY * 0.3 * intensity;
        intensity *= Math.max(0, 1 - Math.abs(normX) ** 2.5);
        if (intensity <= 0.02) {
          continue;
        }

        let red: number;
        let green: number;
        let blue: number;
        if (isLight) {
          red = Math.min(255, 48 * intensity + 70 * intensity ** 3);
          green = Math.min(255, 28 * intensity + 45 * intensity ** 4);
          blue = Math.min(255, 120 * intensity + 110 * intensity ** 2);
          if (intensity > 0.7) {
            const coreBoost = (intensity - 0.7) * 3.3;
            red = Math.min(255, red + 90 * coreBoost);
            green = Math.min(255, green + 70 * coreBoost);
            blue = Math.min(255, blue + 110 * coreBoost);
          }
        } else {
          red = Math.min(255, 60 * intensity + 100 * intensity ** 3);
          green = Math.min(255, 20 * intensity + 60 * intensity ** 4);
          blue = Math.min(255, 120 * intensity + 135 * intensity ** 2);
          if (intensity > 0.7) {
            const coreBoost = (intensity - 0.7) * 3.3;
            red = Math.min(255, red + 150 * coreBoost);
            green = Math.min(255, green + 150 * coreBoost);
            blue = Math.min(255, blue + 150 * coreBoost);
          }
        }
        context.fillStyle = `rgb(${Math.floor(red * options.brightness)}, ${Math.floor(green * options.brightness)}, ${Math.floor(blue * options.brightness)})`;
        context.fillRect(x, y, options.dotSize * intensity, options.dotSize * intensity);
      }
    }
    context.globalCompositeOperation = 'source-over';
  };

  return { resize, render };
}
