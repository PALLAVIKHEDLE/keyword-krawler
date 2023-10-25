import React, { useState, useEffect } from "react";
import "./index.css";
import ScraperTextFrame from "./scraperTextFrame";
import "./animation.css"
import html2pdf from 'html2pdf.js';
import scraperText from '../../api/scraperText';
import MultiAlgoComparision from "../../api/multiAlgo";
import keywordList from "../../api/keyword";
import KeywordListFrame from './keywordListFrame'
import AlgoComparision from './algoComparision'

function HomePage() {
  const [urlInput, setUrlInput] = useState("");
  const [selectedAlgorithm, setSelectedAlgorithm] = useState("robinkarp");
  const [loading, setLoading] = useState(false);
  const [scraperData, setScraperData] = useState("");
  const [keywordListData, setKeywordListData] = useState("");

  const [multialgo, setMultialgo] = useState("");

  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const container = document.getElementById("pdf-container");

    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  
  
  

  const handleUrlChange = (event) => {
    setUrlInput(event.target.value);
  };

  const handleAlgorithmChange = (event) => {
    setSelectedAlgorithm(event.target.value);
  };

  const handleDownload = () => {
     // const element = document.getElementById('pdf-container'); 
    // html2pdf(element);
    window.print();
  };

  const handleSubmit = () => {
    setLoading(true);

    if (urlInput.trim() === "") {
      alert("Please enter a URL");
      return;
    }

    const payload = {
      url: urlInput,
      algorithm: selectedAlgorithm,
    };

    console.log("Form submitted:", payload);
    const scraperTextData= scraperText(payload)
    scraperTextData.then((response)=>
     setScraperData(response))
      .catch(error => {
        console.error('API error:', error);
      })
      .finally(() => {
        setLoading(false);
      });

    const keywordListData= keywordList(payload)

    keywordListData.then((response)=>
    setKeywordListData(response))
     .catch(error => {
       console.error('API error:', error);
     })
     .finally(() => {
       setLoading(false);
     });


    const multialgoComparision= MultiAlgoComparision(payload)
    multialgoComparision.then((response)=>
    setMultialgo(response))
     .catch(error => {
       console.error('API error:', error);
     })
     .finally(() => {
       setLoading(false);
     });
  };

  return (
    <div id="pdf-container" className={`container ${!loading && scrollPosition > 200 ? 'move-up' : ''}`}>
         <div>
        <h1   className="textStyle">Keyword-Krawler</h1>
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
          Krawl
        </button>
        {loading && (
          <div className="upwards-transition">
            <div className="center">
              <div className="wave"></div>
              <div className="wave"></div>
              <div className="wave"></div>
              <div className="wave"></div>
              <div className="wave"></div>
              <div className="wave"></div>
              <div className="wave"></div>
              <div className="wave"></div>
              <div className="wave"></div>
              <div className="wave"></div>
            </div>
          </div>
        )}
        {scraperData && <ScraperTextFrame url={urlInput}  scraperData={scraperData}/>}
        {keywordListData&& <KeywordListFrame keywordListData={keywordListData}/>}
        {multialgo &&<AlgoComparision multialgo={multialgo}/>}

        {/* <button className="downloadButton" onClick={handleDownload}>
          Download
        </button> */}
      </div>
    </div>
  );
}

export default HomePage;
