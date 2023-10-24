import React, { useState } from "react";
import "./index.css";
import NextFrame from "./nextFrame";
import "./animation.css";
import html2pdf from 'html2pdf.js';


function HomePage() {
  const [urlInput, setUrlInput] = useState("");
  const [selectedAlgorithm, setSelectedAlgorithm] = useState("robinkarp");
  const [loading, setLoading] = useState(false);
  const [showTransition, setShowTransition] = useState(false);

  const handleUrlChange = (event) => {
    setUrlInput(event.target.value);
  };

  const handleAlgorithmChange = (event) => {
    setSelectedAlgorithm(event.target.value);
  };

  const handleDownload = () => {
    // const element = document.getElementById('pdf-container'); 
    // html2pdf(element);
    window.print()
   
  };

  
  const handleSubmit = () => {
    if (urlInput.trim() === "") {
      alert("Please enter a URL");
      return;
    }
  
    const payload = {
      url: urlInput,
      algorithm: selectedAlgorithm,
    };
  
    console.log("Form submitted:", payload);
  
    setShowTransition(true);
  
    fetch('http://localhost:8000/api/v1/scraping', {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json', 
      },
      body: JSON.stringify(payload),
    })
      .then(response => response.json())
      .then(data => {
        // Handle the API response
        console.log('API response:', data);
        setLoading(true);
      })
      .catch(error => {
        // Handle errors
        console.error('API error:', error);
      })
      .finally(() => {
        // This block will run regardless of success or error
        setShowTransition(false);
      });
  };
  
  return (
    <div id="pdf-container" className={`container ${showTransition ? "move-up" : ""}`}>
      <div>
        <h1   className="textStyle">Keyword-Krwaler</h1>
        <div className="inputContainer">
          <input
            type="text"
            placeholder="Enter URL..."
            className="textInput"
            value={urlInput}
            onChange={handleUrlChange}
          />
          <select
            className="dropdown"
            value={selectedAlgorithm}
            onChange={handleAlgorithmChange}
          >
            <option value="robinkarp">Robin Karp</option>
            <option value="kmp">Knuth Morris</option>
            <option value="naive">Naive</option>
            <option value="boyremoore">Boyre Moore</option>
          </select>
        </div>
        <button className="centeredButton" onClick={handleSubmit}>
          Crawl
        </button>
        {showTransition && (
          <div className="upwards-transition">
            <div class="center">
              <div class="wave"></div>
              <div class="wave"></div>
              <div class="wave"></div>
              <div class="wave"></div>
              <div class="wave"></div>
              <div class="wave"></div>
              <div class="wave"></div>
              <div class="wave"></div>
              <div class="wave"></div>
              <div class="wave"></div>
            </div>
          </div>
        )}
        {loading && <NextFrame url={urlInput} />}

        <button className="downloadButton" onClick={handleDownload}>
          Download
        </button>
      </div>
    </div>
  );
}

export default HomePage;
