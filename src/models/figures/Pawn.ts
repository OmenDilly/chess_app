import { Cell } from "../Cell";
import { Colors } from "../Colors";
import { Figure, FigureNames } from "./Figure";
import BlackImage from '../../assets/black-pawn.png'
import WhiteImage from '../../assets/white-pawn.png'

export class Pawn extends Figure {

  isFirstStep: boolean = true;

  constructor(
    color: Colors,
    cell: Cell
  ) {
    super(color, cell);
    this.image = color === Colors.BLACK ? BlackImage : WhiteImage;
    this.name = FigureNames.PAWN
  }

  canMove(target: Cell): boolean {
    if (!super.canMove(target)) {
      return false
    }
    const direction = this.cell.figure?.color === Colors.BLACK ? 1 : -1
    const firstStepDirection = this.cell.figure?.color === Colors.BLACK ? 2 : -2

    const checkForYAxisMove = target.y === this.cell.y + direction

    const checkForFirstStep = (
      checkForYAxisMove
      || 
      this.isFirstStep 
      && 
      (target.y === this.cell.y + firstStepDirection)
    )

    const checkForXAxisMove = target.x === this.cell.x

    const checkForDiagonalMove = (target.x === this.cell.x + 1 || target.x === this.cell.x - 1)
    
    const checkTargetCellIsEnemy = this.cell.isEnemy(target)

    const checkTargetCellIsEmpty = this.cell.board.getCell(target.x, target.y).isEmpty()

    if (checkForFirstStep && checkForXAxisMove && checkTargetCellIsEmpty) {
      return true
    }
    if (checkForYAxisMove && checkForDiagonalMove && checkTargetCellIsEnemy) {
      return true
    }
    return false
  }

  moveFigure(target: Cell): void {
    super.moveFigure(target);
    this.isFirstStep = false;
  }
}