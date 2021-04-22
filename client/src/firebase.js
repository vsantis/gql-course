import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyBKyUf4DUkm0VLYKbqo9NfgxCZ2yzoTV-o',
  authDomain: 'gql-course.firebaseapp.com',
  projectId: 'gql-course',
  // storageBucket: 'gql-course.appspot.com',
  // messagingSenderId: '481774597268',
  appId: '1:481774597268:web:394a132ab123156479b081',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
