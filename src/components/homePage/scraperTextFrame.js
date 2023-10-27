import React from 'react';
import './scraperFrame.css';
import { Card, CardContent } from '@mui/material';


function ScraperTextFrame(props) {
  console.log('props', props);
  return (
    <div className='scrapercontainer'>
    <div className='h1container'>
      <h1 className='h1textStyle'>Scrapper context for </h1>
     {props&&<h2 className='urlText'>{props?.url}</h2>} 
    </div>

    {props.analyzerData&&props?.analyzerData.pages[0]?.description && 
      <Card className='cardStyle'>
        <CardContent className='cardContentStyle'>
          Description: {props?.analyzerData.pages[0].description}
        </CardContent>
      </Card>
    }
   

    <div className='scraperData'>
      <p>{props?.scraperData?.scrapedContent}</p>
    </div>
  </div>
  );
}
export default ScraperTextFrame;
