import firebase from 'firebase';

let firebaseInitialized = false;
let firebaseRootRef;
let firebaseStorageRef;
let firebaseAuth;

const initFirebase = () => {
  firebase.initializeApp({
    apiKey: 'AIzaSyDKmjfJZCtWWboaK-b2qt21x9vlykmPxiM',
    authDomain: 'pic-picker.firebaseapp.com',
    databaseURL: 'https://pic-picker.firebaseio.com',
    projectId: 'pic-picker',
    storageBucket: '',
    messagingSenderId: '918516357382'
  });
  firebaseInitialized = true;
};

export const getFirebaseRef = () => {
  if (!firebaseInitialized) {
    initFirebase();
  }
  if (!firebaseRootRef) {
    firebaseRootRef = firebase.database();
  }

  return firebaseRootRef;
};

export const getFirebaseStorageRef = () => {
  if (!firebaseInitialized) {
    initFirebase();
  }

  if (!firebaseStorageRef) {
    firebaseStorageRef = firebase.storage();
  }

  return firebaseStorageRef;
};

export const getFirebaseAuth = () => {
  if (!firebaseInitialized) {
    initFirebase();
  }

  if (!firebaseAuth) {
    firebaseAuth = firebase.auth();
  }

  return firebaseAuth;
};

export const getGoogleProvider = () => {
  return new firebase.auth.GoogleAuthProvider();
};
