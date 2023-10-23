import React, { Component } from 'react';

import { Card, Col, Row, Modal } from 'antd';

import WordCloud from './Components/wordCloud';
import WordTable from './Components/wordTable';
import GraphCompare from './Components/graphCompare';


class OutputRender extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
           

        }
    }



    render() {
        return (
            <div>
                <Modal
                    title="Keyword Recommendations"
                    centered
                    open={true}
                    onOk={this.props.handleCompareClick}
                    okText="Compare"
                    onCancel={this.props.handleCancel}
                    width={1000}
                >
                    <Row gutter={16}>
                        <Col span={12}>
                            <WordTable />
                        </Col>

                        <Col span={12}>
                            <WordCloud />

                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            {this.props.showGraphCompare ? <GraphCompare /> : null}
                            
                        </Col>
                    </Row>
                </Modal>


            </div>

        )
    }
}


export default OutputRender;