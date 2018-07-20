import firebase from 'firebase';
import firestore from 'firebase/firestore';

const functions = require('firebase-functions');

const config = {
  apiKey: "AIzaSyDcLX8VD8z8521V1i0FywzyklKz70P7rKg",
  authDomain: "product-search-4aa25.firebaseapp.com",
  databaseURL: "https://product-search-4aa25.firebaseio.com",
  projectId: "product-search-4aa25",
  storageBucket: "product-search-4aa25.appspot.com",
  messagingSenderId: "869987483968"
}

const firebaseApp = firebase.initializeApp(config);

firebaseApp.firestore().settings({ timestampsInSnapshots: true });

export default firebaseApp.firestore();

