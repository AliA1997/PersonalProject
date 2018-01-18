import React, { Component } from 'react';
import axios from 'axios';
import Masonry from 'react-masonry-component';
import {connect} from 'react-redux';
import Header from '../Header/Header';
import './Myboard.css';


class Myboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            contents: [],
            imageText: '',
        }
    }
      componentDidMount(props){
          console.log('props', this.props)
    const {id} = this.props.user
    axios.get(`/mydreams/${id}`).then(response => {
        // console.log(response, 'hello')
      const image = response.data;
    //   const text = image.map(elem => {
    //     return elem.image_text
    //   })
    //   const images = image.map(elem =>{
    //     return elem.image_url
    //   })
      console.log(image);
      this.setState({
        contents: image,
        // imageText: text,
      })
    })
  }

  render() {
    // console.log('state', this.state.contents)
    return (
      <div>
        <Header />
          <div className='tile-box'>
        <Masonry>
          {this.state.contents.map((elem, i) => {
            // {console.log('element', elem)}
            return (
              <div key={i} className='tiles'>
            <img
                    onClick={this.imageClick}
                    src={elem.image_url}
                    alt="display"
                    className="image"
                    data-grid={{ x: 4, y: 0, w: 1, h: 2 }}
                  />
                 <h2 className='image-texts'><span>{elem.image_text}</span></h2> 
              </div>
            );
          })}
        </Masonry> 
          </div>
      </div>
    );
}
}

function mapStateToProps(state){
    return {
        user: state.user
    }
}


export default connect(mapStateToProps)(Myboard);
