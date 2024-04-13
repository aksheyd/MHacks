import React from 'react';
import ReactDOM from 'react-dom';
import CameraInterface from './camera';
import ResponseInterface from './response';
import './styles.css'; // Import CSS file for styling

const App = () => {
  return (
    <React.StrictMode>
      <CameraInterface/>
    </React.StrictMode>
    
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
