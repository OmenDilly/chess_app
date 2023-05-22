import { Cell } from "../Cell";
import { Colors } from "../Colors";
import { Figure, FigureNames } from "./Figure";
import BlackImage from '../../assets/black-king.png'
import WhiteImage from '../../assets/white-king.png'

export class King extends Figure {
  constructor(
    color: Colors,
    cell: Cell
  ) {
    super(color, cell);
    this.image = color === Colors.BLACK ? BlackImage : WhiteImage;
    this.name = FigureNames.KING
  }

  canMove(target: Cell): boolean {
    if (!super.canMove(target)) {
      return false
    }
    const direction = 1

    const checkForYAxisMove = (target.y === this.cell.y + direction || target.y === this.cell.y - direction)

    const checkForDiagonalMove = (target.x === this.cell.x + direction || target.x === this.cell.x - direction)
    
    const checkTargetCellIsEnemy = this.cell.isEnemy(target)

    const checkTargetCellIsEmpty = this.cell.board.getCell(target.x, target.y).isEmpty()

    if (this.cell.isEmptyVertical(target) && checkForYAxisMove) {
      return true
    }

    if (this.cell.isEmptyHorizontal(target) && checkForDiagonalMove) {
      return true
    }

    if (this.cell.isEmptyDiagonal(target) && checkForDiagonalMove) {
      return true
    }

    if (checkForYAxisMove && checkForDiagonalMove && checkTargetCellIsEnemy) {
      return true
    }
    return false
  }
}