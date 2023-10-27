import React,{useMemo} from "react";
import ReactDOM from "react-dom";
import ReactWordcloud from "react-wordcloud";
import { Resizable } from "re-resizable";

import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale.css";



const resizeStyle = {

  border: "solid 2px white",
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
    
      console.log('cloud', words, analyzerData);
    
  return (
    <div>
    
      <Resizable
        defaultSize={{
          width: 600,
          height: 300
        }}
        style={resizeStyle}
      >
        <div style={{ width: "100%", height: "100%" }}>
          <ReactWordcloud words={words} />
        </div>
      </Resizable>
    </div>
  );
}


