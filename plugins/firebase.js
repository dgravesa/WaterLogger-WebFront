
// TODO: only import firebase components intended for use (auth)
import firebase from 'firebase';
import firebaseConfig from '../firebase.config';

let app = firebase.apps.length
  ? firebase.app()
  : firebase.initializeApp(firebaseConfig)

export const auth = app.auth();
