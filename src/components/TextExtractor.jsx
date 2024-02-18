import React, { useEffect, useState } from 'react';
import { createWorker } from 'tesseract.js';

const TextExtractor = ({ image }) => {
  const [recognizedText, setRecognizedText] = useState('');

  const TeseractTextRecogniser= async()=>{
    const worker = await createWorker('eng');
      await worker.setParameters({
        tessedit_char_whitelist: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-/ ',
        user_defined_dpi: '300',
        // preserve_interword_spaces: '0',
      });
      const ret = await worker.recognize(
        image,
        { rotateAuto: true },
        { imageColor: true, imageGrey: true, imageBinary: true }
      );
      setRecognizedText(ret.data.text);
      console.log(ret);
  };


  useEffect(() => {
    TeseractTextRecogniser();
  }, [image]);

  return (
    <div>
      <h2>Recognized Text:</h2>
      <p>{recognizedText}</p>
    </div>
  );
};

export default TextExtractor;
