import React, { useEffect, useState } from 'react';
import { useOpenCv } from 'opencv-react';
import TextExtractor from './TextExtractor';
import preprocessImage from './preprocess';


const OpenCVExtractor = ({ base64Image }) => {
  const { loaded, cv } = useOpenCv();
  const [grayscaleImage, setGrayscaleImage] = useState(null);

  useEffect(() => {
    if (loaded && cv && base64Image) {
      imageCovert(base64Image, cv);
    }
  }, [loaded, cv, base64Image]);

  const imageCovert = async (base64Image, cv) => {
    const imgElement = document.createElement('img');
    imgElement.src = base64Image;
    await imgElement.decode(); // Ensure the image is loaded before proceeding

    const canvas = document.createElement('canvas');
    canvas.width = imgElement.width;
    canvas.height = imgElement.height;
    const ctx = canvas.getContext('2d');

    // Adjust canvas size to match image
    ctx.drawImage(imgElement, 0, 0);
    ctx.putImageData(preprocessImage(canvas, 'all'), 0, 0);
    setGrayscaleImage(canvas.toDataURL('image/jpeg'));
  };

  return (
    <div>
      {loaded ? (
        grayscaleImage ? (
          <div>
            <img
              src={grayscaleImage}
              alt="Grayscale"
              // height={500}
              // width={500}
            />
            <TextExtractor image={grayscaleImage} />
          </div>
        ) : (
          <p>Processing...</p>
        )
      ) : (
        <p>Loading OpenCV...</p>
      )}
    </div>
  );
};
export default OpenCVExtractor;
