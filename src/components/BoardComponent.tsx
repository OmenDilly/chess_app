import React, { FC, memo, useEffect, useState } from 'react'
import { Board } from '../models/Board'
import CellComponent from './CellComponent'
import { Cell } from '../models/Cell'
import { Player } from '../models/Player';

interface BoardProps {
  board: Board;
  setBoard: (board: Board) => void;
  currentPlayer: Player | null;
  swapPlayers: () => void
}

const BoardComponent: FC<BoardProps> = ({board, setBoard, currentPlayer, swapPlayers}) => {

  const [selectedCell, setSelectedCell] = useState<Cell | null>(null)

  function click(cell: Cell) {
    if (selectedCell && selectedCell !== cell && selectedCell.figure?.canMove(cell)) {
      selectedCell.moveFigure(cell);
      setSelectedCell(null);
      swapPlayers()
    } else {
      if (cell.figure?.color === currentPlayer?.color) {
        setSelectedCell(cell)
      }
    }
  }

  useEffect(() => {
    highlightCells()
  
  }, [selectedCell])
  

  function highlightCells() {
    board.highlightCells(selectedCell)
    updateBoard()
  }

  function updateBoard() {
    const newBoard = board.getCopyBoard()
    setBoard(newBoard)
  }

  return (
    <div
      className='board-container'
    >
      <div
        className='board'
      >
        <div
          className='y-axis-marks'
        >
          {
            [1, 2, 3, 4, 5, 6, 7, 8].reverse().map((number, index) => 
              <span key={index} className='axis-mark'>
                {number}
              </span>
            )
          }
        </div>
        <div
          className='x-axis-marks'
        >
          {
            ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'].map((number, index) => 
              <span key={index} className='axis-mark'>
                {number}
              </span>
            )
          }
        </div>
        {
          board.cells.map((row, index) =>
            <React.Fragment key={index}>
              {/* <div>{index+1}</div> */}
              {
                row.map(cell => 
                  <CellComponent
                    click={click}
                    cell={cell}
                    key={cell.id}
                    selected={cell.x === selectedCell?.x && cell.y === selectedCell?.y }
                  />
                )
              }
            </React.Fragment>
          )
        }
      </div>
    </div>
    
  )
}

export default memo(BoardComponent)