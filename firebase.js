import firebase from 'firebase'
let firebaseConfig = {
  apiKey: "AIzaSyBAbQHRExvChEGhcpi8eNaZkWHw6QJJk8M",
  authDomain: "insta-clone-794b5.firebaseapp.com",
  databaseURL: "https://insta-clone-794b5.firebaseio.com",
  projectId: "insta-clone-794b5",
  storageBucket: "insta-clone-794b5.appspot.com",
  messagingSenderId: "307950994284",
  appId: "1:307950994284:web:a9e8a8583d956cc5cae949"
  };
firebase.initializeApp(firebaseConfig);
export default firebase; 