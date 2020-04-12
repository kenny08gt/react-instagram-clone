import React, { Component, render } from "react";
import "./post.scss";
import firebase from "../firebase";

export default class Post extends Component {
  constructor(props) {
    super();
    this.state = { 
      url: props.post.image
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

  render() {
    let post = this.props.post;
    let url = this.state.url;
    return (
      <div className="single-post">
        <h2>{post.title}</h2>
        <div
          className="main-image"
          style={{ backgroundImage: `url(${url})` }}
        />
        <hr />
      </div>
    );
  }
}
