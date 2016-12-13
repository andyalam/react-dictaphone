import React, { Component } from 'react';

export default class Recorder extends Component {
  constructor() {
    super();
  }

  visualize(stream, audioCtx, canvas) {
    var source = audioCtx.createMediaStreamSource(stream);

    var analyser = audioCtx.createAnalyser();
    analyser.fftSize = 2048;
    var bufferLength = analyser.frequencyBinCount;
    var dataArray = new Uint8Array(bufferLength);

    source.connect(analyser);
    //analyser.connect(audioCtx.destination);

    const WIDTH = canvas.width;
    const HEIGHT = canvas.height;

    draw()

    function draw() {
      var canvasCtx = canvas.getContext("2d");

      requestAnimationFrame(draw);

      analyser.getByteTimeDomainData(dataArray);

      canvasCtx.fillStyle = 'rgb(200, 200, 200)';
      canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

      canvasCtx.lineWidth = 2;
      canvasCtx.strokeStyle = 'rgb(0, 0, 0)';

      canvasCtx.beginPath();

      var sliceWidth = WIDTH * 1.0 / bufferLength;
      var x = 0;


      for(var i = 0; i < bufferLength; i++) {

        var v = dataArray[i] / 128.0;
        var y = v * HEIGHT/2;

        if(i === 0) {
          canvasCtx.moveTo(x, y);
        } else {
          canvasCtx.lineTo(x, y);
        }

        x += sliceWidth;
      }

      canvasCtx.lineTo(canvas.width, canvas.height/2);
      canvasCtx.stroke();

    }
  }

  componentDidMount() {
    navigator.getUserMedia = ( navigator.getUserMedia ||
                           navigator.webkitGetUserMedia ||
                           navigator.mozGetUserMedia ||
                           navigator.msGetUserMedia);

    const canvas = this.refs.canvas;
    var audioCtx = new (window.AudioContext || webkitAudioContext)();

    if (navigator.getUserMedia) {
      console.log('getUserMedia supported.');

      var constraints = { audio: true };
      var chunks = [];

      var onSuccess = function(stream) {
        var mediaRecorder = new MediaRecorder(stream);

        this.visualize(stream, audioCtx, canvas);
      }

      var onError = function(err) {
        console.log('The following error occured: ' + err);
      }

      navigator.getUserMedia(constraints, onSuccess.bind(this), onError);
    } else {
       console.log('getUserMedia not supported on your browser!');
    }
  }

  recordOnClick() {
    mediaRecorder.start();
    console.log(mediaRecorder.state);
    console.log("recorder started");
    record.style.background = "red";

    stop.disabled = false;
    record.disabled = true;
  }

  stopOnClick() {
    mediaRecorder.stop();
    console.log(mediaRecorder.state);
    console.log("recorder stopped");
    record.style.background = "";
    record.style.color = "";
    // mediaRecorder.requestData();

    stop.disabled = true;
    record.disabled = false;
  }

  mediaRecorderOnStop() {
    console.log("data available after MediaRecorder.stop() called.");

    var clipName = prompt('Enter a name for your sound clip?','My unnamed clip');
    console.log(clipName);
    var clipContainer = document.createElement('article');
    var clipLabel = document.createElement('p');
    var audio = document.createElement('audio');
    var deleteButton = document.createElement('button');

    clipContainer.classList.add('clip');
    audio.setAttribute('controls', '');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'delete';

    if(clipName === null) {
      clipLabel.textContent = 'My unnamed clip';
    } else {
      clipLabel.textContent = clipName;
    }

    clipContainer.appendChild(audio);
    clipContainer.appendChild(clipLabel);
    clipContainer.appendChild(deleteButton);
    soundClips.appendChild(clipContainer);

    audio.controls = true;
    var blob = new Blob(chunks, { 'type' : 'audio/ogg; codecs=opus' });
    chunks = [];
    var audioURL = window.URL.createObjectURL(blob);
    audio.src = audioURL;
    console.log("recorder stopped");

    deleteButton.onclick = function(e) {
      evtTgt = e.target;
      evtTgt.parentNode.parentNode.removeChild(evtTgt.parentNode);
    }

    clipLabel.onclick = function() {
      var existingName = clipLabel.textContent;
      var newClipName = prompt('Enter a new name for your sound clip?');
      if(newClipName === null) {
        clipLabel.textContent = existingName;
      } else {
        clipLabel.textContent = newClipName;
      }
    }
  }

  mediaRecorderOnDataAvailable() {
    chunks.push(e.data);
  }

  render() {
    return (
      <section className="main-controls">
        <canvas ref="canvas" className="visualizer"></canvas>
        <div id="buttons">
          <button className="record" onClick={this.recordOnClick} >Record</button>
          <button className="stop" onClick={this.stopOnClick} >Stop</button>
        </div>
      </section>
    );
  }
}
