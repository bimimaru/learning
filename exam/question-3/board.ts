import { ChessPiece } from "./chess-pieces/chess-piece";
import { Coordinate } from "./coordinate";
import { General } from "./chess-pieces/general";
import { Side } from "./side";

export class Board {
    chessPieces: ChessPiece[]
    constructor() {
        this.chessPieces = [
            new General(Side.WHITE, new Coordinate(1, 5)),
        ];
    }

    exportMoves() {
        for (let i = 0; i < this.chessPieces.length; i++) {
            this.chessPieces[i].howToMove();
        }
    }
}