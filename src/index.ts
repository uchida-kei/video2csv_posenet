import video2frameImage from './video2frameImages';
import images2json from './images2json';
import json2csv from './json2csv';
import { getParam, getMovieName } from './util';

export const hello = (name: string): string => {
  return `Process ${name}`;
};

const main = async (moviePath: string) => {
  video2frameImage(moviePath);
  images2json(`${__dirname}/../images`).then((jsonList) =>
    json2csv(jsonList, getMovieName(moviePath))
  );
};

console.log(hello('Start'));
main(getParam());
