import React, { useState, useEffect, useRef } from 'react';

import axios from 'axios'; // Import Axios for making HTTP requests
import './camera.css'; // Import CSS file for styling

const CameraInterface = () => {
  const [stream, setStream] = useState(null);
  const [error, setError] = useState(null);
  const [recording, setRecording] = useState(false);
  const videoRef = useRef();
  const mediaRecorder = useRef(null);
  const recordedChunks = useRef([]);

  useEffect(() => {
    const enableCamera = async () => {
      try {
        const userMediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
        setStream(userMediaStream);
      } catch (err) {
        setError('Failed to access camera. Please check your browser settings.');
        console.error('Error accessing camera:', err);
      }
    };

    enableCamera();

    // Cleanup function to stop the video stream when the component unmounts
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    if (stream && videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  const startRecording = () => {
    recordedChunks.current = [];
    mediaRecorder.current = new MediaRecorder(stream, { mimeType: 'video/mp4;codecs=H.264' });
  
    mediaRecorder.current.ondataavailable = event => {
      if (event.data.size > 0) {
        recordedChunks.current.push(event.data);
      }
    };
  
    mediaRecorder.current.onstop = () => {
      const blob = new Blob(recordedChunks.current, { type: 'video/mp4' });
      const formData = new FormData();
      formData.append('video', blob, 'recorded-video.mp4');
  
      // Replace 'YOUR_API_ENDPOINT' with your actual API endpoint
      axios.post('localhost:8000/video', formData)
        .then(response => {
          console.log('Video uploaded successfully:', response);
        })
        .catch(error => {
          console.error('Error uploading video:', error);
        });
    };
  
    mediaRecorder.current.start();
    setRecording(true);
  };

  const stopRecording = () => {
    if (mediaRecorder.current && mediaRecorder.current.state === 'recording') {
      mediaRecorder.current.stop();
      setRecording(false);
    }
  };

  return (
    <div>
      <h2>ASL Translation</h2>
      {error && <p>{error}</p>}
      {stream && (
        <div>
          <video ref={videoRef} autoPlay playsInline muted />
          <div>
            {recording ? (
              <button onClick={stopRecording}>Stop Recording</button>
            ) : (
              <button onClick={startRecording}>Start Recording</button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CameraInterface;
