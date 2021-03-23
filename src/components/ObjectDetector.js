/** @jsxImportSource @emotion/react */
import styled from 'styled-components';
import React, { useRef, useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import * as cocossd from "@tensorflow-models/coco-ssd";
import Webcam from "react-webcam";

const objectToTrack = "cell phone";

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user"
};

var x = 0;
var y = 0;

const Cursor = styled.div`
  z-index: 1000;
  height: 10px;
  width: 10px;
  border: 2px solid #67daff;
  border-radius: 50%;
  position: absolute;
  pointer-events: none;
  transition: ease;
`

const ObjectDetector = () => {
  const [counting, setCounting] = useState(false);
  const [clicked, setClicked] = useState(false);
  // const [hovered, setHovered] = useState(null);

  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const cursorRef = useRef(null);
  const xScalar = 2.5;
  const yScalar = 1.7;
  //const yShift = 389.203119516;
  
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

      // Make Detections
      const obj = await net.detect(video);
      //console.log(obj);
        
      try
      {
        x = (-1 * (((obj[0]['bbox'][0] + obj[0]['bbox'][2] ) / 2))) + 640;
        y = obj[0]['bbox'][1] - 200; ///200px higher than the top of the bounding box
        
        x = x * xScalar;
        y = y * yScalar;
      
        if (obj[0]['class'] === objectToTrack && obj[0]['score'] > 0.8 )
        {
          //dispatch mousemove event
          cursor.style.transform = `translate(${ x }px, ${ y }px)`;
          
          //cursor movement event trigger when the cursor is translated
          var cursorMoved = new MouseEvent('mousemove', {
            'view': window,
            'bubbles': true,
            'cancelable': true,
          });
          
          cursor.dispatchEvent(cursorMoved);

          var growEvent = new MouseEvent('mouseover', {
            'view': window,
            'bubbles': true,
            'cancelable': true
          });

          var shrink = new MouseEvent('mouseleave', {
            'view': window,
            'bubbles': true,
            'cancelable': true
          });

          var element = document.elementFromPoint( document.querySelector('#cursor').getBoundingClientRect().left, document.querySelector('#cursor').getBoundingClientRect().top );
          if (element.classList.contains('interactable'))
          {
            cursor.dispatchEvent(growEvent);
          } 
          else
          {
            cursor.dispatchEvent(shrink);
          }


        }
        // else
        // {
        //   setCounting(false);
        // }

      }
      catch (err)
      {
        console.error(err);
      }
    }
  }

  const ClickElementAtPosition = (x,y) => {
   
    console.log( " Cursor Values: " + x + " " + y );

    var cursorClicked = new MouseEvent('click', {
        'view': window,
        'bubbles': true,
        'cancelable': true,
        'screenX': x,
        'screenY': y
    });

    var el = document.elementFromPoint( Math.trunc(x), Math.trunc(y) );
    el.dispatchEvent(cursorClicked);
  }

  useEffect( () => {
    const runCoco = async () => {
      const net = await cocossd.load();
      console.log("COCOSSD model loaded.");
      //  Loop and detect hands
      setInterval(() => {
        detect(net);
      }, 10);
    };

    runCoco();
  },[]);

  useEffect( () => {
    const mouseCursor = document.getElementById('cursor');

    // mouseCursor.addEventListener('mousemove', function() {
    //   console.log('Cursor event triggered');
    // });
    
    mouseCursor.addEventListener('mouseover', function() {
      setCounting(true);
      console.log("mouseover")
    });

    mouseCursor.addEventListener('mouseleave', () => {
      setCounting(false);
      count = 10;
      console.log("mouseleave")
    });

    mouseCursor.addEventListener("mouseup", () => {
      count = 10;
      setClicked(true);
    });

    increment();
  },[counting]);

  const FinishedClicking = (el) => {
   
    console.log("finished clicking");

    var mouseUp = new MouseEvent('mouseup', {
        'view': window,
        'bubbles': true,
        'cancelable': true,
        'screenX': x,
        'screenY': y
    });

    el.dispatchEvent(mouseUp);
  }


  //updates 20 times a second, after 30 updates (1.5 seconds) the counter is reset.
  var count = 10;

  const increment = () => {
    const mouseCursor = document.getElementById('cursor');
    x = mouseCursor.getBoundingClientRect().left;
    y = mouseCursor.getBoundingClientRect().top;

    if (count >= 25 && !clicked)
    {
      ClickElementAtPosition(x,y);
      FinishedClicking(mouseCursor);
    }
    
    if (mouseCursor && mouseCursor.style)
    {
      mouseCursor.style.height = String(count) + "px";
      mouseCursor.style.width = String(count) + "px";
    }

    if (document.elementFromPoint( Math.trunc(x), Math.trunc(y) ) &&
        document.elementFromPoint( Math.trunc(x), Math.trunc(y) ).classList.contains('interactable'))
    {
      console.log((count += 1));
    }

    if (counting) setTimeout(increment, 50);
  }
  

  return (
    <>
    <Cursor id="cursor" ref={cursorRef} alt=""></Cursor>

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
            pointerEvents: "none"
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
