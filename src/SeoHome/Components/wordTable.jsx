import React, { Component } from 'react';

import { Card, Col, Row, Table } from 'antd';

const dataSource = [
    {
      key: '1',
      word: 'told1',
      count: 322
    },
    {
      key: '2',
      word: 'thought2',
      count: 422
    },
    {
        key: '3',
        word: 'told4',
        count: 322
      },
      {
        key: '4',
        word: 'thought3',
        count: 422
      },
  ];

  const columns = [
    {
      title: 'Word',
      dataIndex: 'word',
      key: 'word',
    },
    {
      title: 'Count',
      dataIndex: 'count',
      key: 'count',
    },

  ];
  

class WordTable extends React.Component {
    constructor(props) {
        super(props); {
            this.state = {

            }
        }
    }



    render() {
        return (

            <Card style={{ width: 500 ,height: 500}}>
               <Table dataSource={dataSource} columns={columns} />;
            </Card>
        )
    }
}


export default WordTable;