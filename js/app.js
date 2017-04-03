(function () {

    // Elements
    var chessboard = document.querySelector("#chessboard");

    // Buttons
    var makeBoardButton = document.querySelector("#makeBoardButton");
    var normalBoardButton = document.querySelector("#normalBoardButton");
    var randomBoardButton = document.querySelector("#randomBoardButton");
    var setBoardSizeButton = document.querySelector("#setBoardSize");

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
            txt = "WRONG INPUT";
        } else {
            txt = "OK";
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
                    boardArray[i][j].className = "white square";
                    boardArray[i][j].setAttribute("row", i);
                    boardArray[i][j].setAttribute("column", j);
                } else if (i % 2 == 0 && j % 2 != 0) {
                    boardArray[i][j].className = "black square";
                    boardArray[i][j].setAttribute("row", i);
                    boardArray[i][j].setAttribute("column", j);
                } else if (i % 2 != 0 && j % 2 == 0) {
                    boardArray[i][j].className = "black square";
                    boardArray[i][j].setAttribute("row", i);
                    boardArray[i][j].setAttribute("column", j);
                } else {
                    boardArray[i][j].className = "white square";
                    boardArray[i][j].setAttribute("row", i);
                    boardArray[i][j].setAttribute("column", j);
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
        setupSquares(normalPiecesArray);
    }

    function randomBoard() {
        makeBoard();
        var txt = "";
        var piecesNumber = document.querySelector("#piecesnumber").value;
        if (isNaN(piecesNumber) || piecesNumber < 0 || piecesNumber > 32) {
            txt = "WRONG INPUT";
        } else {
            txt = "OK";
        }
        document.querySelector("#piecesnumbertxt").innerHTML = txt;
        var armyNumber = Math.round(piecesNumber / 2);
        var whiteArmy = [WPawn1, WPawn2, WPawn3, WPawn4, WPawn5, WPawn6, WPawn7, WPawn8, WRook1, WKnight1, WBishop1, WKing, WQueen, WBishop2, WKnight2, WRook2];
        var blackArmy = [BRook1, BKnight1, BBishop1, BKing, BQueen, BBishop2, BKnight2, BRook2, BPawn1, BPawn2, BPawn3, BPawn4, BPawn5, BPawn6, BPawn7, BPawn8];
        var whiteRandomArmy = new Array(armyNumber);
        var blackRandomArmy = new Array(armyNumber);
        for (let i = 0; i < armyNumber; i++) {
            var randomWhite = Math.floor(Math.random() * whiteArmy.length);
            var randomBlack = Math.floor(Math.random() * blackArmy.length);
            whiteRandomArmy[i] = whiteArmy[randomWhite];
            blackRandomArmy[i] = blackArmy[randomBlack];
            whiteArmy.splice(randomWhite, 1);
            blackArmy.splice(randomBlack, 1);
        }
        var emptyRandomArray = new Array(boardSize * boardSize - whiteRandomArmy.length - blackRandomArmy.length);
        for (let i = 0; i < emptyRandomArray.length; i++) {
            emptyRandomArray[i] = null;
        }
        var randomPiecesArray = whiteRandomArmy.concat(blackRandomArmy).concat(emptyRandomArray);
        console.log(randomPiecesArray);
        shuffle(randomPiecesArray);
        setupSquares(randomPiecesArray);
    }

    function shuffle(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * i);
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    }

    function setupSquares(array) {
        var squares = chessboard.querySelectorAll(".square");
        for (let i = 0; i < squares.length; i++) {
            squares[i].onclick = displayMoves;
            squares[i].setAttribute("ondrop", "pieceDrop(event)");
            squares[i].setAttribute("ondragover", "pieceDragOver(event)");
            squares[i].setAttribute("ondragleave", "pieceLeave(event)");
            squares[i].setAttribute("ondragend", "pieceDragEnd(event)");
            if (array[i] instanceof ChessPiece) {
                squares[i].innerHTML = array[i].img;
            } else {
                squares[i].innerHTML = '<img class="empty" player="empty" src="img/empty.png">';
            }
            if (squares[i].firstChild) {
                squares[i].firstChild.setAttribute("draggable", "true");
                squares[i].firstChild.setAttribute("ondragstart", "pieceDragStart(event)");
            }
        }
    }

    // Display moves on board - to do
    function displayMoves(e) {
        var target = e.target;
        var type = target.parentNode.firstChild.getAttribute("class");
        var player = target.parentNode.firstChild.getAttribute("player");
        switch (type) {
            case "king":
                console.log("KING " + target);
                kill(target);
                //clearMoves();
                kingMoves(target);
                break;
            case "queen":
                console.log("QUEEN " + target);
                kill(target);
                //clearMoves();
                queenMoves(target);
                break;
            case "bishop":
                console.log("BISHOP " + target);
                kill(target);
                //clearMoves();
                bishopMoves(target);
                break;
            case "knight":
                console.log("KNIGHT " + target);
                kill(target);
                //clearMoves();
                knightMoves(target);
                break;
            case "rook":
                console.log("ROOK " + target);
                kill(target);
                //clearMoves();
                rookMoves(target);
                break;
            case "pawn":
                console.log("PAWN " + target);
                kill(target);
                //clearMoves();
                if (player == "white") {
                    whitePawnMove(target);
                }
                if (player == "black") {
                    blackPawnMove(target);
                }
                break;
            default:
                kill(target);
                //clearMoves();
                console.log("DEFAULT");
        }
    }

    //Move functions
    var killer = "";
    // To do
    function kill(target) {
        console.log("target: " + target.parentNode.firstChild.outerHTML);
        console.log("killer: " + killer.outerHTML);
        console.log("KILLER: " + killer + "!!!!!!!!!");
        console.log("target: " + target.parentNode + " yellow: " + target.classList.contains("yellow")
                        + " red: " + target.classList.contains("red")
                        + " green: " + target.classList.contains("green"));
        if(target.classList.contains("yellow") || target.classList.contains("red") || target.classList.contains("green")) {
            target.parentNode.firstChild.outerHTML = killer.outerHTML;
        }
        clearMoves();
    }

    function whitePawnMove(target) {
        killer = target;
        target.parentNode.classList.add("green");
        let squareRow = Number(target.parentNode.getAttribute("row")) - 1;
        let squareColumn = Number(target.parentNode.getAttribute("column"));
        for (let i = 0; i < chessboard.childNodes.length; i++) {
            if (chessboard.childNodes[i].getAttribute("row") == squareRow &&
                chessboard.childNodes[i].getAttribute("column") == squareColumn) {
                if (chessboard.childNodes[i].firstChild.getAttribute("player") == "empty") {
                    var moves = chessboard.childNodes[i];
                    moves.classList.add("yellow");
                }
            }
            if ((chessboard.childNodes[i].getAttribute("row") == squareRow &&
                    chessboard.childNodes[i].getAttribute("column") == squareColumn + 1) ||
                (chessboard.childNodes[i].getAttribute("row") == squareRow &&
                    chessboard.childNodes[i].getAttribute("column") == squareColumn - 1)) {
                if (chessboard.childNodes[i].firstChild.getAttribute("player") == "black") {
                    chessboard.childNodes[i].classList.add("red");
                }
            }
        }
        console.log("white " + squareRow + " " + squareColumn);
    }

    function blackPawnMove(target) {
        killer = target;
        target.parentNode.classList.add("green");
        let squareRow = Number(target.parentNode.getAttribute("row")) + 1;
        let squareColumn = Number(target.parentNode.getAttribute("column"));
        for (let i = 0; i < chessboard.childNodes.length; i++) {
            if (chessboard.childNodes[i].getAttribute("row") == squareRow &&
                chessboard.childNodes[i].getAttribute("column") == squareColumn) {
                if (chessboard.childNodes[i].firstChild.getAttribute("player") == "empty") {
                    var moves = chessboard.childNodes[i];
                    moves.classList.add("yellow");
                }
            }
            if ((chessboard.childNodes[i].getAttribute("row") == squareRow &&
                    chessboard.childNodes[i].getAttribute("column") == squareColumn + 1) ||
                (chessboard.childNodes[i].getAttribute("row") == squareRow &&
                    chessboard.childNodes[i].getAttribute("column") == squareColumn - 1)) {
                if (chessboard.childNodes[i].firstChild.getAttribute("player") == "white") {
                    chessboard.childNodes[i].classList.add("red");
                }
            }
        }
        console.log("white " + squareRow + " " + squareColumn);
    }

    function kingMoves(target) {
        killer = target;
        target.parentNode.classList.add("green");
        let squareRow = Number(target.parentNode.getAttribute("row"));
        let squareColumn = Number(target.parentNode.getAttribute("column"));
        for (let i = 0; i < chessboard.childNodes.length; i++) {
            if (chessboard.childNodes[i].getAttribute("row") >= squareRow - 1 &&
                chessboard.childNodes[i].getAttribute("row") <= squareRow + 1 &&
                chessboard.childNodes[i].getAttribute("column") >= squareColumn - 1 &&
                chessboard.childNodes[i].getAttribute("column") <= squareColumn + 1) {
                if (target.getAttribute("player") == chessboard.childNodes[i].firstChild.getAttribute("player")) {
                    console.log(target.getAttribute("player"));
                } else if ("empty" == chessboard.childNodes[i].firstChild.getAttribute("player")) {
                    var moves = chessboard.childNodes[i];
                    moves.classList.add("yellow");
                } else if (target.getAttribute("player") != chessboard.childNodes[i].firstChild.getAttribute("player")) {
                    var moves = chessboard.childNodes[i];
                    moves.classList.add("red");
                }
            }
        }
    }
    // To fix
    function queenMoves(target) {
        killer = target;
        target.parentNode.classList.add("green");
        let squareRow = Number(target.parentNode.getAttribute("row"));
        let squareColumn = Number(target.parentNode.getAttribute("column"));
        for (let i = 0; i < chessboard.childNodes.length; i++) {
            if (chessboard.childNodes[i].getAttribute("row") > chessboard.childNodes.length ||
                chessboard.childNodes[i].getAttribute("row") < chessboard.childNodes.length ||
                chessboard.childNodes[i].getAttribute("column") > chessboard.childNodes.length ||
                chessboard.childNodes[i].getAttribute("column") < chessboard.childNodes.length) {
                /*
                if (target.getAttribute("player") == chessboard.childNodes[i].firstChild.getAttribute("player")) {
                    console.log(target.getAttribute("player"));
                } else if ("empty" == chessboard.childNodes[i].firstChild.getAttribute("player")) {
                    var moves = chessboard.childNodes[i];
                    moves.classList.add("yellow");
                } else if (target.getAttribute("player") != chessboard.childNodes[i].firstChild.getAttribute("player")) {
                    var moves = chessboard.childNodes[i];
                    moves.classList.add("red");
                }
                */
            }
        }
    }
    // To fix
    function bishopMoves(target) {
        killer = target;
        target.parentNode.classList.add("green");
        let squareRow = Number(target.parentNode.getAttribute("row"));
        let squareColumn = Number(target.parentNode.getAttribute("column"));
        for (let i = 0; i < chessboard.childNodes.length; i++) {
            for (let j = 0; j < boardSize; j++) {
                if ((chessboard.childNodes[i].getAttribute("row") == squareRow - j &&
                        chessboard.childNodes[i].getAttribute("column") == squareColumn - j) ||
                    (chessboard.childNodes[i].getAttribute("row") == squareRow + j &&
                        chessboard.childNodes[i].getAttribute("column") == squareColumn + j) ||
                    (chessboard.childNodes[i].getAttribute("row") == squareRow - j &&
                        chessboard.childNodes[i].getAttribute("column") == squareColumn + j) ||
                    (chessboard.childNodes[i].getAttribute("row") == squareRow + j &&
                        chessboard.childNodes[i].getAttribute("column") == squareColumn - j)) {
                    /*
                    if (target.getAttribute("player") == chessboard.childNodes[i].firstChild.getAttribute("player")) {
                        console.log(target.getAttribute("player"));
                    } else if ("empty" == chessboard.childNodes[i].firstChild.getAttribute("player")) {
                        var moves = chessboard.childNodes[i];
                        moves.classList.add("yellow");
                    } else if (target.getAttribute("player") != chessboard.childNodes[i].firstChild.getAttribute("player")) {
                        var moves = chessboard.childNodes[i];
                        moves.classList.add("red");
                    }
                    */
                }
            }
        }
        target.parentNode.classList.remove("yellow");
    }

    function knightMoves(target) {
        killer = target;
        target.parentNode.classList.add("green");
        let squareRow = Number(target.parentNode.getAttribute("row"));
        let squareColumn = Number(target.parentNode.getAttribute("column"));
        for (let i = 0; i < chessboard.childNodes.length; i++) {
            if ((chessboard.childNodes[i].getAttribute("row") == squareRow + 2 &&
                    chessboard.childNodes[i].getAttribute("column") == squareColumn + 1) ||
                (chessboard.childNodes[i].getAttribute("row") == squareRow + 2 &&
                    chessboard.childNodes[i].getAttribute("column") == squareColumn - 1) ||
                (chessboard.childNodes[i].getAttribute("row") == squareRow - 2 &&
                    chessboard.childNodes[i].getAttribute("column") == squareColumn + 1) ||
                (chessboard.childNodes[i].getAttribute("row") == squareRow - 2 &&
                    chessboard.childNodes[i].getAttribute("column") == squareColumn - 1) ||
                (chessboard.childNodes[i].getAttribute("row") == squareRow + 1 &&
                    chessboard.childNodes[i].getAttribute("column") == squareColumn + 2) ||
                (chessboard.childNodes[i].getAttribute("row") == squareRow + 1 &&
                    chessboard.childNodes[i].getAttribute("column") == squareColumn - 2) ||
                (chessboard.childNodes[i].getAttribute("row") == squareRow - 1 &&
                    chessboard.childNodes[i].getAttribute("column") == squareColumn + 2) ||
                (chessboard.childNodes[i].getAttribute("row") == squareRow - 1 &&
                    chessboard.childNodes[i].getAttribute("column") == squareColumn - 2)) {
                if (target.getAttribute("player") == chessboard.childNodes[i].firstChild.getAttribute("player")) {
                    console.log(target.getAttribute("player"));
                } else if ("empty" == chessboard.childNodes[i].firstChild.getAttribute("player")) {
                    var moves = chessboard.childNodes[i];
                    moves.classList.add("yellow");
                } else if (target.getAttribute("player") != chessboard.childNodes[i].firstChild.getAttribute("player")) {
                    var moves = chessboard.childNodes[i];
                    moves.classList.add("red");
                }
            }
        }
    }

    function rookMoves(target) {
        killer = target;
        target.parentNode.classList.add("green");
        let squareRow = Number(target.parentNode.getAttribute("row"));
        let squareColumn = Number(target.parentNode.getAttribute("column"));
        for (let i = 0; i < chessboard.childNodes.length; i++) {
            if ((chessboard.childNodes[i].getAttribute("row") == squareRow &&
                    (chessboard.childNodes[i].getAttribute("column") > squareColumn ||
                        chessboard.childNodes[i].getAttribute("column") < squareColumn)) ||
                chessboard.childNodes[i].getAttribute("column") == squareColumn &&
                (chessboard.childNodes[i].getAttribute("row") > squareRow ||
                    chessboard.childNodes[i].getAttribute("row") < squareRow)) {
                /*
                if (target.getAttribute("player") == chessboard.childNodes[i].firstChild.getAttribute("player")) {
                    console.log(target.getAttribute("player"));
                } else if ("empty" == chessboard.childNodes[i].firstChild.getAttribute("player")) {
                    var moves = chessboard.childNodes[i];
                    moves.classList.add("yellow");
                } else if (target.getAttribute("player") != chessboard.childNodes[i].firstChild.getAttribute("player")) {
                    var moves = chessboard.childNodes[i];
                    moves.classList.add("red");
                }
                */
            }
        }
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

    var WKing = new ChessPiece("WKing", "white", '<img id="WKing" class="king" player="white" src="img/white_king.png">', "king");
    var WQueen = new ChessPiece("WQueen", "white", '<img id="WQueen" class="queen" player="white" src="img/white_queen.png">', "queen");
    var WBishop1 = new ChessPiece("WBishop1", "white", '<img id="WBishop1" class="bishop" player="white" src="img/white_bishop.png">', "bishop");
    var WBishop2 = new ChessPiece("WBishop2", "white", '<img id="WBishop2" class="bishop" player="white" src="img/white_bishop.png">', "bishop");
    var WKnight1 = new ChessPiece("WKnight1", "white", '<img id="WKnight1" class="knight" player="white" src="img/white_knight.png">', "knight");
    var WKnight2 = new ChessPiece("WKnight2", "white", '<img id="WKnight2" class="knight" player="white" src="img/white_knight.png">', "knight");
    var WRook1 = new ChessPiece("WRook1", "white", '<img id="WRook1" class="rook" player="white" src="img/white_rook.png">', "rook");
    var WRook2 = new ChessPiece("WRook2", "white", '<img id="WRook2" class="rook" player="white" src="img/white_rook.png">', "rook");
    var WPawn1 = new ChessPiece("WPawn1", "white", '<img id="WPawn1" class="pawn" player="white" src="img/white_pawn.png">', "pawn");
    var WPawn2 = new ChessPiece("WPawn2", "white", '<img id="WPawn2" class="pawn" player="white" src="img/white_pawn.png">', "pawn");
    var WPawn3 = new ChessPiece("WPawn3", "white", '<img id="WPawn3" class="pawn" player="white" src="img/white_pawn.png">', "pawn");
    var WPawn4 = new ChessPiece("WPawn4", "white", '<img id="WPawn4" class="pawn" player="white" src="img/white_pawn.png">', "pawn");
    var WPawn5 = new ChessPiece("WPawn5", "white", '<img id="WPawn5" class="pawn" player="white" src="img/white_pawn.png">', "pawn");
    var WPawn6 = new ChessPiece("WPawn6", "white", '<img id="WPawn6" class="pawn" player="white" src="img/white_pawn.png">', "pawn");
    var WPawn7 = new ChessPiece("WPawn7", "white", '<img id="WPawn7" class="pawn" player="white" src="img/white_pawn.png">', "pawn");
    var WPawn8 = new ChessPiece("WPawn8", "white", '<img id="WPawn8" class="pawn" player="white" src="img/white_pawn.png">', "pawn");

    var BKing = new ChessPiece("BKing", "black", '<img id="BKing" class="king" player="black" src="img/black_king.png">', "king");
    var BQueen = new ChessPiece("BQueen", "black", '<img id="BQueen" class="queen" player="black" src="img/black_queen.png">', "queen");
    var BBishop1 = new ChessPiece("BBishop1", "black", '<img id="BBishop1" class="bishop" player="black" src="img/black_bishop.png">', "bishop");
    var BBishop2 = new ChessPiece("BBishop2", "black", '<img id="BBishop2" class="bishop" player="black" src="img/black_bishop.png">', "bishop");
    var BKnight1 = new ChessPiece("BKnight1", "black", '<img id="BKnight1" class="knight" player="black" src="img/black_knight.png">', "knight");
    var BKnight2 = new ChessPiece("BKnight2", "black", '<img id="BKnight2" class="knight" player="black" src="img/black_knight.png">', "knight");
    var BRook1 = new ChessPiece("BRook1", "black", '<img id="BRook1" class="rook" player="black" src="img/black_rook.png">', "rook");
    var BRook2 = new ChessPiece("BRook2", "black", '<img id="BRook2" class="rook" player="black" src="img/black_rook.png">', "rook");
    var BPawn1 = new ChessPiece("BPawn1", "black", '<img id="BPawn1" class="pawn" player="black" src="img/black_pawn.png">', "pawn");
    var BPawn2 = new ChessPiece("BPawn2", "black", '<img id="BPawn2" class="pawn" player="black" src="img/black_pawn.png">', "pawn");
    var BPawn3 = new ChessPiece("BPawn3", "black", '<img id="BPawn3" class="pawn" player="black" src="img/black_pawn.png">', "pawn");
    var BPawn4 = new ChessPiece("BPawn4", "black", '<img id="BPawn4" class="pawn" player="black" src="img/black_pawn.png">', "pawn");
    var BPawn5 = new ChessPiece("BPawn5", "black", '<img id="BPawn5" class="pawn" player="black" src="img/black_pawn.png">', "pawn");
    var BPawn6 = new ChessPiece("BPawn6", "black", '<img id="BPawn6" class="pawn" player="black" src="img/black_pawn.png">', "pawn");
    var BPawn7 = new ChessPiece("BPawn7", "black", '<img id="BPawn7" class="pawn" player="black" src="img/black_pawn.png">', "pawn");
    var BPawn8 = new ChessPiece("BPawn8", "black", '<img id="BPawn8" class="pawn" player="black" src="img/black_pawn.png">', "pawn");

})();

// Drag & drop
function pieceDragStart(event) {
    clearMoves();
    event.dataTransfer.setData("img", event.target.id);
    console.log(event.target.id);
}

function pieceDragOver(event) {
    event.preventDefault();
    event.target.classList.add("green");
}

function pieceLeave(event) {
    event.target.classList.remove("green");
}

function pieceDrop(event) {
    event.preventDefault();
    var image = event.dataTransfer.getData("img");
    var movedPiece = document.getElementById(image)
    console.log("outer html: " + event.target.outerHTML);
    console.log("inner html: " + event.target.outerHTML);
    console.log("moved piece: " + movedPiece.outerHTML);
    event.target.outerHTML = movedPiece.outerHTML;
}

function pieceDragEnd(event) {
    event.target.outerHTML = '<img class="empty" player="empty" src="img/empty.png">';
}

function clearMoves() {
    for (let i = 0; i < chessboard.childNodes.length; i++) {
        chessboard.childNodes[i].classList.remove("red", "yellow", "green");
    }
    console.log("clear !");
}
