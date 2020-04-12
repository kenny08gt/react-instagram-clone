import React, { Component, render } from "react";
import "./post.scss";

export default class Post extends Component {
  constructor(props) {
    super();
  }

  render() {
    return (
      <div class='single-post'>
        <h2>{this.props.post.title}</h2> 
        <img src={this.props.post.image} />
      </div>
    );
  }
}
