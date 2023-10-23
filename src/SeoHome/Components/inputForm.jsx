import React, { Component } from 'react';

import { Card, Col, Row } from 'antd';
import { Button, Checkbox, Form, Input, Select } from 'antd';




class InputForm extends React.Component {


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
                        <Card title="Input URL" bordered={false}>

                            <Form
                                name="basic"
                                labelCol={{
                                    span: 8,
                                }}
                                wrapperCol={{
                                    span: 16,
                                }}
                                style={{
                                    maxWidth: 600,
                                }}
                                initialValues={{
                                    remember: true,
                                }}
                                onFinish={(e) => { this.props.handleRecommendationClick(e) }}
                                onFinishFailed={this.props.handleLoginFailed}
                                autoComplete="off"
                            >

                                <Form.Item
                                    label="URL"
                                    name="url"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your URL!',
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>


                                <Form.Item
                                    label="Select Algorithm"
                                    name="algo"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please select Algorithm!',
                                        },
                                    ]}
                                >
                                    <Select
                                        defaultValue="RobinKarp"
                                        style={{ width: 400 }}
                                        onChange={this.handleChange}
                                        options={[
                                            { value: 'RobinKarp', label: 'Robin Karp' },
                                            { value: 'KMP', label: 'Knuth Morris ' },
                                            { value: 'Naive', label: 'Naive' },
                                            { value: 'BoyreMoore', label: 'Boyre Moore' },
                                        ]}
                                    />
                                </Form.Item>

                          
                                <Form.Item
                                    wrapperCol={{
                                        offset: 8,
                                        span: 16,
                                    }}
                                >
                                    <Button type="primary" htmlType="submit">
                                        Get Recommendation
                                    </Button>
                                </Form.Item>
                            </Form>

                        </Card>

                    </Col>

                </Row>
            </div>
        )
    }
}



export default InputForm;