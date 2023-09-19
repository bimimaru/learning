import { ChessPiece } from "./chess-piece";
import { Side } from "../side";
import { Coordinate } from "../coordinate";

export class Horse extends ChessPiece {
    constructor(side: Side, position: Coordinate) {
        super(side, position);
    }

    override howToMove(): string {
        return "Can go in L shape, 2 squares vertical and 1 square horizontal, and vice versa."
    }

    override move(coordinate: Coordinate) {
        if (this.isEligible(coordinate)) {
            this.position = coordinate;
        }
    }
    override isEligible(coordinate: Coordinate): boolean {
        if (Math.abs(coordinate.getX() - this.position.getX()) == 2 && Math.abs(coordinate.getY() - this.position.getY()) == 1 ||
            Math.abs(coordinate.getX() - this.position.getX()) == 1 && Math.abs(coordinate.getY() - this.position.getY()) == 2) {
            return true;
        } else {
            throw new Error(ChessPiece.errorCannotMove)
        }
    }
}