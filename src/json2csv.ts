import fs from 'fs';
import fsEx from 'fs-extra';
import csv from 'csv-stringify';
import { countFile, iota } from './util';

const partList = [
  'nose',
  'leftEye',
  'rightEye',
  'leftEar',
  'rightEar',
  'leftShoulder',
  'rightShoulder',
  'leftElbow',
  'rightElbow',
  'leftWrist',
  'rightWrist',
  'leftHip',
  'rightHip',
  'leftKnee',
  'rightKnee',
  'leftAnkle',
  'rightAnkle',
];

const CreateColumun = (pList: string[]): string[] => {
  const columuns: string[] = ['frameNum', 'score'];
  pList.map((part: string): void => {
    columuns.push(`${part}.score`);
    columuns.push(`${part}.x`);
    columuns.push(`${part}.y`);
  });
  return columuns;
};

const json2csv = (movieName: string) => {
  const resultCsv: (string[] | number[])[] = [CreateColumun(partList)];

  const filesLen = countFile(`${__dirname}/../json/`, 'json');
  resultCsv.push(
    ...iota(filesLen).map(
      (fileNum: number): Array<number> => {
        const json = fsEx.readJsonSync(`${__dirname}/../json/${fileNum}.json`);
        const jsonList = [fileNum, json.score];
        json.keypoints.map((partObj: any): void => {
          jsonList.push(partObj.score);
          jsonList.push(partObj.position.x);
          jsonList.push(partObj.position.y);
        });
        return jsonList;
      }
    )
  );
  csv(resultCsv, (err, data) => {
    try {
      fs.mkdirSync(`${__dirname}/../csv/`);
    } catch (e) {
      if (e.code === 'ENOENT') {
        console.log(e);
      }
    }
    fs.writeFileSync(`${__dirname}/../csv/${movieName}.csv`, data);
  });
};

export default json2csv;
