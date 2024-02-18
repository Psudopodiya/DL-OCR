import './App.css';
import CustomWebcam from './components/CustomWebcam';
import { OpenCvProvider } from 'opencv-react';
import OpenCVExtractor from './components/OpenCVExtractor';

function App() {
  return (
    <div>
      <OpenCvProvider>
        <CustomWebcam/>
      </OpenCvProvider>
    </div>
  );
}

export default App;

