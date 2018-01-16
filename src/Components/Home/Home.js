import React, { Component } from 'react'
import Header from '../Header/Header';
import axios from 'axios';
import './Home.css';
import Masonry from 'react-masonry-component';
import Grid from 'react-grid-layout';




class Home extends Component {
    constructor() {
        super()
        this.state = {
            contents: [],
        }
    }

    componentDidMount(){
        axios.get('/home').then(response => {
            let res = response.data.ListBucketResult.Contents
            // console.log(array)
            this.setState({
                contents: res
            })
        })
        
    }
       
    

    render() {
        const {contents} = this.state;
        console.log(contents)
        // const mapped = contents.map((elem, i) => {
        //     return elem.Key
        // })
        // console.log(mapped)
        return (
            <div>
                <Header />
                <h1>HomePage</h1>
                <Grid>
                {contents.map((elem, i) => {
                    return (
                        <div key={i}>
                            <img src={`https://s3-us-west-1.amazonaws.com/seize-the-dream/${elem.Key}`} alt='display' className='image'/>
                
                        </div>
                    )
                })}
                </Grid>
                {/* <img src="https://s3-us-west-1.amazonaws.com/seize-the-dream/rock-3081950_1920.jpg" alt='yes' /> */}
            </div>
        )
    }
}


export default Home;
