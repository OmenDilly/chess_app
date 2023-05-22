import {FC, memo} from 'react'
import { Cell } from '../models/Cell'

interface CellProps {
  cell: Cell;
  selected: boolean;
  click: (cell: Cell) => void
}

const CellComponent: FC<CellProps> = ({cell, selected, click}) => {
  return (
    <div
      className={['cell', cell.color, selected && 'selected', cell.figure && cell.available && 'available-figure'].join(' ')}
      onClick={() => click(cell)}
    >
      {!cell.figure && cell.available && <div className={"available"}/>}
      {/* {cell.figure && <span>{cell.figure.name}</span>} */}
      {cell.figure?.image && <img src={cell.figure.image} alt={cell.figure.name}/>}
    </div>
  )
}

export default memo(CellComponent)