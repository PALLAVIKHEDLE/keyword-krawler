import React, { useState, useEffect } from "react";
import "./index.css";
import ScraperTextFrame from "./scraperTextFrame";
import "./animation.css";
import html2pdf from 'html2pdf.js';
import scraperText from '../../api/scraperText';
import MultiAlgoComparision from "../../api/multiAlgo";
import keywordList from "../../api/keyword";
import KeywordListFrame from './keywordListFrame';
import AlgoComparision from './algoComparision';
import TableComponent from './recommendationTableComponent';
import RecommendationList from "../../api/recommendation";
import AnalyzerList from "../../api/analyzer"
import InsightTable from './inSight'

function HomePage() {
  const [urlInput, setUrlInput] = useState("");
  const [selectedAlgorithm, setSelectedAlgorithm] = useState("rabin_karp");
  const [loading, setLoading] = useState(false);
  const [scraperData, setScraperData] = useState("");
  const [keywordListData, setKeywordListData] = useState("");
  const [multialgo, setMultialgo] = useState("");
  const [recommendationListData, setRecommendationListData]=useState('')
  const [analyzerData, setAnalyzerData]= useState("");
  const [scrollPosition, setScrollPosition] = useState(0);
  const [scrollUp, setScrollUp] = useState(false);
  const [resetScroll, setResetScroll] = useState(false);

  useEffect(() => {
    const container = document.getElementById("pdf-container");

    const handleScroll = () => {
      if (resetScroll) {
        setScrollUp(false);
        setResetScroll(false);
      } else {
        setScrollPosition(window.scrollY);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [resetScroll]);

  const handleUrlChange = (event) => {
    const inputValue = event.target.value;
    // if(!inputValue)return false

    // const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;

    // if (urlRegex.test(inputValue) || inputValue === '') {
    //   setUrlInput(inputValue);

    // }
    setUrlInput(event.target.value);
  };

  const handleAlgorithmChange = (event) => {
    setSelectedAlgorithm(event.target.value);
  };

  // const handleDownload = () => {
  //     // const element = document.getElementById('pdf-container'); 
  //   // html2pdf(element);
  //   window.print();
  // };

  const handleScrollUp = () => {
    setScrollUp(true);
    setResetScroll(true);
  };

  const handleSubmit = () => {
    setLoading(true);

    if (urlInput.trim() === "") {
      alert("Please enter a URL");
      return;
    }

    const payload = {
      url: urlInput,
      algoChoice: selectedAlgorithm,
    };

    console.log("Form submitted:", payload);
    const scraperTextData= scraperText(payload);
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
      const recommendationList=RecommendationList(payload);
      recommendationList.then((response) =>
      setRecommendationListData(response))
      .catch(error => {
        console.error('API error:', error);
      })
      .finally(() => {
        setLoading(false);
      });

      
    const multialgoComparision = MultiAlgoComparision(payload);
    multialgoComparision.then((response) =>
      setMultialgo(response))
      .catch(error => {
        console.error('API error:', error);
      })
      .finally(() => {
        setLoading(false);
      });

      const urlAnalyzerData=AnalyzerList(payload)
      urlAnalyzerData.then((response) =>
      setAnalyzerData(response))
      .catch(error => {
        console.error('API error:', error);
      })
      .finally(() => {
        setLoading(false);
      });

  };

  return (
    <div id="pdf-container" className={`container ${scrollUp ? 'move-up' : ''}`}>
      <div>
        <h1 className="textStyle">Keyword-Krawler</h1>
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
            <option value="rabin_karp">Rabin Karp</option>
            <option value="kmp">Knuth Morris</option>
            <option value="naive">Naive</option>
            <option value="suffix_array">Suffix Array</option>
            <option value="suffix_tree">Suffix Tree</option>
          </select>
        </div>
        <button className="centeredButton" onClick={() => { handleSubmit(); handleScrollUp(); }}>
          Krawl
        </button>
      </div>

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
        {scraperData  && <ScraperTextFrame url={urlInput}  scraperData={scraperData} analyzerData={analyzerData}/>}
        {scraperData && keywordListData&& <KeywordListFrame keywordListData={keywordListData}/>}
      
      <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
          <div style={{ width:'40%' }}>
        {scraperData && keywordListData&&recommendationListData && <TableComponent recommendationListData={recommendationListData}/>}
      </div>
      <div style={{ width: '60%' }}>
  <div style={{ height: '15%' }}>
    {scraperData && keywordListData && multialgo && <AlgoComparision multialgo={multialgo} />}
  </div>
  <div style={{ height: '80%', width: '100%', overflow: 'auto' }}>
    {scraperData && analyzerData && <InsightTable analyzerData={analyzerData} />}
  </div>
</div>

    

        {/* <button className="downloadButton" onClick={handleDownload}>
          Download
        </button> */}
      </div>
    </div>
  );
}

export default HomePage;
