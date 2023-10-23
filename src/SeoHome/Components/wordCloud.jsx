import React, { Component } from 'react';
import ReactWordcloud from 'react-wordcloud';
import { Card, Col, Row } from 'antd';

const words = [
    {
      text: 'told',
      value: 64,
    },
    {
      text: 'mistake',
      value: 11,
    },
    {
      text: 'thought',
      value: 16,
    },
    {
      text: 'bad',
      value: 17,
    },
    {
        text: 'told1',
        value: 644,
      },
      {
        text: 'mistake1',
        value: 131,
      },
      {
        text: 'thought1',
        value: 162,
      },
      {
        text: 'bad1',
        value: 172,
      },
      {
        text: 'told2',
        value: 4,
      },
      {
        text: 'mistake2',
        value: 111,
      },
      {
        text: 'thought2',
        value: 164,
      },
      {
        text: 'bad2',
        value: 176,
      },
      {
        text: 'told3',
        value: 344,
      },
      {
        text: 'mistake3',
        value: 116,
      },
      {
        text: 'thought3',
        value: 6,
      },
      {
        text: 'bad3',
        value: 170,
      },
  ]

class WordCloud extends React.Component {
    constructor(props) {
        super(props); {
            this.state = {

            }
        }
    }


    render() {
        return (

            <Card style={{ width: 500, height:500 }}>
                <ReactWordcloud words={words} style={{height:'500'}}/>
            </Card>
        )
    }
}


export default WordCloud;