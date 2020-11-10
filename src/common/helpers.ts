export const mix = (value: number, x: number, y: number) => {
  'worklet';
  return x * (1 - value) + y * value;
};
