
function makeBoard() {
    console.log("TEST: Make Board")
    var boardElem = document.querySelector(".board");
    boardElem.innerHTML = "";
    var boardSize = document.querySelector("#boardsize").value;
    console.log("TEST: Board size: " + boardSize);
    var board = new Array(boardSize);
    for(var i = 0; i < boardSize; i++) {
        board[i] = new Array(boardSize);
        for(var j = 0; j < boardSize; j++) {
            board[i][j] = document.createElement("div");
            console.log("TEST: Board piece: " + i + " " + j);
            if(i % 2 == 0 && j % 2 == 0) {
                board[i][j].className = "white";
            } else if(i % 2 == 0 && j % 2 != 0) {
                board[i][j].className = "black"; 
            } else if(i % 2 != 0 && j % 2 == 0) {
                board[i][j].className = "black"; 
            } else {
                board[i][j].className = "white";
            }  
            boardElem.appendChild(board[i][j]);
        }
    }
    return board;
}

class ChessPiece {
    constructor(id, player, img, x, y) {
        this.id = id;
        this.player = player;
        this.img = img;
        this.location(x, y)
    }
    
    location(x, y) {
        this.x = x;
        this.y = y;
    }
    
    getLocation() {
        return {
            x: this.x,
            y: this.y
        };
    }
}
    
var WKing = new ChessPiece("WKing", "white", '<img src="img/white_king.png">', 0, 3);
var WQueen = new ChessPiece("WQueen", "white", '<img src="img/white_queen.png">', 0, 4);
var WBishop1 = new ChessPiece("WBishop1", "white", '<img src="img/white_bishop.png">', 0, 2);
var WBishop2 = new ChessPiece("WBishop2", "white", '<img src="img/white_bishop.png">', 0, 5);
var WKnight1 = new ChessPiece("WKnight1", "white", '<img src="img/white_knight.png">', 0, 1);
var WKnight2 = new ChessPiece("WKnight2", "white", '<img src="img/white_knight.png">', 0, 6);
var WRook1 = new ChessPiece("WRook1", "white", '<img src="img/white_rook.png">', 0, 0);
var WRook2 = new ChessPiece("WRook2", "white", '<img src="img/white_rook.png">', 0, 7);
var WPawn1 = new ChessPiece("WPawn1", "white", '<img src="img/white_pawn.png">', 1, 0);
var WPawn2 = new ChessPiece("WPawn2", "white", '<img src="img/white_pawn.png">', 1, 1);
var WPawn3 = new ChessPiece("WPawn3", "white", '<img src="img/white_pawn.png">', 1, 2);
var WPawn4 = new ChessPiece("WPawn4", "white", '<img src="img/white_pawn.png">', 1, 3);
var WPawn5 = new ChessPiece("WPawn5", "white", '<img src="img/white_pawn.png">', 1, 4);
var WPawn6 = new ChessPiece("WPawn6", "white", '<img src="img/white_pawn.png">', 1, 5);
var WPawn7 = new ChessPiece("WPawn7", "white", '<img src="img/white_pawn.png">', 1, 6);
var WPawn8 = new ChessPiece("WPawn8", "white", '<img src="img/white_pawn.png">', 1, 7);