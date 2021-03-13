import * as React from 'react'
import {useLocalStorageState} from '../utils.js'

function Board({onClick, squares, ...props}) {

  function renderSquare(i) {
    return (
      <button className="square" onClick={() => onClick(i)}>
        {squares[i]}
      </button>
    )
  }

  return (
    <div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  )
}

function Game() {
  const [currentSquares, setCurrentSquares] = useLocalStorageState(
    'squares',
    Array(9).fill(null)
  )
  const [history, setHistory] = useLocalStorageState('history', [Array(9).fill(null)])
  const currentStep = calculateCurrentStep(currentSquares, history)
  const nextValue = calculateNextValue(currentSquares)
  const winner = calculateWinner(currentSquares)
  const status = calculateStatus(winner, currentSquares, nextValue)

  function selectSquare(square) {
    if (winner || currentSquares[square] !== null) {
      return
    }
    const squaresCopy = [...currentSquares]
    squaresCopy[square] = nextValue
    setCurrentSquares(squaresCopy)

    if (history.length-1 === currentStep) {
      setHistory([...history, squaresCopy])
    } else {
      setHistory([...history.slice(0, currentStep+1), squaresCopy])
    }
    
  }

  function restart() {
    setCurrentSquares(Array(9).fill(null))
    setHistory([Array(9).fill(null)])
  }

  function setCurrentStep(step) {
    setCurrentSquares(history[step])
  }

  const moves = history.map((move, step) =>
    <li key={step}>
      <button onClick={() => setCurrentStep(step)} disabled={step === currentStep}>
        {step === 0 ? "Go to game start" : `Go to move #${step}`} {step === currentStep ? "(current)" : ""}
      </button>
    </li>
  );
  
  return (
    <div className="game">
      <div className="game-board">
        <Board onClick={selectSquare} squares={currentSquares} />
        <button className="restart" onClick={restart}>
          restart
        </button>
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  )
}

function calculateCurrentStep(squares, history) {
  for (let a = 0; a < history.length; a++) {
    if (squares.length === history[a].length && squares.every((v, i) => v === history[a][i])
      ) {
      return a
    } 
  }
  return 0
}

// eslint-disable-next-line no-unused-vars
function calculateStatus(winner, squares, nextValue) {
  return winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
    ? `Scratch: Cat's game`
    : `Next player: ${nextValue}`
}

// eslint-disable-next-line no-unused-vars
function calculateNextValue(squares) {
  const xSquaresCount = squares.filter(r => r === 'X').length
  const oSquaresCount = squares.filter(r => r === 'O').length
  return oSquaresCount === xSquaresCount ? 'X' : 'O'
}

// eslint-disable-next-line no-unused-vars
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}

function App() {
  return <Game />
}

export default App
