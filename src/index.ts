import images2json from './images2json';

const getParam = (): string => {
  if (process.argv[2]) {
    return process.argv[2];
  }
  return `${__dirname}/../images`;
};

export const hello = (name: string): string => {
  return `Process ${name}`;
};

console.log(hello('Start'));
images2json(getParam());
