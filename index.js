import React, { Component } from "react";
import { render } from "react-dom";
import Post from "./components/Post";
import "./styles/index.scss";
import firebase from "./firebase";

class App extends Component {
  constructor() {
    super();
    this.posts = [];
  }

  getInitData = () => {
    let posts = [];
    const posts_ref = firebase.database().ref("posts");
    posts_ref.on("value", snapshot => {
      let items = snapshot.val();
      for (let item in items) {
        let post = items[item];
        posts.push(post.post);
      }
      this.forceUpdate();
    });

    this.posts = posts;
  };

  newPost = () => {
    console.log("hey new post!");
    const storage = firebase.storage();
    let dateToInsert = new Date().getTime();
    let metadata = {
      contentType: "image/jpeg"
    };
    // Create a root reference
    var storageRef = storage.ref("posts/" + dateToInsert + ".jpeg");
    console.log(storageRef);

    this.toDataUrl("https://picsum.photos/200/300", result => {
      console.log(result);
      let uploadTask = storageRef.putString(result);

      uploadTask.on(
        firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
        function(snapshot) {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          var progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
              console.log("Upload is paused");
              break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
              console.log("Upload is running");
              break;
          }
        },
        function(error) {
          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          switch (error.code) {
            case "storage/unauthorized":
              // User doesn't have permission to access the object
              console.error("unauthorized");
              break;

            case "storage/canceled":
              // User canceled the upload
              console.error("canceled");
              break;

            case "storage/unknown":
              // Unknown error occurred, inspect error.serverResponse
              console.error("unknown");
              break;
          }
        },
        function() {
          // Upload completed successfully, now we can get the download URL
          uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
            console.log("File available at", downloadURL);
            var post = { title: dateToInsert, image: downloadURL };
            firebase
              .database()
              .ref("posts/" + dateToInsert)
              .set({
                post
              });
          });
        }
      );
    });
  };

  rendersPosts = () => {
    console.log("render posts");
    let posts_render = [];
    for (let key in this.posts) {
      let post = this.posts[key];
      posts_render.push(<Post key={key} post={post} />);
    }
    return posts_render;
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
    return (
      <div>
        {this.rendersPosts()}
        <div className="new-post" onClick={this.newPost}>
          +
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.getInitData();
  }
}

render(<App />, document.getElementById("root"));
