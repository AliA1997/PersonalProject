import React, { Component } from "react";
import Header from "../Header/Header";
import axios from "axios";
import "./Home.css";
// import url from "../Url";
import Masonry from 'react-masonry-component';
// import Grid from "react-grid-layout";
// import Upload from "../Upload/Upload";
import {connect} from 'react-redux';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      contents: [],
      messages: [],
      text: ""
    };
    // this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    // this.allowEdit = this.allowEdit.bind(this);
    // this.createMessage = this.createMessage.bind(this);
    // this.editMessage = this.editMessage.bind(this);
  }

  componentDidMount(){
    const {id} = this.props.user
    axios.get(`/home/${id}`).then(response => {
      const image = response.data;
      // const text = image.map(elem => {
      //   return elem.image_text
      // })
      // const images = image.map(elem =>{
      //   return elem.image_url
      // })
      // console.log(images);
      this.setState({
        contents: image
      })
    })
  }

  // componentDidMount() {
  //   axios.get("/home").then(response => {
  //     let res = response.data.ListBucketResult.Contents;
  //     // console.log(array)
  //     this.setState({
  //       contents: res
  //     });
  //   });
  // }
    // axios.get("/home").then(response =>{
    //     this.setState({
    //         contents: response.data
    //     })
    // })

  handleChange(event) {
    this.setState({ text: event.target.value });
  }

//   createMessage(event) {
//     const { text } = this.state;
//     if (event.key === "Enter" && text.length !== 0) {
//       axios.post(url).then(response => {
//         this.setState({ messages: response.data });
//       });

//       this.setState({ text: "" });
//     }
//   }

//   editMessage(id, text) {
//     axios.put(`${url}?id=${id}`, { text }).then(response => {
//       this.setState({ messages: response.data });
//     });
//   }

//   handleClick() {
//     const { contents } = this.state;
//     //  contents.map(elem => {
//     //      if(elem === )
//     //  })
//     console.log(contents);
//     //  this.props.history.push('/uploaddream');
//     // console.log('clicked')
//   }

// allowEdit(){
//   this.props.history.push('/alterdream');

// }

imageClick(){

}

  render() {
    console.log('state', this.state.contents)
    return (
      <div>
        <Header />
        <h1>HomePage</h1>
        {/* <textarea
          className="dream-input"
          onKeyPress={this.createMessage}
          onChange={this.handleChange}
          value={this.state.text}
        />
        <br />
        <div className="text">{this.state.text}</div> */}
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
                 <h2 className='image-text'><span>{elem.image_text}</span></h2>
              </div>
            );
          })}
        </Masonry> 
      </div>
    );
}
}

function mapStateToProps(state){
  console.log(state)
  return {
    user: state.user
  }
}

{/* <button onClick={this.handleClick}><img src={elem} alt="display" className='image' /></button> */}

 {/* <button onClick={this.allowEdit}><img
                    key="c"
                    src={`https://s3-us-west-1.amazonaws.com/seize-the-dream/${
                      elem.Key
                    }`}
                    alt="display"
                    className="image"
                    data-grid={{ x: 4, y: 0, w: 1, h: 2 }}
                  /></button> */}

export default connect(mapStateToProps)(Home);


