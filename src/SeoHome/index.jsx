import React, { Component } from 'react';
import './index.css';
import InputForm from './Components/inputForm';

import OutputRender from './outputRender';
import GraphCompare from './Components/graphCompare';

import { Breadcrumb, Layout, Menu, theme } from 'antd';
const { Header, Content, Footer } = Layout;

class SeoHome extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

            displayLogin: false,
            showOutput: false,
            showGraphCompare : false



        }
    }


    handleRecommendationClick = (currFlag) => {
        this.setState(this.state.showOutput ? { showOutput: false } : { showOutput: true })
    }

    handleCancel = (curFlag) => {
        this.setState(this.state.showOutput ? { showOutput: false } : { showOutput: true })

    }

    handleCompareClick = (currFlag) => {
        console.log("comapre click")
        this.setState(this.state.showGraphCompare ? { showGraphCompare: false } : { showGraphCompare: true })

    }


    render() {
        return (

            <Layout>
                <Header
                    style={{
                        position: 'sticky',
                        top: 0,
                        zIndex: 1,
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    <div className="demo-logo" />
                    {/* <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={['2']}
                        items={new Array(3).fill(null).map((_, index) => ({
                            key: String(index + 1),
                            label: `nav ${index + 1}`,
                        }))}
                    /> */}

                </Header>
                <Content
                    className="site-layout"
                    style={{
                        padding: '0 50px',
                    }}
                >
                    <Breadcrumb
                        style={{
                            margin: '16px 0',
                        }}
                    >
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb>
                    <div
                        style={{
                            padding: 0,
                            minHeight: 0,
                            background: theme.colorBgContainer,
                        }}
                    >

                    </div>


                    <h1>SEO Tool</h1>
                    <InputForm handleRecommendationClick={() => this.handleRecommendationClick(this.state.showOutput)} />

                    <br />
                    <hr />
                    {this.state.showOutput ? <OutputRender
                        handleCancel={() => this.handleCancel(this.state.showOutput)}
                        handleCompareClick={() => this.handleCompareClick(this.state.showGraphCompare)}
                        showGraphCompare={this.state.showGraphCompare}
                    /> : null}
                    <br />
                    {/* <OutputRender/> */}
                    <br />
                    {/* <hr/> */}
                    <br />
                    {/* <GraphCompare/> */}

                </Content>
                <Footer
                    style={{
                        textAlign: 'center',
                    }}
                >
                    Group 5
                </Footer>
            </Layout>










            // <div className='content'>
            //     <h1 style={{magin: 'auto'}}>SEO Tool</h1>
            //     <InputForm/>
            //     <br/>
            //     <hr/>
            //     <br/>
            //     <OutputRender/>
            //     <br/>
            //     <hr/>
            //     <br/>
            //     <GraphCompare/>


            // </div>

        )
    }


}

export default SeoHome

