import React, { Fragment } from "react";
import PlayerRow from "./PlayerRow.js";

const Players = (props) => {
    return (
      <Fragment>
        <table>
          <thead>
            <tr>
              <td>Username</td>
              <td>Points</td>
            </tr>
          </thead>
          <tbody>
            {props.players.map(player => (
              <PlayerRow
                players={props.players}
                player={player}
                highlightColor={props.highlightingColor}
                key={player.username}
                onRemove={(id) => props.handleRemove(id)}
              />
            ))}
            <tr>
              <td>Total</td>
              <td>
                {props.players
                  .map(player => player.points)
                  .reduce((acc, score) => acc + score, 0)}
              </td>
            </tr>
            <tr>
              <td>Average</td>
              <td>
                {props.players
                  .map(player => player.points)
                  .reduce((acc, score) => acc + score, 0) /
                  props.players.length}
              </td>
            </tr>
          </tbody>
        </table>        
      </Fragment>
    );
  }

export default Players;
