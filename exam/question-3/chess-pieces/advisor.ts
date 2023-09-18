import { ChessPiece } from "./chess-piece";
import { Side } from "../side";
import { Coordinate } from "../coordinate";

export class Advisor extends ChessPiece {
    constructor(side: Side, position: Coordinate) {
        super(side, position);
    }

    howToMove(): string {
        throw new Error("Method not implemented.");
    }

}