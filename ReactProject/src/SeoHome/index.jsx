import React, { Component } from 'react';
import './index.css';
import InputForm from './Components/inputForm';

import OutputRender from './outputRender';
import GraphCompare from './Components/graphCompare';

class SeoHome extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

            displayLogin: false

        }
    }


    render() {
        return(
            <div className='content'>
                <h1 style={{magin: 'auto'}}>SEO Tool</h1>
                <InputForm/>
                <br/>
                <hr/>
                <br/>
                <OutputRender/>
                <br/>
                <hr/>
                <br/>
                <GraphCompare/>


            </div>
            
        )
    }


}

export default SeoHome

