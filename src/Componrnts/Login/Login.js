import React, { useContext } from 'react';
import firebase from 'firebase/app';
import "firebase/auth";
import { UserContext } from './../../App';
import firebaseConfig from './firebase.Config';

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}
const Login = () => {

  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  var provider = new firebase.auth.GoogleAuthProvider();
  const handleSignIn = () => {

    firebase.auth().signInWithPopup(provider)
      .then((res) => {

        const { displayName, email, photoURL } = res.user;
        const signedInUser = { name: displayName, email: email, photoURL }

        setLoggedInUser(signedInUser);
        setUserToken();
      })
      .catch((err) => {
        console.log(err);
        console.log(err.message);
      })
  }

  const setUserToken = () => {
    firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function (idToken) {
      sessionStorage.setItem('token', idToken)
    }).catch(function (error) {
      // Handle error
    });
  }
  return (
    <div style={{ textAlign: 'center' }}>
      <h3 className="mt-5">LogIn</h3>
      <button className="btn btn-outline-danger pl-5 pr-5 mt-5" onClick={handleSignIn}>Continue With Google</button>

    </div>
  );
};

export default Login;