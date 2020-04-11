import React, { Component, render } from "react";

export default class Post extends Component {
  constructor(props) {
    super();
  }

  render() {
    return (
      <div>
        <h2>{this.props.post.title}</h2>
        <img src={this.props.post.image} />
      </div>
    );
  }
}
