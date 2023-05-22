import { Cell } from "../Cell";
import { Colors } from "../Colors";
import { Figure, FigureNames } from "./Figure";
import BlackImage from '../../assets/black-rook.png'
import WhiteImage from '../../assets/white-rook.png'

export class Rook extends Figure {
  constructor(
    color: Colors,
    cell: Cell
  ) {
    super(color, cell);
    this.image = color === Colors.BLACK ? BlackImage : WhiteImage;
    this.name = FigureNames.ROOK
  }

  canMove(target: Cell): boolean {
    if (!super.canMove(target)) {
      return false
    }
    if (this.cell.isEmptyHorizontal(target)) {
      return true
    }
    if (this.cell.isEmptyVertical(target)) {
      return true
    }
    return false
  }
}