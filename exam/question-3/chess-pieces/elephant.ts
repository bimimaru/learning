import { ChessPiece } from "./chess-piece";
import { Side } from "../side";
import { Coordinate } from "../coordinate";

export class Elephant extends ChessPiece {

    constructor(side: Side, position: Coordinate) {
        super(side, position);
    }

    override howToMove(): string {
        return "Can go diagonally 2 squares, but cannot cross the river. "
    }

    override move(coordinate: Coordinate) {
        if (this.isEligible(coordinate)) {
            this.position = coordinate;
        }
    }
    override isEligible(coordinate: Coordinate): boolean {
        if (Math.abs(coordinate.getX() - this.position.getX()) == 2 && Math.abs(coordinate.getY() - this.position.getY()) == 2) {
            if (coordinate.getY() <= 5 && this.side == Side.WHITE || coordinate.getY() >= 6 && this.side == Side.BLACK) {
                return true;
            } else {
                throw new Error(ChessPiece.errorCannotMove);
            }
        } else {
            throw new Error(ChessPiece.errorCannotMove);
        }
    }
}