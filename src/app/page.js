'use client';

import { useState } from 'react';
import { Button, Card } from 'react-bootstrap';

export default function TicTacToe() {
  const [gameStarted, setGameStarted] = useState(false);
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);

  const startGame = () => {
    setGameStarted(true);
    setBoard(Array(9).fill(null));
    setXIsNext(true);
    setWinner(null);
  };

  const checkWinner = (currentBoard) => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    winningCombinations.some(([a, b, c]) => {
      if (currentBoard[a] && currentBoard[a] === currentBoard[b] && currentBoard[a] === currentBoard[c]) {
        setWinner(currentBoard[a]);
        return true;
      }
      return false;
    });
    if (!currentBoard.includes(null)) {
      setWinner('Draw');
    }
  };

  const restartGame = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
    setWinner(null);
  };

  const handleClick = (index) => {
    if (board[index] || winner) return;
    const newBoard = [...board];
    newBoard[index] = xIsNext ? 'X' : 'O';
    setBoard(newBoard);
    setXIsNext(!xIsNext);
    checkWinner(newBoard);
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <div className="flex flex-col items-center gap-4 p-4">
        {!gameStarted ? (
          <div className="d-flex flex-column align-items-center justify-content-center" style={{ height: '100vh' }}>
            <p className="text-lg font-bold mb-4" style={{ marginBottom: '20px' }}>
              Welcome to Tic Tac Toe!
            </p>
            <Button onClick={startGame} variant="primary">
              Play
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4">
            <p className="text-lg font-bold" style={{ marginBottom: '20px' }}>
              {winner ? 'Game Over!' : `${xIsNext ? "X's" : "O's"} Turn`}
            </p>

            <div className="board" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 100px)', gap: '5px' }}>
              {board.map((cell, index) => (
                <Card
                  // eslint-disable-next-line react/no-array-index-key
                  key={index}
                  onClick={() => handleClick(index)}
                  className="flex items-center justify-center text-xl cursor-pointer"
                  style={{
                    width: '100px',
                    height: '100px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '2rem',
                    border: '1px solid #000',
                  }}
                >
                  {cell}
                </Card>
              ))}
            </div>

            {winner && (
              <div className="flex flex-col items-center gap-2" style={{ marginTop: '20px' }}>
                <p className="text-lg font-bold">{winner === 'Draw' ? "It's a Draw!" : `${winner} Wins!`}</p>
                <Button onClick={restartGame} variant="success" style={{ width: '200px', justifyContent: 'center' }}>
                  Restart
                </Button>
              </div>
            )}

            {!winner && (
              <Button onClick={restartGame} variant="warning" style={{ width: '200px', justifyContent: 'center', marginTop: '20px' }}>
                Restart Game
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
