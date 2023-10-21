import React, { Component } from 'react';

import { Card, Col, Row } from 'antd';

import WordCloud from './Components/wordCloud';
import WordTable from './Components/wordTable';


class OutputRender extends React.Component {
    constructor(props) {
        super(props);
        this.state = {


        }
    }



    render() {
        return (
            <div>

                <Row gutter={16}>
                    <Col span={12}>
                        <WordTable />
                    </Col>

                    <Col span={12}>
                        <WordCloud />

                    </Col>
                </Row>
            </div>

        )
    }
}


export default OutputRender;