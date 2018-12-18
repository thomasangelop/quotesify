import firebase from 'firebase/app';
import 'firebase/storage';


// Initialize Firebase
var config = {
   apiKey: "AIzaSyCoy4LWW3B3AACcMPkKnxLE3qoiEdQOF4k",
   authDomain: "traust-poc.firebaseapp.com",
   databaseURL: "https://traust-poc.firebaseio.com",
   projectId: "traust-poc",
   storageBucket: "traust-poc.appspot.com",
   messagingSenderId: "159349695299"
 };
 
 firebase.initializeApp(config);

 const storage = firebase.storage();

 export {
    storage, firebase as default
 }