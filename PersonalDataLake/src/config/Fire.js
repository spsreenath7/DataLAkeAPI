import firebase from 'firebase';

var config = {
  apiKey: "AIzaSyAu7hoKNdpXYo8Nga09THNLgslV8T-NeJc",
  authDomain: "my-datalake.firebaseapp.com",
  databaseURL: "https://my-datalake.firebaseio.com",
  projectId: "my-datalake",
  storageBucket: "",
  messagingSenderId: "219231292116"
};

const fire = firebase.initializeApp(config);
export default fire;
