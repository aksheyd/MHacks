import React, { useState, useEffect, useRef } from 'react';

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
    mediaRecorder.current = new MediaRecorder(stream, { mimeType: 'video/webm' });

    mediaRecorder.current.ondataavailable = event => {
      if (event.data.size > 0) {
        recordedChunks.current.push(event.data);
      }
    };

    mediaRecorder.current.onstop = () => {
      const blob = new Blob(recordedChunks.current, { type: 'video/webm' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'recorded-video.webm';
      a.click();
      URL.revokeObjectURL(url);
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
      {error && <p>{error}</p>}
      {stream && (
        <div>
          <p>Camera is enabled:</p>
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
