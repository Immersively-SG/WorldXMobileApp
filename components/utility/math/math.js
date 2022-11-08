export const RandomRangeInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const RandomRangeFloat = (min, max) => {
  return Math.random() * (max - min) + min;
};
