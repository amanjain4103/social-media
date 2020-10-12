import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDNALNHXJuRFyKpKhpAAc1Omux6OsHt3sg",
    authDomain: "social-media-d971a.firebaseapp.com",
    databaseURL: "https://social-media-d971a.firebaseio.com",
    projectId: "social-media-d971a",
    storageBucket: "social-media-d971a.appspot.com",
    messagingSenderId: "81672177755",
    appId: "1:81672177755:web:59d6d900a5ab5b9467177e",
    measurementId: "G-0MH9LTHSMM"
  };
firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
export default storage;