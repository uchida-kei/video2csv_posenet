import * as posenet from '@tensorflow-models/posenet';
import fs from 'fs';
import fsEx from 'fs-extra';
import * as tf from '@tensorflow/tfjs-node';
import { countFile } from './util';

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
  const lastFrameNum = countFile(dir, 'png');
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
