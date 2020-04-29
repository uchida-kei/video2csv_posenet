import fs from 'fs';
import csv from 'csv-stringify';

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

const json2csv = (jsons: any, movieName: string) => {
  const resultCsv: (string[] | number[])[] = [CreateColumun(partList)];

  resultCsv.push(
    ...jsons.map(
      (json: any, index: number): Array<number> => {
        const jsonList = [index + 1, json.score];
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
    console.log('Done');
  });
};

export default json2csv;
