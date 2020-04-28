import { execFileSync } from 'child_process';
import fs from 'fs';

const ffmpeg = (moviePath: string): void => {
  try {
    execFileSync('ffmpeg', [
      '-i',
      moviePath,
      '-vcodec',
      'png',
      `${__dirname}/../images/%d.png`,
    ]);
  } catch (e) {
    console.log(e);
  }
};

const video2frameImages = (moviePath: string): void => {
  try {
    fs.mkdirSync(`${__dirname}/../images/`);
  } catch (e) {
    if (e.code === 'ENOENT') {
      console.log(e);
    }
  }
  ffmpeg(moviePath);
};

export default video2frameImages;
