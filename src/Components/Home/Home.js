import React, { Component } from "react";
import Header from "../header/Header";
import axios from "axios";
import "../styles/Home.css";
// import url from "../Url";
import Masonry from "react-masonry-component";
import Grid from "react-grid-layout";
// import Upload from "../Upload/Upload";
import { connect } from "react-redux";
import {login} from '../../ducks/reducer';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      contents: [],
      messages: [],
      text: "",
      quote: "",
      grid: false
    };
    this.handleGrid = this.handleGrid.bind(this);
    this.backToMason = this.backToMason.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.showQuote = this.showQuote.bind(this);
  }

  componentDidMount() {
    axios.get('/user-data').then(response => {
      const user = response.data
      this.props.login(response.data)
      axios.get(`/myimages/${user.id}`).then(response => {
        axios.get("/home").then(response => {
          let res = response.data.ListBucketResult.Contents;
          this.setState({
            contents: res
          });
        })
      });
    }).catch(() => {
      this.props.history.push('/')
    });
    // axios.get("/home").then(response => {
    //   let res = response.data.ListBucketResult.Contents;
    //   this.setState({
    //     contents: res
    //   });
    // });
  }
  showQuote(){
    axios.get('/homes').then(response => {
      let q = response.data.contents.quotes[0].quote;
      this.setState({
        quote: q
      })
    })
  }
  handleChange(event) {
    this.setState({ text: event.target.value });
  }

  handleGrid() {
    this.setState({
      grid: true
    });
  }

  backToMason() {
    this.setState({
      grid: false
    });
  }

  render() {
 
    return (
      <div className='component'>
        <Header />
        <div className="home-background">
          {/* <h1>HomePage</h1> */}
          <div className='quote'>
          <button onClick={this.showQuote}>Show Quote</button>
          {this.state.quote ?
          <p><b>Quote of the Day:</b> {this.state.quote}</p> : null}
          </div>
          {/* <textarea
          className="dream-input"
          onKeyPress={this.createMessage}
          onChange={this.handleChange}
          value={this.state.text}
          />
          <br />
          <div className="text">{this.state.text}</div> */}
        <button className='home-btn' onClick={this.handleGrid}>
              Click Here for Drag and Drop
            </button>
            <button className='home-btn' onClick={this.backToMason}>Reset</button>
          <div className="tile-boxes">
            {this.state.grid ? (
              <Grid>
                {this.state.contents.map((elem, i) => {
                  // {console.log('element', elem)}
                  return (
                    <div key={i} className="tiles">
                      <img
                        key="c"
                        src={`https://s3-us-west-1.amazonaws.com/seize-the-dream/${
                          elem.Key
                        }`}
                        alt="display"
                        className="image"
                        data-grid={{ x: 4, y: 0, w: 1, h: 2 }}
                        onClick={this.imageClick}
                      />
                      {/* <img
                    onClick={this.imageClick}
                    src={elem.image_url}
                    alt="display"
                    className="image"
                    data-grid={{ x: 4, y: 0, w: 1, h: 2 }}
                  />
                 <h2 className='image-text'><span>{elem.image_text}</span></h2> */}
                    </div>
                  );
                })}
              </Grid>
            ) : (
              <Masonry>
                {this.state.contents.map((elem, i) => {
                  // {console.log('element', elem)}
                  return (
                    <div key={i} className="tiles">
                      <img
                        key="c"
                        src={`https://s3-us-west-1.amazonaws.com/seize-the-dream/${
                          elem.Key
                        }`}
                        alt="display"
                        className="image"
                        data-grid={{ x: 4, y: 0, w: 1, h: 2 }}
                        onClick={this.imageClick}
                      />
                      {/* <img
                      onClick={this.imageClick}
                      src={elem.image_url}
                      alt="display"
                      className="image"
                      data-grid={{ x: 4, y: 0, w: 1, h: 2 }}
                    />
                   <h2 className='image-text'><span>{elem.image_text}</span></h2> */}
                    </div>
                  );
                })}
              </Masonry>
            )}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  // console.log(state)
  return {
    user: state.user
  };
}

export default connect(mapStateToProps, {login})(Home);
