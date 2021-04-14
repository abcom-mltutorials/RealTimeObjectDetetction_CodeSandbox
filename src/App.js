// Import dependencies
import React, { useRef, useState, useEffect, Fragment } from "react";
import * as tf from "@tensorflow/tfjs";
import * as cocossd from "@tensorflow-models/coco-ssd";
import WebCam from "react-webcam";
import "./App.css";
import { drawRectangle } from "./utilities";
import { Camera } from "react-cam";

function App() {
  const webcamref = useRef(null);
  const canvasref = useRef(null);

  // Main function
  const runCoco = async () => {
    const net = await cocossd.load();
    console.log("Detection for Realtime Objects ");
    //  Loop and detect hands
    setInterval(() => {
      detect(net);
    }, 10);
  };
  const detect = async (net) => {
    // Check data is available
    if (
      typeof webcamref.current !== "undefined" &&
      webcamref.current !== null &&
      webcamref.current.video.readyState === 4
    ) {
      // Get Video Properties
      const video = webcamref.current.video;
      const videoWidth = webcamref.current.video.videoWidth;
      const videoHeight = webcamref.current.video.videoHeight;

      // Set video width
      //Change
      webcamref.current.video.width = videoWidth;
      webcamref.current.video.height = videoHeight;
      //Change END

      //CHANGE

      // Set canvas height and width
      canvasref.current.width = videoWidth;
      canvasref.current.height = videoHeight;
      //CHANGE END

      //CHANGE
      //CHANGE END
      // Make Detections
      const obj = await net.detect(video);
      console.log(obj);

      // Draw mesh
      const ctx = canvasref.current.getContext("2d");
      drawRectangle(obj, ctx);
    }
  };

  useEffect(() => {
    runCoco();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <WebCam
          ref={webcamref}
          muted={true}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 320,
            height: 240
          }}
        />
        <canvas
          ref={canvasref}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 8,
            width: 150,
            height: 200
          }}
        />
      </header>
    </div>
  );
}

export default App;
