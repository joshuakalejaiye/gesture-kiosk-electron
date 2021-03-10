/** @jsxImportSource @emotion/react */
import { jsx, css } from '@emotion/react'
import React, { useRef, useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import * as cocossd from "@tensorflow-models/coco-ssd";
import Webcam from "react-webcam";
import mouse from '../images/cursor.png';

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user"
};

const ClickOnThing = (x,y) => {
  console.log("x: " + x);
  console.log("y: " + y);
  console.log("bottle detected");
  var ev = document.createEvent("MouseEvent");
  var el = document.elementFromPoint(x,y);
  ev.initMouseEvent(
      "click",
      true /* bubble */, true /* cancelable */,
      window, null,
      x, y, 0, 0, /* coordinates */
      false, false, false, false, /* modifier keys */
      0 /*left*/, null
  );
  el.dispatchEvent(ev);
}

const ObjectDetector = () => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const screenScalar = 10;

  // Main function
  const runCoco = async () => {
    const net = await cocossd.load();
    console.log("COCOSSD model loaded.");
    //  Loop and detect hands
    setInterval(() => {
      detect(net);
    }, 10);
  };

  const detect = async (net) => {
    // Check data is available
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get Video Properties
      const cursor = document.getElementById('cursor');  
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // // Set canvas height and width
      // canvasRef.current.width = videoWidth;
      // canvasRef.current.height = videoHeight;

      // Make Detections
      const obj = await net.detect(video);
      //console.log(obj);
        
      try
      {
        //if (obj[0]['class'])
        //{
          if (obj[0]['class'] === "cell phone" )
          {
            const [x, y, _] = obj[0]['bbox'];
            //console.log("X: " + x + "  Y: " + y);
            cursor.style.transform = `translate(${ x * 1.2 }px, ${(y * 2) % 720}px)`;
            //console.log("Translated X value: " + window.screen.availWidth % (x * screenScalar));
            //console.log("Scaled X value: " + (x * screenScalar));
            //console.log("Original X value: " + x);
          }
          else if (obj[0]['class'] === "bottle" )
          {
            const [x, y, _] = obj[0]['bbox'];
            console.log(x * screenScalar);
            ClickOnThing(cursor.offsetLeft, cursor.offsetTop);
          }
        //}
      }
      catch (err)
      {
        console.error(err);
      }
    }
      
  }

  useEffect(()=>{runCoco()},[]);

  return (
    <>
    <img id="cursor" css={css` 
    z-index: 1000;
    position: fixed;
    pointer-events: "none";
    height: 8vh;
    width: 8vh;`
    } src={mouse} alt=""></img>

    <div>
        <Webcam
          ref={webcamRef}
          muted={true} 
          mirrored
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            height: 170,
            width: 160,
            left: 0,
            bottom: 0,
            textAlign: "center",
            zindex: 2,
          }}
          videoConstraints={videoConstraints}
        />

        <canvas
          ref={canvasRef}
          style={{
            pointerEvents: "none",
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 3,
            width: "100%",
            height: "100%",
          }}
        />
    </div>
    </>
  );
};

export default ObjectDetector;
