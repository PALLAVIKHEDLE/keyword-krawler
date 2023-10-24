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
    const element = document.getElementById('pdf-container'); 
    // html2pdf(element);
   
  };

  
  const handleSubmit = () => {
    if (urlInput.trim() === "") {
      alert("Please enter a URL");
      return;
    }

    // Perform the action you want when the form is submitted
    console.log("Form submitted:", {
      url: urlInput,
      algorithm: selectedAlgorithm,
    });
    setShowTransition(true);
    setTimeout(() => {
      setLoading(true);
      setShowTransition(false);
    }, 10000);
  };

  return (
    <div className={`container ${showTransition ? "move-up" : ""}`}>
      <div>
        <h1 id="pdf-container"  className="textStyle">Keyword-Krwaler</h1>
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
