import React from 'react';
import './nextFrame.css';

function NextFrame(props) {
  console.log('props', props);
  return (
    <div className='scrapercontainer'>
      <h1 className='h1textStyle'>Scraper context for {props.url}</h1>
      <div className='scraperData'>
        <p className='scrollable'>{props.scraperData.scrapedContent}</p>
      </div>
    </div>
  );
}

export default NextFrame;
