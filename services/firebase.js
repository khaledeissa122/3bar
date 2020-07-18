import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyC2ls_VugpYygJT3Uyrko2bLfWY9yBtBks",
  authDomain: "bar-6e9a5.firebaseapp.com",
  databaseURL: "https://bar-6e9a5.firebaseio.com",
  projectId: "bar-6e9a5",
  storageBucket: "bar-6e9a5.appspot.com",
  messagingSenderId: "500609551539",
  appId: "1:500609551539:web:0480d01874630a67ebf4c6",
  measurementId: "G-6XY0C2DEQZ"
};

!firebase.apps.length ? firebase.initializeApp(config) : "";

export const auth = firebase.auth();
export const providerAuth = firebase.auth;
export const db = firebase.firestore();
export const update = firebase;
export const storage = firebase.storage();
export const storageByChange = firebase.storage;
