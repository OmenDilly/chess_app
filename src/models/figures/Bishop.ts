import { Cell } from "../Cell";
import { Colors } from "../Colors";
import { Figure, FigureNames } from "./Figure";
import BlackImage from '../../assets/black-bishop.png'
import WhiteImage from '../../assets/white-bishop.png'

export class Bishop extends Figure {
  constructor(
    color: Colors,
    cell: Cell
  ) {
    super(color, cell);
    this.image = color === Colors.BLACK ? BlackImage : WhiteImage;
    this.name = FigureNames.BISHOP
  }

  canMove(target: Cell): boolean {
    if (!super.canMove(target)) {
      return false
    }
    if (this.cell.isEmptyDiagonal(target)) {
      return true
    }
    return false
  }
}