import React, { Component } from 'react';

import { Card, Col, Row } from 'antd';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Chart.js Bar Chart',
      },
    },
  };
const data = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: labels.map(() => 100),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

class GraphCompare extends React.Component {


    constructor(props) {
        super(props);
        this.state = {}

        this.handleChange = this.handleChange.bind(this);

    }

    handleChange(e) {
        console.log(e)
    }


    render() {
        return (
            <div>

                <Row gutter={16}>
                    <Col span={24}>
                        <Card title="Comparison" bordered={false}>

                            <Bar
                            options={options}
                            data={data}
                                
                                
                            />
                        </Card>

                    </Col>


                </Row>
            </div>
        )
    }
}



export default GraphCompare;