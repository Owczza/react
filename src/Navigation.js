import React, { Component, Fragment } from "react";
import { NavLink } from "react-router-dom";
import firebase from "firebase";
import SignOut from "./SignOut";

class Navigation extends Component {
  state = {
    user: null
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({
        user
      });
    });
  }
  render() {
    return (
      <div>
        <NavLink to={"/players"}>
          <button>Players</button>
        </NavLink>
        <NavLink to={"/new-players"}>
          <button color="inherit">New Players</button>
        </NavLink>
        {this.state.user ? (
          <Fragment>
            <NavLink to={"/to-do"}>
              <button color="inherit">To Do</button>
            </NavLink>
            <SignOut />
          </Fragment>
        ) : (
          <Fragment>
            <NavLink to={"/sign-in"}>
              <button color="inherit">Sign In</button>
            </NavLink>
            <NavLink to={"/sign-up"}>
              <button color="inherit">Sign Up</button>
            </NavLink>
          </Fragment>
        )}
      </div>
    );
  }
}

export default Navigation;
