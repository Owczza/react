import React, { Component, Fragment } from "react";
import firebase from 'firebase'
import "./App.css";
import Players from "./Players.js";
import { Switch, Route } from "react-router-dom";
import Navigation from "./Navigation.js";
import PlayerForm from "./PlayerForm.js";
import ToDo from "./ToDo.js";
import Sign from "./Sign.js";

var config = {
  apiKey: "AIzaSyAMdhBFsbTN6CAjfMqoJuRuLqT2BlvL7Fo",
  authDomain: "todo-8387a.firebaseapp.com",
  databaseURL: "https://todo-8387a.firebaseio.com",
  projectId: "todo-8387a",
  storageBucket: "todo-8387a.appspot.com",
  messagingSenderId: "1007964347286"
};
firebase.initializeApp(config);

class App extends Component {
  state = {
    highlightingColor: "red",
    players: [],
    newPlayers: []
  };

  componentDidMount() {
    fetch(`/data/players.json`)
      .then(r => r.json())
      .then(data => this.setState({ players: data }));
    fetch(`/data/new_players.json`)
      .then(r => r.json())
      .then(data => this.setState({ newPlayers: data }));
  }

  handleFormSubmit = data => {
    this.setState({ players: [...this.state.players, data] });
  };

  handleNewPlayersFormSubmit = data => {
    this.setState({ newPlayers: [...this.state.newPlayers, data] });
  };

  handleRemove = id => {
    const newArray = this.state.players.filter(
      player => id !== this.state.players.indexOf(player)
    );
    this.setState({ players: newArray });
  };

  handleNewPlayersRemove = id => {
    const newNewPlayerArray = this.state.newPlayers.filter(
      player => id !== this.state.newPlayers.indexOf(player)
    );
    this.setState({ newPlayers: newNewPlayerArray });
  };

  render() {
    return (
      <Fragment>
        <Navigation />
        <button onClick={() => this.setState({ highlightingColor: "blue" })}>
          Blue
        </button>
        <button onClick={() => this.setState({ highlightingColor: "red" })}>
          Red
        </button>
        <Switch>
          <Route
            exact
            path={"/players"}
            component={() => (
              <Fragment>
                <Players
                  players={this.state.players}
                  handleRemove={this.handleRemove}
                  highlightingColor={this.state.highlightingColor}
                />
                <PlayerForm onSubmit={this.handleFormSubmit} />
              </Fragment>
            )}
          />
          <Route
            exact
            path={"/new-players"}
            component={() => (
              <Fragment>
                <Players
                  players={this.state.newPlayers}
                  handleRemove={this.handleNewPlayersRemove}
                  highlightingColor={this.state.highlightingColor}
                />
                <PlayerForm onSubmit={this.handleNewPlayersFormSubmit} />
              </Fragment>
            )}
          />
          <Route
          exact path={"/to-do"} component={ToDo} />
          <Route exact path={"/sign-in"} component={Sign} />
          <Route exact path={"/sign-up"} component={() => <Sign isSignUp />} />
        </Switch>
      </Fragment>
    );
  }
}

export default App;
