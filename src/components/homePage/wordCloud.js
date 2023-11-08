import React,{useMemo} from "react";
import ReactDOM from "react-dom";
import ReactWordcloud from "react-wordcloud";
import { Resizable } from "re-resizable";

import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale.css";



const resizeStyle = {
  border: "solid 2px black",
background:'black'
};

export default function WordCloud({ analyzerData }) {
    const words = useMemo(() => {
        if (analyzerData && analyzerData.pages[0].bigrams) {
          const bigrams = analyzerData.pages[0].bigrams;
          return Object.keys(bigrams).map((text) => ({
            text,
            value: bigrams[text],
          }));
        }
        return [];
      }, [analyzerData]);

    
  return (
    <div>
      <div style={{ color: "black", textAlign: "center", background: "#FABB2E", width: "97%", padding: "2px", broder: "20px solid white" }}>
      <h4 style={{textAlign: "center", marginTop: "1%" }}> Phrase Cloud </h4>
      </div>
      <div style={{ maxHeight: "30vw"}}>
      <Resizable
        defaultSize={{
          width: "90%" ,
          height: "60%"
        }}
        style={resizeStyle}
      >

          <ReactWordcloud words={words} />

      </Resizable>
      </div>
    </div>
  );
}


