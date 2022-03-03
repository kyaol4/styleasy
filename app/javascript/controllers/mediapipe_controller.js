import { Controller } from "stimulus";
import { Holistic } from '@mediapipe/holistic/holistic';
import { Camera } from '@mediapipe/camera_utils/camera_utils';
import {
  drawConnectors,
  drawLandmarks,
} from '@mediapipe/drawing_utils/drawing_utils';
import {
  POSE_CONNECTIONS,
  HAND_CONNECTIONS,
} from "@mediapipe/holistic/holistic";
// import { Hands  } from '@mediapipe/hands/hands';

export default class extends Controller {
  static targets = [ "output" ]

  connect() {

const videoElement = document.getElementsByClassName('input_video')[0];
const canvasElement = document.getElementsByClassName('output_canvas')[0];
 {/* these are arrays mapping points of body location from video and onto canvas? */}
const canvasCtx = canvasElement.getContext('2d');
{/* define variable turning canvasElement into a 2d pic? */}

function onResults(results) {
  canvasCtx.save();
  // save the 2d pic

  canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
  canvasCtx.drawImage(results.segmentationMask, 0, 0,
                      canvasElement.width, canvasElement.height);
  // console.log(canvasCtx.drawImage)

  let activeEffect = "mask";
  // Only overwrite existing pixels. --> wtf this mean?
  // canvasCtx.globalCompositeOperation = 'source-in';
  // canvasCtx.fillStyle = 'none';
  // canvasCtx.fillRect(0, 0, canvasElement.width, canvasElement.height);
  if (activeEffect === "mask" || activeEffect === "both") {
    canvasCtx.globalCompositeOperation = "source-in";
    // This can be a color or a texture or whatever...
    canvasCtx.fillStyle = "#00000000";
    canvasCtx.fillRect(0, 0, canvasElement.width, canvasElement.height);
  } else {
    canvasCtx.globalCompositeOperation = "source-out";
    canvasCtx.fillStyle = "#00000000";
    canvasCtx.fillRect(0, 0, canvasElement.width, canvasElement.height);
  }

  // Only overwrite missing pixels. -->
  canvasCtx.globalCompositeOperation = 'destination-atop';
  canvasCtx.drawImage(
      results.image, 0, 0, canvasElement.width, canvasElement.height);
    // console.log(results.poseLandmarks[0])
  canvasCtx.globalCompositeOperation = 'source-over';
  // drawConnectors(canvasCtx, results.poseLandmarks, POSE_CONNECTIONS,
  //                {color: '#00FF00', lineWidth: 4});
  drawLandmarks(canvasCtx, results.poseLandmarks,
                {color: '#FF0000', lineWidth: 2});

  // drawConnectors(canvasCtx, results.faceLandmarks, FACEMESH_TESSELATION,
  //                {color: '#C0C0C070', lineWidth: 1});

  drawConnectors(canvasCtx, results.leftHandLandmarks, HAND_CONNECTIONS,
                 {color: '#CC0000', lineWidth: 5});
  drawLandmarks(canvasCtx, results.leftHandLandmarks,
                {color: '#00FF00', lineWidth: 2});
  drawConnectors(canvasCtx, results.rightHandLandmarks, HAND_CONNECTIONS,
                 {color: '#00CC00', lineWidth: 5});
  drawLandmarks(canvasCtx, results.rightHandLandmarks,
                {color: '#FF0000', lineWidth: 2});
  canvasCtx.restore();
  // console.log(results.poseLandmarks[11])
  // console.log(results.poseLandmarks[12])
let canvas = document.getElementById("mediapipe");
let ctx = canvas.getContext("2d");
let img = document.getElementById("media-pipe");
// console.log(results.poseLandmarks)
const shoulderDistance = Math.abs(results.poseLandmarks[11]["x"] - results.poseLandmarks[12]["x"]);
const width = shoulderDistance * 2;
const height = width * img.height/img.width;
const xAxis = results.poseLandmarks[11]["x"] + shoulderDistance / 2 - width/2;
const yAxis = results.poseLandmarks[11]["y"] + 1
// + shoulderDistance / 2 - width/2;
// ctx.drawImage(img, results.poseLandmarks[11]["y"] * 180,results.poseLandmarks[0]["y"] * 1200, 1000, 1000);
// console.log(shoulderDistance, width, height, xAxis, yAxis);
console.log(results.poseLandmarks[11]["y"] * 180,results.poseLandmarks[0]["y"] * 1200)
console.log(xAxis * 180, yAxis * 1200, width * 1000, height * 1000)
ctx.drawImage(img, xAxis * 550, yAxis * 200, width * 1000, height * 1000);
}

{/* this defines function Holistic, which calls the file (what file?  svg?  video?) */}
const holistic = new Holistic({locateFile: (file) => {
  return `https://cdn.jsdelivr.net/npm/@mediapipe/holistic/${file}`;
}});
holistic.setOptions({
  modelComplexity: 1,
  smoothLandmarks: true,
  enableSegmentation: true,
  smoothSegmentation: true,
  refineFaceLandmarks: true,
  minDetectionConfidence: 0.5,
  minTrackingConfidence: 0.5
});
holistic.onResults(onResults);
{/* passing file, we run onResults function above to render canvas or smth */}

// console.log(onResults)

const camera = new Camera(videoElement, {
  onFrame: async () => {
    await holistic.send({image: videoElement});
  },
  width: 1280,
  height: 720
});
camera.start();
{/* start the webcam/camera with Holistic function */}

  }

}
