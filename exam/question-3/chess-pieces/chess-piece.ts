import { Side } from "../side";
import { Coordinate } from "../coordinate";
import { Direction } from "../directions";


export abstract class ChessPiece {
    side: Side;
    position: Coordinate;
    static errorCannotMove: string = "You cannot move to this coordinate."

    // numberOfSteps: number
    // directionOfSteps: Direction[]
    // limit: string
    // numberOfPieces: number
    constructor(side: Side, position: Coordinate) {
        this.side = side;
        this.position = position;
    }

    abstract howToMove(): string; // Print moves of chess peice

    abstract move(coordinate: Coordinate);

    abstract isEligible(coordinate: Coordinate): boolean;

    // 1. Which type?
    // 2. Check eligibility? Next move is eligble or not?
    // 3. If yes => does it take any opponent piece? If yes => Remove opponent piece
    // 4. Replace position

}