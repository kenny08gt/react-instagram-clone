import React, { Component } from "react";
import { render } from "react-dom";
import Hello from "./Hello";
import Post from "./components/Post";
import "./style.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      name: "React"
    };
    this.posts = [
      {
        title: "Title 1",
        image: "https://picsum.photos/200/300"
      }
    ];
  }

  rendersPosts = () => {
    let posts_render = [];
    for (let key in this.posts) {
      let post = this.posts[key];
      posts_render.push(<Post post={post} />);
    }
    return posts_render;
  };

  render() {
    return <div>{this.rendersPosts()}</div>;
  }
}

render(<App />, document.getElementById("root"));
