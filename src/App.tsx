import {useEffect, useState} from 'react'
import './styles/App.css'
import BoardComponent from './components/BoardComponent';
import { Board } from './models/Board';
import { Player } from './models/Player';
import { Colors } from './models/Colors';
import LostFigures from './components/LostFigures';
import Timer from './components/Timer';

function App() {

  const [board, setBoard] = useState<Board>(new Board())

  const [whitePlayer, setWhitePlayer] = useState<Player>(new Player(Colors.WHITE))
  const [blackPlayer, setBlackPlayer] = useState<Player>(new Player(Colors.BLACK))
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null)

  useEffect(() => {
    restart()
  }, [])

  function restart() {
    const newBoard = new Board();
    newBoard.initCells()
    newBoard.addFigures()
    setBoard(newBoard)
    setCurrentPlayer(whitePlayer)
  }

  function swapPlayers() {
    setCurrentPlayer(currentPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer)
  }

  return (
    <div className="app">
      <div
        className='app-container'
      >
      <div
        className='board-header'
      >
        <h2>
          {`${currentPlayer?.color} player's turn`}
        </h2>
        <Timer
          currentPlayer={currentPlayer}
          restart={restart}
        />
      </div>

      <BoardComponent
        board={board}
        setBoard={setBoard}
        currentPlayer={currentPlayer}
        swapPlayers={swapPlayers}
      />
      </div>

      <div
        className='lost-figures-container'
      >
        <LostFigures
          title={`Black figures`}
          figures={board.lostBlackFigures}
        />
        <LostFigures
          title={`White figures`}
          figures={board.lostWhiteFigures}
        />
      </div>
    </div>
  );
}

export default App;
