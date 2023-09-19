import { ChessPiece } from "./chess-piece";
import { Side } from "../side";
import { Coordinate } from "../coordinate";

export class Soldier extends ChessPiece {
    constructor(side: Side, position: Coordinate) {
        super(side, position);
    }

    override howToMove(): string {
        return "Can only forward 1 square, once cross the river can also go horizontally 1 square."
    }

    override move(coordinate: Coordinate) {
        if (this.isEligible(coordinate)) {
            this.position = coordinate;
        }
    }
    override isEligible(coordinate: Coordinate): boolean {
        if (this.position.getY() <= 5 && this.side == Side.WHITE && coordinate.getY() - this.position.getY() == 1) {
            return true;
        } else if (this.side == Side.WHITE && this.position.getY() >= 6) {
            if (coordinate.getY() - this.position.getY() == 1 || Math.abs(coordinate.getX() - this.position.getX()) == 1) {
                return true;
            } else {
                throw new Error(ChessPiece.errorCannotMove)
            }
        } else if (this.position.getY() >= 6 && this.side == Side.BLACK && coordinate.getY() - this.position.getY() == -1) {
            return true;
        } else if (this.side == Side.BLACK && this.position.getY() <= 5) {
            if (coordinate.getY() - this.position.getY() == -1 || Math.abs(coordinate.getX() - this.position.getX()) == 1) {
                return true;
            } else {
                throw new Error(ChessPiece.errorCannotMove)
            }
        } else {
            throw new Error(ChessPiece.errorCannotMove)
        }
    }
}