import * as posenet from '@tensorflow-models/posenet';
import fs from 'fs';
// import fsEx from 'fs-extra';
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

const images2json = async (dir: string): Promise<posenet.Pose[]> => {
  const net = await posenet.load();
  const lastFrameNum = countFile(dir, 'png');
  if (lastFrameNum > 0) {
    const jsonList = await Promise.all(
      [...Array(lastFrameNum + 1).keys()]
        .slice(1)
        .map(async (imageNum: number) => {
          const result = await image2pose(net, `${dir}/${imageNum}.png`)
            .then((pose) => {
              // fsEx.outputJson(`json/${imageNum}.json`, pose);
              return pose;
            })
            .catch((e) => {
              throw e;
            });
          return result;
        })
    );
    return jsonList;
  }
  const empJsonList: posenet.Pose[] = [];
  return empJsonList;
};

export default images2json;
