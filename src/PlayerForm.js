import React, { Component, Fragment } from "react";

class PlayerForm extends Component {
  state = {
    player: {
      username: "",
      points: null
    }
  };

  handleChange = event => {
    const randomPoints = Math.floor(Math.random() * Math.floor(201));
    this.setState({
      player: { username: event.target.value, points: randomPoints }
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.onSubmit(this.state.player);
  };

  render() {
    return (
      <Fragment>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="name"
            value={this.state.player.username}
            onChange={this.handleChange}
          />
          <button type="submit">Dodaj</button>
        </form>
      </Fragment>
    );
  }
}

export default PlayerForm;