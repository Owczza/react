import React from "react";

const PlayerRow = props => {
  return (
    <tr bgcolor={props.player.points > 100 ? props.highlightColor : ""}>
      <td>{props.player.username}</td>
      <td>{props.player.points}</td>
      <td>
        <button
          onClick={() => props.onRemove(props.players.indexOf(props.player))}
        >
          x
        </button>
      </td>
    </tr>
  );
};

export default PlayerRow;
