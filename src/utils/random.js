import math from "mathjs";

export const nRandom = (n, min = 0, max = 0) =>
  [...Array(n)].map(() => math.random(min, max));
