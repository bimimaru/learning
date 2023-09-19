import { ChessPiece } from "./chess-pieces/chess-piece";
import { Coordinate } from "./coordinate";
import { General } from "./chess-pieces/general";
import { Side } from "./side";
import { Advisor } from "./chess-pieces/advisor";
import { Cannon } from "./chess-pieces/cannon";
import { Elephant } from "./chess-pieces/elephant";
import { Horse } from "./chess-pieces/horse";
import { Chariot } from "./chess-pieces/chariot";
import { Soldier } from "./chess-pieces/soldier";

export class Board {
    chessPieces: ChessPiece[]
    constructor() {
        this.chessPieces = [
            new General(Side.WHITE, new Coordinate(1, 5)),
            new Advisor(Side.WHITE, new Coordinate(1, 4)),
            new Advisor(Side.WHITE, new Coordinate(1, 6)),
            new Elephant(Side.WHITE, new Coordinate(1, 3)),
            new Elephant(Side.WHITE, new Coordinate(1, 7)),
            new Horse(Side.WHITE, new Coordinate(1, 2)),
            new Horse(Side.WHITE, new Coordinate(1, 8)),
            new Chariot(Side.WHITE, new Coordinate(1, 1)),
            new Chariot(Side.WHITE, new Coordinate(1, 9)),
            new Cannon(Side.WHITE, new Coordinate(3, 2)),
            new Cannon(Side.WHITE, new Coordinate(3, 8)),
            new Soldier(Side.WHITE, new Coordinate(4, 1)),
            new Soldier(Side.WHITE, new Coordinate(4, 3)),
            new Soldier(Side.WHITE, new Coordinate(4, 5)),
            new Soldier(Side.WHITE, new Coordinate(4, 7)),
            new Soldier(Side.WHITE, new Coordinate(4, 9)),

            new General(Side.BLACK, new Coordinate(10, 5)),
            new Advisor(Side.BLACK, new Coordinate(10, 4)),
            new Advisor(Side.BLACK, new Coordinate(10, 6)),
            new Elephant(Side.BLACK, new Coordinate(10, 3)),
            new Elephant(Side.BLACK, new Coordinate(10, 7)),
            new Horse(Side.BLACK, new Coordinate(10, 2)),
            new Horse(Side.BLACK, new Coordinate(10, 8)),
            new Chariot(Side.BLACK, new Coordinate(10, 1)),
            new Chariot(Side.BLACK, new Coordinate(10, 9)),
            new Cannon(Side.BLACK, new Coordinate(8, 2)),
            new Cannon(Side.BLACK, new Coordinate(8, 8)),
            new Soldier(Side.BLACK, new Coordinate(7, 1)),
            new Soldier(Side.BLACK, new Coordinate(7, 3)),
            new Soldier(Side.BLACK, new Coordinate(7, 5)),
            new Soldier(Side.BLACK, new Coordinate(7, 7)),
            new Soldier(Side.BLACK, new Coordinate(7, 9)),
        ];
    }

    exportMoves() {
        for (let i = 0; i < this.chessPieces.length; i++) {
            this.chessPieces[i].howToMove();
            this.chessPieces[i].move(new Coordinate(1, 1));
        }
    }
}