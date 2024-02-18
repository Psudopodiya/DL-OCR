import Webcam from 'react-webcam';
import React, { useRef, useState, useCallback, useEffect } from 'react';
import OpenCVExtractor from './OpenCVExtractor';
import TextExtractor from './TextExtractor';

const CustomWebcam = () => {
  const webcamRef = useRef(null); 
  const imageRef = useRef(null);

  const [imgSrc, setImgSrc] = useState('');
  const [imgElement, setImgElement] = useState();

  localStorage.setItem('image', imgSrc);
  //console.log(localStorage.getItem('image'));

  const saveImage = (image) => {
    localStorage.setItem('image', image);
  };

  const capture = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      setImgSrc(imageSrc);
    }
  }, [webcamRef]);

  useEffect(() => {
    if (imageRef.current) {
      setImgElement(imageRef.current);
    }
  }, [imageRef]);

  React.useEffect(() => {
    imgSrc && saveImage(imgSrc);
  }, [imgSrc]);

  const retake = () => {
    setImgSrc('');
  };
  return (
    <div className="container">
      {imgSrc ? (
        <img src={imgSrc} alt="webcam" />
      ) : (
        <>
          <Webcam height={720} width={720} ref={webcamRef} />
      </>
      )}
      <div className="btn-container">
        {imgSrc ? (
          <button onClick={retake}>Retake photo</button>
        ) : (
          <button onClick={capture}>Capture photo</button>
        )}
      </div>
      {/* <OpenCVExtractor base64Image={imgSrc} /> */}
      <TextExtractor image={imgSrc} />
    </div>
  );
};
export default CustomWebcam;
