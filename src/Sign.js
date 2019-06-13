import React, { Component } from "react";
import firebase from "firebase";
import AuthLogIn from "./AuthLogIn";

class Sign extends Component {
  state = {
    email: "",
    password: ""
  };

  handleChange = event => {
    this.setState({
      [event.currentTarget.name]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    if (this.props.isSignUp) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
    } else {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
    }
  };

  render() {
    const title = this.props.isSignUp ? "Sign up" : "Sign in";

    return (
      <AuthLogIn>
        <main>
             <h1>{title}</h1> 
            <form onSubmit={this.handleSubmit}>
                E-mail:
                <input
                  id="email"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={this.state.email}
                  onChange={this.handleChange}
                /><br />
                Password:
                <input
                  name="password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={this.state.password}
                  onChange={this.handleChange}
                />
              <button
                type="submit"
              >
                {title}</button>
            </form>
        </main>
      </AuthLogIn>
    );
  }
}

export default Sign;