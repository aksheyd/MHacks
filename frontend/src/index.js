import React from 'react';
import ReactDOM from 'react-dom';
import CameraInterface from './camera';
import ResponseInterface from './response';
import './styles.css'; // Import CSS file for styling

const App = () => {
  return (
    <React.StrictMode>
      <div className="container">
  <div className="left-pane">
    <CameraInterface />
  </div>
  <div className="vertical-line"></div>
  <div className="right-pane">
    <ResponseInterface />
  </div>
</div>
    </React.StrictMode>
    
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
