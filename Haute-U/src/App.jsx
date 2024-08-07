import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  // State variables to store the uploaded files and analysis results
  const [textureFile, setTextureFile] = useState(null);
  const [toneFile, setToneFile] = useState(null);
  const [textureResult, setTextureResult] = useState('');
  const [toneResult, setToneResult] = useState('');
  const [annotatedImageUrl, setAnnotatedImageUrl] = useState('');

  // Function to handle file input change event
  const handleFileChange = (event, setFile) => {
    setFile(event.target.files[0]);
  };

  // Function to handle skin texture analysis
  const analyzeTexture = async () => {
    if (!textureFile) {
      alert('Please upload an image for texture analysis.');
      return;
    }
    const formData = new FormData();
    formData.append('file', textureFile);
    try {
      const response = await axios.post('http://35.226.35.222:8080/predict_skin_tone', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setTextureResult(`Skin Texture: ${response.data.skin_texture}`);
      setAnnotatedImageUrl(`${response.data.annotated_image_url}?t=${new Date().getTime()}`);
    } catch (error) {
      console.error('Failed to analyze texture:', error);
      alert('Failed to analyze texture. Please try again later.');
    }
  };

  // Function to handle skin tone analysis
  const analyzeTone = async () => {
    if (!toneFile) {
      alert('Please upload an image for tone analysis.');
      return;
    }
    const formData = new FormData();
    formData.append('image', toneFile);
    try {
      const response = await axios.post('http://localhost:5000/predict', formData);
      setToneResult(`Skin Tone: ${response.data.skin_tone}`);
      setAnnotatedImageUrl(`${response.data.annotated_image_url}?t=${new Date().getTime()}`);
    } catch (error) {
      console.error('Failed to analyze tone:', error);
      alert('Failed to analyze tone. Please try again later.');
    }
  };

  return (
    <div className="App">
      <header></header> {/* Placeholder for header section */}

      <section className="section1"></section> {/* Placeholder for first section */}

      <section className="section2">
        <div className="text">
          <h2>Discover Your Perfect Style: Tailored Just for You</h2>
          <p>
            Ever wondered why some outfits make you shine while others fall flat? Our genAI technology not only
            identifies your skin tone but also analyzes your skin texture—be it oily, dry, or somewhere in between.
            By understanding these nuances, our Fashion Playground app offers personalized fashion advice tailored
            to highlight your natural beauty. Imagine having a personal stylist who knows exactly what colors and
            fabrics make you look your best. Say goodbye to guesswork and hello to a wardrobe that feels like it
            was made just for you! Shine bright and look fabulous every day with Haute-U AR.
          </p>
        </div>
        <div className="image">
          <img src="/SEC2.png" alt="Fashion" /> {/* Image for the section */}
        </div>
      </section>

      <section className="section3">
        <div className="analysis-section">
          <h2>Upload for Skin Texture Analysis</h2>
          <ol>
            <li>Upload Your Image: Choose a clear photo of your face or skin.</li>
            <li>Let StyleSense AI Work: Our advanced AI analyzes your skin texture.</li>
            <li>Get Personalized Recommendations: Receive fashion advice tailored just for you.</li>
          </ol>
          <div className="buttons">
            <input type="file" id="uploadTexture" onChange={(e) => handleFileChange(e, setTextureFile)} /> {/* File input for uploading an image */}
            <button onClick={analyzeTexture}>Analyze Skin Texture</button> {/* Button to trigger the analysis */}
          </div>
          <div id="textureResult">{textureResult}</div> {/* Display the analysis result */}
          {annotatedImageUrl && <img src={annotatedImageUrl} alt="Annotated Result" />} {/* Conditionally render the annotated image */}
        </div>
        
        <div className="analysis-section">
          <h2>Upload for Skin Tone Analysis</h2>
          <ol>
            <li>Upload Your Image: Choose a clear photo of your face or skin.</li>
            <li>Let StyleSense AI Work: Our advanced AI analyzes your skin tone.</li>
            <li>Get Personalized Recommendations: Receive fashion advice tailored just for you.</li>
          </ol>
          <div className="buttons">
            <input type="file" id="uploadTone" onChange={(e) => handleFileChange(e, setToneFile)} /> {/* File input for uploading an image */}
            <button onClick={analyzeTone}>Analyze Skin Tone</button> {/* Button to trigger the analysis */}
          </div>
          <div id="toneResult">{toneResult}</div> {/* Display the analysis result */}
        </div>
      </section>
    </div>
  );
}

export default App; // Export the App component as the default export
