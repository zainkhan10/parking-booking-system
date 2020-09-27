import * as firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyB-veozlXKd-a43RxLkU1aDpTWrNNq9vhM",
  authDomain: "parking-booking-system-732ef.firebaseapp.com",
  databaseURL: "https://parking-booking-system-732ef.firebaseio.com",
  projectId: "parking-booking-system-732ef",
  storageBucket: "parking-booking-system-732ef.appspot.com",
  messagingSenderId: "547720064600",
  appId: "1:547720064600:web:53ec3c0a5655888f0fe42d",
  measurementId: "G-JN87P7DTBZ",
};
// Initialize Firebase
var fireDb = firebase.initializeApp(firebaseConfig);
firebase.analytics();
export default fireDb;
