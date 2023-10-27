import React from 'react';
import './scraperFrame.css';
import { Card, CardContent } from '@mui/material';


function ScraperTextFrame(props) {
  return (
    <div className='scrapercontainer'>
    <div className='h1container'>
      <h1 className='h1textStyle'>Scraper's work for </h1>
     {props&&<h2 className='urlText'>{props?.url} :-</h2>} 
    </div>

    {props.analyzerData&&props?.analyzerData.pages[0]?.description && 
      <Card className='cardStyle'>
        <CardContent className='cardContentStyle'>
          <u><i>Description</i></u>: {props?.analyzerData.pages[0].description}
        </CardContent>
      </Card>
    }
   
   <div style={{ color: "white", textAlign: "center", background: "transparent", width: "97%", padding: "2px", broder: "20px solid white" }}>
      <h4 style={{textAlign: "center", marginTop: "1%" }}> Scraped Content </h4>
      </div>
    <div className='scraperData'>
      <p>{props?.scraperData?.scrapedContent}</p>
    </div>
  </div>
  );
}
export default ScraperTextFrame;
