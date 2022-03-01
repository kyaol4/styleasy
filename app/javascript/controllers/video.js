// Visit The Stimulus Handbook for more details
// https://stimulusjs.org/handbook/introduction
//
// This example controller works with specially annotated HTML like:
//
// <div data-controller="hello">
//   <h1 data-target="hello.output"></h1>
// </div>

import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = [ "output" ]

  connect() {
    // holistic = new Holistic({locateFile: (file) => {
    //   return `https://cdn.jsdelivr.net/npm/@mediapipe/holistic/${file}`;
    // }})

    // this.outputTarget.textContent = 'Hello, Stimulus!'
  }
}
/* <script type="module"> */
// const videoElement = document.getElementsByClassName('input_video')[0];
// const canvasElement = document.getElementsByClassName('output_canvas')[0];
// const canvasCtx = canvasElement.getContext('2d');


// function onResults(results) {
//   canvasCtx.save();
//   canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
//   canvasCtx.drawImage(results.segmentationMask, 0, 0,
//                       canvasElement.width, canvasElement.height);

//   // Only overwrite existing pixels.
//   canvasCtx.globalCompositeOperation = 'source-in';
//   canvasCtx.fillStyle = '#00FF00';
//   canvasCtx.fillRect(0, 0, canvasElement.width, canvasElement.height);

//   // Only overwrite missing pixels.
//   canvasCtx.globalCompositeOperation = 'destination-atop';
//   canvasCtx.drawImage(
//       results.image, 0, 0, canvasElement.width, canvasElement.height);

//   canvasCtx.globalCompositeOperation = 'source-over';
//   drawConnectors(canvasCtx, results.poseLandmarks, POSE_CONNECTIONS,
//                  {color: '#00FF00', lineWidth: 4});
//   drawLandmarks(canvasCtx, results.poseLandmarks,
//                 {color: '#FF0000', lineWidth: 2});
//   drawConnectors(canvasCtx, results.faceLandmarks, FACEMESH_TESSELATION,
//                  {color: '#C0C0C070', lineWidth: 1});
//   drawConnectors(canvasCtx, results.leftHandLandmarks, HAND_CONNECTIONS,
//                  {color: '#CC0000', lineWidth: 5});
//   drawLandmarks(canvasCtx, results.leftHandLandmarks,
//                 {color: '#00FF00', lineWidth: 2});
//   drawConnectors(canvasCtx, results.rightHandLandmarks, HAND_CONNECTIONS,
//                  {color: '#00CC00', lineWidth: 5});
//   drawLandmarks(canvasCtx, results.rightHandLandmarks,
//                 {color: '#FF0000', lineWidth: 2});
//   canvasCtx.restore();
// }

// const holistic = new Holistic({locateFile: (file) => {
//   return `https://cdn.jsdelivr.net/npm/@mediapipe/holistic/${file}`;
// }});
// holistic.setOptions({
//   modelComplexity: 1,
//   smoothLandmarks: true,
//   enableSegmentation: true,
//   smoothSegmentation: true,
//   refineFaceLandmarks: true,
//   minDetectionConfidence: 0.5,
//   minTrackingConfidence: 0.5
// });
// holistic.onResults(onResults);

// camera = new Camera(videoElement, {
//   onFrame: async () => {
//     await holistic.send({image: videoElement});
//   },
//   width: 1280,
//   height: 720
// });
// camera.start();

// </script>
