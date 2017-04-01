(function () {

    // Elements
    var chessboard = document.querySelector("#chessboard");

    // Buttons
    var makeBoardButton = document.querySelector("#makeBoardButton");
    var normalBoardButton = document.querySelector("#normalBoardButton");
    var randomBoardButton = document.querySelector("#randomBoardButton");
    var setBoardSizeButton = document.querySelector("#setBoardSize");
    
    // do usuniecia w przyszłości
    makeBoardButton.onclick = function () {
        makeBoard();
    }

    normalBoardButton.onclick = function () {
        normalBoard();
    }

    randomBoardButton.onclick = function () {
        randomBoard();
    }
    
    setBoardSizeButton.onclick = function () {
        makeBoard();
    }

    // Variables
    var boardSize = 8;
    var piecesNumber = 10;

    // Functions

    function makeBoard() {
        
        var txt = "";
        var boardSize = document.querySelector("#boardsize").value;
        if (isNaN(boardSize) || boardSize < 1 || boardSize > 20) {
            txt = "Input not valid";
        } else {
            txt = "Input OK";
        }
        document.querySelector("#boardsizetxt").innerHTML = txt;
        
        chessboard.innerHTML = "";
        chessboard.style = "width: " + boardSize * 80 + "px; height: " + boardSize * 80 + "px;";
        var boardArray = new Array(boardSize);
        for (let i = 0; i < boardSize; i++) {
            boardArray[i] = new Array(boardSize);
            for (let j = 0; j < boardSize; j++) {
                boardArray[i][j] = document.createElement("div");
                if (i % 2 == 0 && j % 2 == 0) {
                    boardArray[i][j].className = "white square row-" + i + " column-" + j;
                } else if (i % 2 == 0 && j % 2 != 0) {
                    boardArray[i][j].className = "black square row-" + i + " column-" + j;
                } else if (i % 2 != 0 && j % 2 == 0) {
                    boardArray[i][j].className = "black square row-" + i + " column-" + j;
                } else {
                    boardArray[i][j].className = "white square row-" + i + " column-" + j;
                }
                chessboard.appendChild(boardArray[i][j]);
            }
        }
        console.log("TEST: Make Board!");
    }

    function normalBoard() {
        makeBoard();
        var normalPiecesArray = [BRook1, BKnight1, BBishop1, BKing, BQueen, BBishop2, BKnight2, BRook2, BPawn1, BPawn2, BPawn3, BPawn4, BPawn5, BPawn6, BPawn7, BPawn8, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , WPawn1, WPawn2, WPawn3, WPawn4, WPawn5, WPawn6, WPawn7, WPawn8, WRook1, WKnight1, WBishop1, WKing, WQueen, WBishop2, WKnight2, WRook2];
        console.log(normalPiecesArray);
        var squares = chessboard.querySelectorAll(".square");
        for (let i = 0; i < squares.length; i++) {
            if (normalPiecesArray[i] instanceof ChessPiece) {
                squares[i].innerHTML = normalPiecesArray[i].img;
                squares[i].onclick = function () {
                    displayMoves();
                }
            } else {
                squares[i].innerHTML = "";
            }
            squares[i].setAttribute("draggable", "true");
        }
    }

    function randomBoard() {
        makeBoard();
        var txt = "";
        var piecesNumber = document.querySelector("#piecesnumber").value;
        if (isNaN(piecesNumber) || piecesNumber < 0 || piecesNumber > 32) {
            txt = "Input not valid";
        } else {
            txt = "Input OK";
        }
        document.querySelector("#piecesnumbertxt").innerHTML = txt;
        var armyNumber = piecesNumber / 2;
        var whiteArmy = [WPawn1, WPawn2, WPawn3, WPawn4, WPawn5, WPawn6, WPawn7, WPawn8, WRook1, WKnight1, WBishop1, WKing, WQueen, WBishop2, WKnight2, WRook2];
        var blackArmy = [BRook1, BKnight1, BBishop1, BKing, BQueen, BBishop2, BKnight2, BRook2, BPawn1, BPawn2, BPawn3, BPawn4, BPawn5, BPawn6, BPawn7, BPawn8];
        var whiteRandomArmy = new Array(armyNumber);
        var blackRandomArmy = new Array(armyNumber);
        for (let i = 0; i < armyNumber; i++) {
            whiteRandomArmy[i] = whiteArmy[Math.floor(Math.random() * whiteArmy.length)];
            blackRandomArmy[i] = blackArmy[Math.floor(Math.random() * blackArmy.length)];
        }
        var emptyRandomArray = new Array(boardSize * boardSize - whiteRandomArmy.length - blackRandomArmy.length);
        for (let i = 0; i < emptyRandomArray.length; i++) {
            emptyRandomArray[i] = null;
        }
        var randomPiecesArray = whiteRandomArmy.concat(blackRandomArmy).concat(emptyRandomArray);
        shuffle(randomPiecesArray);

        var squares = chessboard.querySelectorAll(".square");
        for (let i = 0; i < squares.length; i++) {
            if (randomPiecesArray[i] instanceof ChessPiece) {
                squares[i].innerHTML = randomPiecesArray[i].img;
                squares[i].onclick = function () {
                    displayMoves();
                }
            } else {
                squares[i].innerHTML = "";
            }
            squares[i].setAttribute("draggable", "true");
        }
    }

    function shuffle(array) {
        for (let i = array.length; i; i--) {
            let j = Math.floor(Math.random() * i);
        [array[i - 1], array[j]] = [array[j], array[i - 1]];
        }
    }

    function displayMoves(e) {
        console.log("TEST: Piece clicked! " + e);
    }

    // Pieces
    class ChessPiece {
        constructor(id, player, img, type) {
            this.id = id;
            this.player = player;
            this.img = img;
            this.type = type;
        }
    }

    var whiteArmy = [WPawn1, WPawn2, WPawn3, WPawn4, WPawn5, WPawn6, WPawn7, WPawn8, WRook1, WKnight1, WBishop1, WKing, WQueen, WBishop2, WKnight2, WRook2];
    var blackArmy = [BRook1, BKnight1, BBishop1, BKing, BQueen, BBishop2, BKnight2, BRook2, BPawn1, BPawn2, BPawn3, BPawn4, BPawn5, BPawn6, BPawn7, BPawn8];
    var emptyArray = [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ];

    var WKing = new ChessPiece("WKing", "white", '<img src="img/white_king.png">', "king");
    var WQueen = new ChessPiece("WQueen", "white", '<img src="img/white_queen.png">', "queen");
    var WBishop1 = new ChessPiece("WBishop1", "white", '<img src="img/white_bishop.png">', "bishop");
    var WBishop2 = new ChessPiece("WBishop2", "white", '<img src="img/white_bishop.png">', "bishop");
    var WKnight1 = new ChessPiece("WKnight1", "white", '<img src="img/white_knight.png">', "knight");
    var WKnight2 = new ChessPiece("WKnight2", "white", '<img src="img/white_knight.png">', "knight");
    var WRook1 = new ChessPiece("WRook1", "white", '<img src="img/white_rook.png">', "rook");
    var WRook2 = new ChessPiece("WRook2", "white", '<img src="img/white_rook.png">', "rook");
    var WPawn1 = new ChessPiece("WPawn1", "white", '<img src="img/white_pawn.png">', "king");
    var WPawn2 = new ChessPiece("WPawn2", "white", '<img src="img/white_pawn.png">', "pawn");
    var WPawn3 = new ChessPiece("WPawn3", "white", '<img src="img/white_pawn.png">', "pawn");
    var WPawn4 = new ChessPiece("WPawn4", "white", '<img src="img/white_pawn.png">', "pawn");
    var WPawn5 = new ChessPiece("WPawn5", "white", '<img src="img/white_pawn.png">', "pawn");
    var WPawn6 = new ChessPiece("WPawn6", "white", '<img src="img/white_pawn.png">', "pawn");
    var WPawn7 = new ChessPiece("WPawn7", "white", '<img src="img/white_pawn.png">', "pawn");
    var WPawn8 = new ChessPiece("WPawn8", "white", '<img src="img/white_pawn.png">', "pawn");

    var BKing = new ChessPiece("BKing", "white", '<img id="BKing" class="king" player="white" src="img/black_king.png">', "king");
    var BQueen = new ChessPiece("BQueen", "white", '<img src="img/black_queen.png">', "queen");
    var BBishop1 = new ChessPiece("BBishop1", "white", '<img src="img/black_bishop.png">', "bishop");
    var BBishop2 = new ChessPiece("BBishop2", "white", '<img src="img/black_bishop.png">', "bishop");
    var BKnight1 = new ChessPiece("BKnight1", "white", '<img src="img/black_knight.png">', "knight");
    var BKnight2 = new ChessPiece("BKnight2", "white", '<img src="img/black_knight.png">', "knight");
    var BRook1 = new ChessPiece("BRook1", "white", '<img src="img/black_rook.png">', "rook");
    var BRook2 = new ChessPiece("BRook2", "white", '<img src="img/black_rook.png">', "rook");
    var BPawn1 = new ChessPiece("BPawn1", "white", '<img src="img/black_pawn.png">', "pawn");
    var BPawn2 = new ChessPiece("BPawn2", "white", '<img src="img/black_pawn.png">', "pawn");
    var BPawn3 = new ChessPiece("BPawn3", "white", '<img src="img/black_pawn.png">', "pawn");
    var BPawn4 = new ChessPiece("BPawn4", "white", '<img src="img/black_pawn.png">', "pawn");
    var BPawn5 = new ChessPiece("BPawn5", "white", '<img src="img/black_pawn.png">', "pawn");
    var BPawn6 = new ChessPiece("BPawn6", "white", '<img src="img/black_pawn.png">', "pawn");
    var BPawn7 = new ChessPiece("BPawn7", "white", '<img src="img/black_pawn.png">', "pawn");
    var BPawn8 = new ChessPiece("BPawn8", "white", '<img src="img/black_pawn.png">', "pawn");

})();
