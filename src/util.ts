import path from 'path';
import fs from 'fs';

export const getParam = (): string => {
  if (process.argv[2]) {
    return process.argv[2];
  }
  return `${__dirname}/../shuwa.mp4`;
};

export const getMovieName = (moviePath: string): string => {
  return path.parse(moviePath).name;
};

const isExistFile = (file: string): boolean => {
  try {
    fs.statSync(file);
    return true;
  } catch (err) {
    if (err.code === 'ENOENT') {
      return false;
    }
  }
  return false;
};

export const countFile = (dir: string, ext: string): number => {
  let count = 1;
  while (count < 10000) {
    if (!isExistFile(`${dir}/${count}.${ext}`)) {
      return count - 1;
    }
    count += 1;
  }
  return 0;
};

export const iota = (max: number, start: number = 1): Array<number> => {
  return [...Array(max + 1).keys()].slice(start);
};
