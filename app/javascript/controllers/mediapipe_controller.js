import { Controller } from "stimulus";
import { Holistic } from '@mediapipe/holistic/holistic';
import { Camera } from '@mediapipe/camera_utils/camera_utils';
import {
  drawConnectors,
  drawLandmarks,
} from '@mediapipe/drawing_utils/drawing_utils';
import {
  POSE_LANDMARKS,
  POSE_LANDMARKS_LEFT,
  POSE_LANDMARKS_RIGHT,
  POSE_CONNECTIONS,
  HAND_CONNECTIONS,
  FACEMESH_TESSELATION,
  FACEMESH_RIGHT_EYE,
  FACEMESH_RIGHT_EYEBROW,
  FACEMESH_LEFT_EYE,
  FACEMESH_LEFT_EYEBROW,
  FACEMESH_FACE_OVAL,
  FACEMESH_LIPS,
  VERSION,
} from "@mediapipe/holistic/holistic";
// import { Hands  } from '@mediapipe/hands/hands';

export default class extends Controller {
  static targets = [ "output" ]

  connect() {
    // Issues:
//   How do we get started?  Code below is copied from documentation, is this code even relevant?
//   --> need js controller to handle these actions.  they wrote it inside html script and put js in, but we need to take it out into the connect()
//   Which js file do we use this code in?
//   What other files do we need to create?
    // --> tbd
//   Which elements of this code from documentation do we use/edit?
    // --> tbd
//   Everything we learned in Stimulus is about Listening for specific actions and then giving a response, is this in the connect() initializer?
//   Is this entire code going into initializer?  do we split it?

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
                      // random shit about drawing the shapes, assume we copy paste this
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
    // console.log(results.poseLandmarks[11])
  canvasCtx.globalCompositeOperation = 'source-over';
  drawConnectors(canvasCtx, results.poseLandmarks, POSE_CONNECTIONS,
                 {color: '#00FF00', lineWidth: 4});
  drawLandmarks(canvasCtx, results.poseLandmarks,
                {color: '#FF0000', lineWidth: 2});
  drawConnectors(canvasCtx, results.faceLandmarks, FACEMESH_TESSELATION,
                 {color: '#C0C0C070', lineWidth: 1});
  drawConnectors(canvasCtx, results.leftHandLandmarks, HAND_CONNECTIONS,
                 {color: '#CC0000', lineWidth: 5});
  drawLandmarks(canvasCtx, results.leftHandLandmarks,
                {color: '#00FF00', lineWidth: 2});
  drawConnectors(canvasCtx, results.rightHandLandmarks, HAND_CONNECTIONS,
                 {color: '#00CC00', lineWidth: 5});
  drawLandmarks(canvasCtx, results.rightHandLandmarks,
                {color: '#FF0000', lineWidth: 2});
  canvasCtx.restore();
  console.log(results.poseLandmarks[11]["x"])
let canvas = document.getElementById("mediapipe");
let ctx = canvas.getContext("2d");
let img = document.getElementById("media-pipe");
ctx.drawImage(img, results.poseLandmarks[3]["x"] * 100,results.poseLandmarks[11]["x"] * 100);
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
