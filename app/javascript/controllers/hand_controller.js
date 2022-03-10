import { Controller } from "stimulus";
import { Holistic } from "@mediapipe/holistic/holistic";
import { Camera } from "@mediapipe/camera_utils/camera_utils";

export default class extends Controller {
  static targets = ["output"];

  // if hand sign, change image displayed in media pipe
  // set up working media pipe camera
  // select id of image
  // replace image

  connect() {
    const videoElement = document.getElementsByClassName("input_video")[0];
    const canvasElement = document.getElementsByClassName("output_canvas")[0];
    {
      /* these are arrays mapping points of body location from video and onto canvas? */
    }
    const canvasCtx = canvasElement.getContext("2d");
    // const clothes = initCloth(results);
    let i = 0;
    {
      /* define variable turning canvasElement into a 2d pic? */
    }

    const initCloth = (results) => {
      const img = document.getElementById("media-pipe");
      const shoulderDistance = Math.abs(
        results.poseLandmarks[12]["x"] - results.poseLandmarks[11]["x"]
      );
      const imgRatio = (img.height / img.width);
      const width = shoulderDistance * 1.6;
      const height = width * imgRatio;
      const distShouldNeck = 0.39;
      return {
        element: img,
        shoulderDistance: shoulderDistance,
        width: width,
        height: height,
        xAxis:
          results.poseLandmarks[0]["x"] - width / 2,
        yAxis: results.poseLandmarks[12]["y"] + distShouldNeck,
      };
    };

    // let change = false

    let hands = document.getElementById("media-pipe")
    console.log(hands)

    // function changeClothes(results) {
    //   if (results.poseLandmarks[20].y < results.poseLandmarks[0].y) {
    //     hands.src="/assets/tshirt.png"
    //   }
    // }


    function onResults(results) {
      const clothes = initCloth(results);
      canvasCtx.save();
      // save the 2d pic


      canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
      canvasCtx.drawImage(
        results.segmentationMask,
        0,
        0,
        canvasElement.width,
        canvasElement.height
      );
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
      canvasCtx.globalCompositeOperation = "destination-atop";
      canvasCtx.drawImage(
        results.image,
        0,
        0,
        canvasElement.width,
        canvasElement.height
      );
      // console.log(results.poseLandmarks[0])
      canvasCtx.globalCompositeOperation = "source-over";
      // drawConnectors(canvasCtx, results.poseLandmarks, POSE_CONNECTIONS,
      //                {color: '#00FF00', lineWidth: 4});
      // drawLandmarks(canvasCtx, results.poseLandmarks, {
      //   color: "none",
      //   lineWidth: "none",
      // });


      // drawConnectors(canvasCtx, results.faceLandmarks, FACEMESH_TESSELATION,
      //                {color: '#C0C0C070', lineWidth: 1});


      // drawConnectors(canvasCtx, results.leftHandLandmarks, HAND_CONNECTIONS, {
      //   color: "#CC0000",
      //   lineWidth: 5,
      // });
      // drawLandmarks(canvasCtx, results.leftHandLandmarks, {
      //   color: "#00FF00",
      //   lineWidth: 2,
      // });
      // drawConnectors(canvasCtx, results.rightHandLandmarks, HAND_CONNECTIONS, {
      //   color: "#00CC00",
      //   lineWidth: 5,
      // });
      // drawLandmarks(canvasCtx, results.rightHandLandmarks, {
      //   color: "#FF0000",
      //   lineWidth: 2,
      // });


      // console.log(clothes);
      canvasCtx.drawImage(
        clothes.element,
        clothes.xAxis * canvasElement.width,
        canvasElement.height/2 - (1 - clothes.yAxis) * canvasElement.height,
        clothes.width * canvasElement.width,
        clothes.height * canvasElement.width
      );

      if (results.poseLandmarks[20].y < results.poseLandmarks[0].y) {
        console.log("less than")
        hands.src="https://google.github.io/mediapipe/images/mobile/pose_classification_pairwise_distances.png"
      }

      // if (change = false) {
      //   hands.src="https://google.github.io/mediapipe/images/mobile/pose_classification_pairwise_distances.png"
      // } else {
      //   hands.src="tshirt.png"
      // }

      i += 1;
      canvasCtx.restore();

      // console.log(results.poseLandmarks[11])
      // console.log(results.poseLandmarks[12])
    }
    {
      /* this defines function Holistic, which calls the file (what file?  svg?  video?) */
    }
    const holistic = new Holistic({
      locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/holistic/${file}`;
      },
    });
    holistic.setOptions({
      modelComplexity: 1,
      smoothLandmarks: true,
      enableSegmentation: true,
      smoothSegmentation: true,
      refineFaceLandmarks: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });
    holistic.onResults(onResults);
    {
      /* passing file, we run onResults function above to render canvas or smth */
    }


    // console.log(onResults)


    const camera = new Camera(videoElement, {
      onFrame: async () => {
        await holistic.send({ image: videoElement });
      },
      width: 1280,
      height: 720,
    });
    camera.start();
    {
      /* start the webcam/camera with Holistic function */
    }
  }
}
