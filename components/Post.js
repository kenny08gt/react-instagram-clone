import React, { Component, render } from "react";
import "./post.scss";
import firebase from "../firebase";

export default class Post extends Component {
  constructor(props) {
    super();
    this.state = {
      url: props.post.image
    };

    // this.dowloadImage(props.post.image);
  }

  dowloadImage = url => {
    // const storage = firebase.storage();
    // var httpsReference = storage.refFromURL(url);
    // let $this = this;
    // httpsReference.getDownloadURL().then(function(url_new) {
    //   $this.state = {
    //     url: url_new
    //   };
    // });
    let that = this;
    var nuroImage = new Image();
    var request = new XMLHttpRequest();
    request.responseType = "blob";
    request.onload = function() {
      nuroImage.src = URL.createObjectURL(this.response);
      that.setState({
        url: URL.createObjectURL(this.response)
      })
    };
    request.open("GET", url);
    request.send();
  };

  toDataUrl = (url, callback) => {
    var xhr = new XMLHttpRequest();
    xhr.onload = function() {
      var reader = new FileReader();
      reader.onloadend = function() {
        callback(reader.result);
      };
      reader.readAsDataURL(xhr.response);
    };
    xhr.open("GET", url);
    xhr.responseType = "blob";
    xhr.send();
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
        <img src={url} />
        <hr />
      </div>
    );
  }
}
