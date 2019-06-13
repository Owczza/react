import React from "react";
import firebase from "firebase";

const SignOut = () => {
  const signOut = () => {
    firebase.auth().signOut();
  };

  return (
    <button color="secondary" onClick={signOut}>
      Sign out
    </button>
  );
};

export default SignOut;
