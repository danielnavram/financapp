import {auth, firestore, storage, initializeApp} from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCM_8wZhPXhHKpbhJfj5jzrLIsIW41UKRg",
  authDomain: "fidapp-3cd6f.firebaseapp.com",
  databaseURL: "https://fidapp-3cd6f.firebaseio.com",
  projectId: "fidapp-3cd6f",
  storageBucket: "fidapp-3cd6f.appspot.com",
  messagingSenderId: "892765148176",
  appId: "1:892765148176:web:943bec29c8aadca99ce695",
  measurementId: "G-MKZ7B20V6M",
};

initializeApp(firebaseConfig);

// Establece el auth para mejorias en lectura
export const AUTH = auth();
export const DB = firestore();
export const STORAGE = storage();
export const STORAGEREF = STORAGE.ref();
