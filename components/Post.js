import React, { Component, render } from "react";
import "./post.scss";
import firebase from "../firebase";

export default class Post extends Component {
  constructor(props) {
    super();
    this.state = { 
      url: props.post.image,
      id: props.post.id,
      show: true,
    };

    this.dowloadImage(props.post.image);
  }

  dowloadImage = url => {
    let that = this;
    var request = new XMLHttpRequest();
    // request.responseType = "blob";

    request.onload = function() {
      that.setState({
        url: this.response
      });
    };
    request.open("GET", url);
    request.send();
  };

  delete = () => {
    let post = firebase.database().ref("posts/" + this.state.id);
    const that = this;
    post.remove().then(() => {
      that.setState({
        show: false
      })
    })
    console.log('end of delete');
  }

  render() {
    if(!this.state.show)
      return false;

    let post = this.props.post;
    let url = this.state.url;
    return (
      <div className="single-post">
        <h2>{post.title}</h2>
        <div
          className="main-image"
          style={{ backgroundImage: `url(${url})` }}
        />
        <div className='controls'>
          <button className='btn' onClick={this.delete}>Hide 🚫</button>
        </div>
      </div>
    );
  }
}
