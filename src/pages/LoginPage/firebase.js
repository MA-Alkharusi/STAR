import firebase from "firebase/compat/app"
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const app = firebase.initializeApp({
  apiKey: 'AIzaSyAsHE57C9OM6exQ7wujYTik_UqjwA3KaB0',
  authDomain: 'auth-development-c2718.firebaseapp.com',

  projectId: 'auth-development-c2718',
  storageBucket: 'auth-development-c2718.appspot.com',
  messagingSenderId:'613852807978',
  appId:'1:613852807978:web:5cbd33a604d10dc6379453'
})

export const auth = app.auth()
export default app