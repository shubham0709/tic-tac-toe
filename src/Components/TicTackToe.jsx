import React from "react";
import { useState } from "react";

const TicTackToe = () => {
  const [turn, setTurn] = useState("x");
  const [cells, setCells] = useState(Array(9).fill(""));
  const [winner, setWinner] = useState();
  const [toggle, setToggle] = useState(true);

  const checkForWinner = (squares) => {
    let combos = {
      across: [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
      ],

      down: [
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
      ],
      diagonal: [
        [0, 4, 8],
        [2, 4, 6],
      ],
    };

    for (let combo in combos) {
      combos[combo].forEach((pattern) => {
        if (
          squares[pattern[0]] === "" ||
          squares[pattern[1]] === "" ||
          squares[pattern[2]] === ""
        ) {
          //do nothing
        } else if (
          squares[pattern[0]] === squares[pattern[1]] &&
          squares[pattern[1]] === squares[pattern[2]]
        ) {
          setWinner(squares[pattern[0]]);
        } else {
          //     setToggle(true);
          //   console.log("no winner");
        }
      });
    }
  };

  const handleClick = (num) => {
    if (cells[num] !== "") {
      alert("Allready Clicked");
      return;
    }

    let squares = [...cells];

    if (turn === "x") {
      squares[num] = "x";
      setTurn("o");
    } else {
      squares[num] = "o";
      setTurn("x");
    }

    checkForWinner(squares);
    setCells(squares);
  };

  const handleRestart = () => {
    setWinner(null);
    setCells(Array(9).fill(""));
  };

  const Cell = ({ num }) => {
    return (
      <td
        style={{ border: "1px solid grey", width: "100px", height: "100px" }}
        onClick={() => handleClick(num)}
      >
        {cells[num]}
      </td>
    );
  };

  return (
    <div className="container">
      Turn: {turn}
      <table>
        <tbody>
          <tr>
            <Cell num={0}></Cell>
            <Cell num={1}></Cell>
            <Cell num={2}></Cell>
          </tr>
          <tr>
            <Cell num={3}></Cell>
            <Cell num={4}></Cell>
            <Cell num={5}></Cell>
          </tr>
          <tr>
            <Cell num={6}></Cell>
            <Cell num={7}></Cell>
            <Cell num={8}></Cell>
          </tr>
        </tbody>
      </table>
      {winner && (
        <div>
          <p>{winner} is the Winner!</p>
          <button onClick={() => handleRestart()}>Play Again</button>
        </div>
      )}
    </div>
  );
};

export default TicTackToe;
