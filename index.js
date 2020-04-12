import React, { Component } from "react";
import { render } from "react-dom";
import Post from "./components/Post";
import "./styles/index.scss";
import firebase from "./firebase";

class App extends Component {
  constructor() {
    super();
    this.posts = [];
    let dateToInsert = (new Date()).getTime();
    // var post = {title:"Fiat", image:"https://picsum.photos/200/300"}; 
    //  firebase.database().ref('posts/'+ dateToInsert).set({
    //             post
    //         });

    this.getInitData();
  }

  getInitData =  () => { 
    let posts = [];
    const posts_ref = firebase.database().ref('posts');
    posts_ref.on('value', (snapshot) => {
      let items = snapshot.val(); 
      for(let item in items) {
        let post = items[item];
        posts.push(post.post);
      }
    });

    this.posts = posts;
  }

  rendersPosts = () => {
    let posts_render = [];
    for (let key in this.posts) {
      let post = this.posts[key];
      posts_render.push(<Post key={post.id} post={post} />); 
    }
    return posts_render;
  };

  render() {
    return <div>{this.rendersPosts()}</div>;
  }
}

render(<App />, document.getElementById("root"));
