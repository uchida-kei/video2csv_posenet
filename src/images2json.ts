import * as posenet from '@tensorflow-models/posenet';
import fs from 'fs';
import fsEx from 'fs-extra';
import * as tf from '@tensorflow/tfjs-node';

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

export const countFrame = (dir: string): number => {
  let count = 1;
  while (count < 10000) {
    if (!isExistFile(`${dir}/${count}.png`)) {
      return count - 1;
    }
    count += 1;
  }
  return 0;
};

const image2pose = async (
  net: posenet.PoseNet,
  url: string
): Promise<posenet.Pose> => {
  const imageBuffer = fs.readFileSync(url);
  const tfImage = tf.node.decodePng(imageBuffer);
  const pose = await net.estimateSinglePose(tfImage);
  return pose;
};

const images2json = async (dir: string): Promise<void> => {
  const net = await posenet.load();
  const lastFrameNum = countFrame(dir);
  if (lastFrameNum > 0) {
    [...Array(lastFrameNum + 1).keys()]
      .slice(1)
      .map((imageNum: number): number => {
        image2pose(net, `${dir}/${imageNum}.png`)
          .then((pose) => {
            fsEx.outputJson(`json/${imageNum}.json`, pose);
          })
          .catch((e) => {
            throw e;
          });
        return 0;
      });
  }
  console.log('Done');
};

export default images2json;
