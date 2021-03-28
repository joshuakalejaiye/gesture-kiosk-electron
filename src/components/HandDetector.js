import React, { useState, useEffect, useRef } from 'react';
import * as handTrack from 'handtrackjs';

const modelParams = {
    flipHorizontal: true,   // flip e.g for video 
    imageScaleFactor: 0.7,  // reduce input image size for gains in speed.
    maxNumBoxes: 20,        // maximum number of boxes to detect
    iouThreshold: 0.5,      // ioU threshold for non-max suppression
    scoreThreshold: 0.79,    // confidence threshold for predictions.
}

const HandtrackComponent = () => {   

    //get webcam feed
    navigator.getUserMedia = 
    navigator.getUserMedia ||
    navigator.mediaDevices.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.msGetUserMedia;

    //select elements we need to reference
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const cursorRef = useRef(null);
    const contextRef = useRef(null);
    const modelRef = useRef(null);

    //mutable values we need to manipulate
    const initialCursorSize = 10;
    const sizeRef = useRef(initialCursorSize);
    const handPresentRef = useRef(false);
    const [elementIsInteractable, setElement] = useState(true);
    const cursorFrameIncrement = 1;
    const cursorMaxSize = 30;

    //called after every element is rendered and can be referred to
    //loads model and begins animating the cursor
    const AfterRender = () => { 
        contextRef.current = canvasRef.current.getContext('2d');

        handTrack.load(modelParams).then(lmodel => { 
            modelRef.current = lmodel;
        });

        handTrack.startVideo(videoRef.current)
            .then(status => {
                if ( status ) 
                {
                    navigator.getUserMedia({video: {}}, stream => {
                        videoRef.current.srcObject = stream
                        try {
                            runDetection();
                        } catch (err) {
                            console.error(err);                            
                        }
                    }, 
                    err => console.log(err)
                    );
                }
       });
    }

    //detects hands 
    const runDetection = () => {
        modelRef.current.detect(videoRef.current).then(predictions => {
           //modelRef.current.renderPredictions(predictions, canvasRef.current, contextRef.current, videoRef.current);
           const handPresent = predictions.length > 0;
           handPresentRef.current = handPresent;

           if ( handPresent && predictions[0]["score"] > 0.90)
           {
            //x and y values received from model are transformed to allow the cursor to reach all parts of the program
            //these can be finetuned further and would have to be adjusted for different screen sizes
            const xScalar = 3.5;
            const yScalar = 2.7;

            //get coordinates from the model
            const x = predictions[0]["bbox"][0] * xScalar - 400;
            const y = (predictions[0]["bbox"][1] * yScalar) - 400;

            //set the cursor to the appropriate positions
            cursorRef.current.style.transform = `translate(${ x }px, ${ y }px)`;
           }   
        
           //begins the detection loop, moving the cursor based on the position of the hand
           requestAnimationFrame(runDetection);
        });
    }

    const ClickElementAtPosition = (x,y) => {
        
        try {
            var cursorClicked = new MouseEvent('click', {
                'view': window,
                'bubbles': true,
                'cancelable': true,
                'screenX': x,
                'screenY': y
            });
        
            var el = document.elementFromPoint( cursorRef.current.getBoundingClientRect().left, cursorRef.current.getBoundingClientRect().top );
            el.dispatchEvent(cursorClicked);
            console.log(el);
        } catch (err) {
            console.error(err);
        }

    }

    const FinishedClicking = (el) => {
   
        // console.log("finished clicking");
    
        var mouseUp = new MouseEvent('mouseup', {
            'view': window,
            'bubbles': true,
            'cancelable': true,
            'screenX': el.getBoundingClientRect().left,
            'screenY': el.getBoundingClientRect().top
        });
    
        el.dispatchEvent(mouseUp);
    }
    
    const DwellControls = () => { 
     
        //if there is a clickable element below the cursor and the user's hand is being detected
        //the cursor will grow in size by .5px every frame.
        //at a preset maximum size 
        if ( cursorRef.current && document.elementFromPoint( 
                cursorRef.current.getBoundingClientRect().left,
                cursorRef.current.getBoundingClientRect().top) && 
            document.elementFromPoint( 
                cursorRef.current.getBoundingClientRect().left,
                cursorRef.current.getBoundingClientRect().top).classList.contains('interactable') 
             ) //&& handPresentRef.current
        {
            setElement(true);
            cursorRef.current.style.height = String(sizeRef.current) + "px";
            cursorRef.current.style.width = String(sizeRef.current) + "px";
            
            //initial size is 
            sizeRef.current += cursorFrameIncrement;
        }
        else
        {
            setElement(false);
        }

        if (sizeRef.current > cursorMaxSize )
        {
            ClickElementAtPosition(cursorRef.current.getBoundingClientRect().left, cursorRef.current.getBoundingClientRect().top);       
            FinishedClicking(cursorRef.current);  
        } 
        
        // console.log("button is clickable: " + buttonIsInteractable + " , hand is present: " + handPresentRef.current);
    }

    useEffect(() => {
        //after click event mouse up event is sent, this prevents more than one click from occuring.
        cursorRef.current.addEventListener("mouseup", () => {
            sizeRef.current = initialCursorSize;
        });

        AfterRender();
        setInterval(DwellControls, 50);
        
    }, []);

    useEffect( () => {
        console.log(elementIsInteractable);

        if (elementIsInteractable === false && sizeRef.current)
        {
          console.log('size reset');
          sizeRef.current = initialCursorSize;

          cursorRef.current.style.height = String(sizeRef.current) + "px";
          cursorRef.current.style.width = String(sizeRef.current) + "px";
        }
    }, [elementIsInteractable]);

    return (
        <> 
            <div id="cursor" 
            style={{
                zIndex: '1000',
                height: '12px',
                width: '12px',
                border: '2px solid #67daff',
                borderRadius: '50%',
                position: 'absolute',
                pointerEvents: 'none',
                transition: 'ease',
                transform: 'translate(-50%, -50%)'
            }} 
            ref={cursorRef} alt=""></div>

            <video className="video" style={{
                position: 'absolute',
                zIndex: '999',
                height: 100,
                width: 100,
                marginBottom: '3.2rem',
                marginLeft: '1.8rem',
                bottom: 0,
                left: 0,
                pointerEvents: 'none'  }} 
            ref={videoRef}></video>

            <canvas  
            style={{
                position: 'absolute',
                zIndex: '999',
                height: '30vh',
                width: '30vh',
                bottom: 0,
                left: 0,
                pointerEvents: 'none' }} 
            ref={canvasRef}></canvas>
        </>
    );
}

export default HandtrackComponent;