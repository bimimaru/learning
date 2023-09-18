import { Side } from "../side";
import { Coordinate } from "../coordinate";
import { Direction } from "../directions";


export abstract class ChessPiece {
    side: Side;
    position: Coordinate;

    // numberOfSteps: number
    // directionOfSteps: Direction[]
    // limit: string
    // numberOfPieces: number
    constructor(side: Side, position: Coordinate) {
        this.side = side;
        this.position = position;
    }

    abstract howToMove(): string; // Print moves of chess peice

    // abstract move(coordinate: Coordinate);

}