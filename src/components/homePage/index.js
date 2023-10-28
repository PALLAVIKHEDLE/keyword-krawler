import React, { useState, useEffect } from "react";
import "./index.css";
import ScraperTextFrame from "./scraperTextFrame";
import "./animation.css";
import html2pdf from "html2pdf.js";
import scraperText from "../../api/scraperText";
import MultiAlgoComparision from "../../api/multiAlgo";
import keywordList from "../../api/keyword";
import KeywordListFrame from "./keywordListFrame";
import AlgoComparision from "./algoComparision";
import TableComponent from "./recommendationTableComponent";
import RecommendationList from "../../api/recommendation";
import AnalyzerList from "../../api/analyzer";
import InsightTable from "./inSight";
import WordCloud from "./wordCloud";

function HomePage() {
  const [urlInput, setUrlInput] = useState("");
  const [selectedAlgorithm, setSelectedAlgorithm] = useState("suffix_array");
  const [loading, setLoading] = useState(false);
  const [scraperData, setScraperData] = useState("");
  const [keywordListData, setKeywordListData] = useState("");
  const [multialgo, setMultialgo] = useState("");
  const [recommendationListData, setRecommendationListData] = useState("");
  const [analyzerData, setAnalyzerData] = useState("");
  const [scrollPosition, setScrollPosition] = useState(0);
  const [scrollUp, setScrollUp] = useState(false);
  const [resetScroll, setResetScroll] = useState(false);
  const [started, setStarted] = useState(false);

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
    setUrlInput(event.target.value);
  };

  const handleAlgorithmChange = (event) => {
    setSelectedAlgorithm(event.target.value);
  };

  const handleDownload = () => {
    window.print();
  };

  const handleScrollUp = () => {
    setScrollUp(true);
    setResetScroll(true);
  };

  const handleSubmit = () => {
    setStarted(true);
    setScraperData("");
    setKeywordListData("");
    setMultialgo("");
    setRecommendationListData("");
    setAnalyzerData("");
    setLoading(true);

    if (urlInput.trim() === "") {
      setScraperData("");
      setKeywordListData("");
      setMultialgo("");
      setRecommendationListData("");
      setAnalyzerData("");
      setLoading(false);
      alert("Please enter a URL");

      window.location.reload();

      return;
    }

    const payload = {
      url: urlInput,
      algoChoice: selectedAlgorithm,
    };

    console.log("Form submitted:", payload);
    const scraperTextData = scraperText(payload);
    scraperTextData
      .then((response) => setScraperData(response))
      .catch((error) => {
        console.error("API error:", error);
      })
      .finally(() => {
        console.log("Finalised");
        setLoading(false);
      });

    const keywordListData = keywordList(payload);

    keywordListData
      .then((response) => {
        setKeywordListData(response)
      
        const multialgoComparision = MultiAlgoComparision(payload);
        multialgoComparision
          .then((response) => setMultialgo(response))
          .catch((error) => {
            console.error("API error:", error);
          })
          .finally(() => {
            setLoading(false);
          });
      })
      .catch((error) => {
        console.error("API error:", error);
      })
      .finally(() => {
        console.log("Finalised");
      });
    const recommendationList = RecommendationList(payload);
    recommendationList
      .then((response) => setRecommendationListData(response))
      .catch((error) => {
        console.error("API error:", error);
      })
      .finally(() => {
        console.log("Finalised");
      });



    const urlAnalyzerData = AnalyzerList(payload);
    urlAnalyzerData
      .then((response) => setAnalyzerData(response))
      .catch((error) => {
        console.error("API error:", error);
      })
      .finally(() => {
        console.log("Finalised");
      });
  };

  return (
    <div
      id="pdf-container"
      className={`container ${scrollUp ? "move-up" : ""}`}
    >
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
        <button
          className="centeredButton"
          onClick={() => {
            handleSubmit();
            handleScrollUp();
          }}
        >
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
      {scraperData && scraperData !== "" && (
        <ScraperTextFrame
          url={urlInput}
          scraperData={scraperData}
          analyzerData={analyzerData}
        />
      )}


      {   started && !keywordListData && (

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

      )}

      {scraperData && keywordListData && (
        <KeywordListFrame keywordListData={keywordListData} />
      )}


        { started && !recommendationListData && (

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

        )}

      {scraperData && keywordListData && recommendationListData && (
        <div
          style={{
            color: "white",
            textAlign: "center",
            background: "transparent",
            width: "97%",
            padding: "2px",
            broder: "20px solid white",
          }}
        >
          <h4 style={{ textAlign: "center", marginTop: "1%" }}>
            {" "}
            Krawler's Important Notes{" "}
          </h4>
        </div>
      )}
      { scraperData && keywordListData && recommendationListData && analyzerData && (
      <div style={{ display: "flex", flexDirection: "row", width: "90%" }}>
        <div style={{ width: "45%", minHeight: "60vw", maxHeigh: "60vw" }}>

            <TableComponent recommendationListData={recommendationListData} />

        </div>
        <div style={{ width: "55%" }}>
          <div style={{ maxHeight: "40vw", width: "100%", overflow: "auto" }}>

              <InsightTable analyzerData={analyzerData} />

          </div>
          <div
            style={{
              maxHeight: "20vw",
              minHeight: "20vw",
              width: "100%",
              marginLeft: "2%",
              marginTop: "1%",
            }}
          >

              <WordCloud analyzerData={analyzerData} />

          </div>
        </div>
      </div>
      )}
      { started &&  !keywordListData && !multialgo && (

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

        )}

      {scraperData &&
        keywordListData &&
        multialgo &&
        recommendationListData && <AlgoComparision multialgo={multialgo} />}
    </div>
  );
}

export default HomePage;
