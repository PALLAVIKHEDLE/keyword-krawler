import React from 'react';
import './scraperFrame.css';

function ScraperTextFrame(props) {
  return (
    <div className='scrapercontainer'>
      <h1 className='h1textStyle'>Scraper context for {props.url}</h1>
      <div className='scraperData'>
        <p>{props.scraperData.scrapedContent}</p>
      </div>
    </div>
  );
}
export default ScraperTextFrame;