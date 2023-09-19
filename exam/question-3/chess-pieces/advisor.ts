import { ChessPiece } from "./chess-piece";
import { Side } from "../side";
import { Coordinate } from "../coordinate";

export class Advisor extends ChessPiece {
    constructor(side: Side, position: Coordinate) {
        super(side, position);
    }

    override howToMove(): string {
        return "Can do dionally 2 squares (forward/backward 2 squares and to side 2 squares, but cannot cross the river.";
    }

    override move(coordinate: Coordinate) {
        if (this.isEligible(coordinate)) {
            this.position = coordinate;
        }
    }
    override isEligible(coordinate: Coordinate): boolean {

        if (Math.abs(coordinate.getX() - this.position.getX()) == 1 && Math.abs(coordinate.getY() - this.position.getY()) == 1) {
            if (this.side == Side.BLACK &&
                coordinate.getX() >= 4 && coordinate.getX() <= 6 &&
                coordinate.getY() >= 8 && coordinate.getY() <= 10 ||
                this.side == Side.WHITE &&
                coordinate.getX() >= 4 && coordinate.getX() <= 6 &&
                coordinate.getY() >= 1 && coordinate.getY() <= 3) {
                return true;
            } else {
                throw new Error(ChessPiece.errorCannotMove)
            }
        } else {
            throw new Error(ChessPiece.errorCannotMove)
        }
    }

}