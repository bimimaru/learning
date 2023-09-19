import { ChessPiece } from "./chess-piece";
import { Side } from "../side";
import { Coordinate } from "../coordinate";

export class Cannon extends ChessPiece {
    constructor(side: Side, position: Coordinate) {
        super(side, position);
    }

    override howToMove(): string {
        return "Can go horizontal and vertical unlimitedly, but needs 1 another chess piece in the direction to take the opponent. "
    }

    override move(coordinate: Coordinate) {
        if (this.isEligible(coordinate)) {
            this.position = coordinate;
        }
    }
    override isEligible(coordinate: Coordinate): boolean {
        if (this.position.getX() == coordinate.getX() || this.position.getY() == coordinate.getY()) {
            return true;
        } else {
            throw new Error(super.errorCannotMove)
        }
    }
}