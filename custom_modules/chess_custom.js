var board,
  game = new Chess(),
  statusEl = $('#chess_status'),
  fenEl = $('#fen'),
  pgnEl = $('#pgn');
var my_chess_color = 'w';
var chess_moves = 0;
$("#chess_new_game").click(function() {
  new_chess_game();
  send('{"chess":"true", "new_game": "true"}');
});
$("#chess_flip_board").click(function() {
  board.flip();
});

// ---------------- CHESS ------------------------

// do not pick up pieces if the game is over
// only pick up pieces for the side to move
var onDragStart = function(source, piece, position, orientation) {
  if (connection) {
    if (game.game_over() === true || (game.turn() === 'w' && piece.search(/^b/) !== -1) || (game.turn() === 'b' && piece.search(/^w/) !== -1) || (game.turn() != my_chess_color) || (connection.open == false)) {
      return false;
    }
  } else {
    console.log("Not connected");
  }
};

var onDrop = function(source, target) {
  // see if the move is legal

  if(connection){
  var move = game.move({
    from: source, to: target, promotion: 'q' // NOTE: always promote to a queen for example simplicity
  });

  // illegal move
  if (move === null)
    return 'snapback';
  if (chess_moves == 0) {
    my_chess_color = 'w';
    board.orientation('white');
  }
  chess_moves++;
  send('{"chess":"true", "chess_source": "' + source + '", "chess_target": "' + target + '"}');
  console.log("source: " + source + "\ntarget: " + target);
  updateChessStatus();

}
else{
  console.log("Not connected");
}
};

// update the board position after the piece snap
// for castling, en passant, pawn promotion
var onSnapEnd = function() {
  board.position(game.fen());
};

var updateChessStatus = function() {
  var status = '';

  var moveColor = 'White';
  if (game.turn() === 'b') {
    moveColor = 'Black';
  }

  // checkmate?
  if (game.in_checkmate() === true) {
    status = 'Game over, ' + moveColor + // draw?
    ' is in checkmate.';
  } else if (game.in_draw() === true) {
    status = // game still on
    'Game over, drawn position';
  } else {
    status = moveColor + ' to move';

    // check?
    if (game.in_check() === true) {
      status += ', ' + moveColor + ' is in check';
    }
  }

  statusEl.html(status);
  console.log(status);
  fenEl.html(game.fen());
  pgnEl.html(game.pgn());
};

var cfg = {
  draggable: true,
  position: 'start',
  onDragStart: onDragStart,
  onDrop: onDrop,
  onSnapEnd: onSnapEnd
};
board = new ChessBoard('board', cfg);

updateChessStatus();

// update the board position after the piece snap
// for castling, en passant, pawn promotion
var onSnapEnd = function() {
  board.position(game.fen());
};

function new_chess_game() {
  game.reset();
  board.start();
  my_chess_color = 'w';
  chess_moves = 0;
  board.orientation('white');
  updateChessStatus();
}
var updateChessStatus = function() {
  var status = '';

  var moveColor = 'White';
  if (game.turn() === 'b') {
    moveColor = 'Black';
  }

  // checkmate?
  if (game.in_checkmate() === true) {
    status = 'Game over, ' + moveColor +// draw?
    ' is in checkmate.';
  } else if (game.in_draw() === true) {
    status =// game still on
    'Game over, drawn position';
  } else {
    status = moveColor + ' to move';

    // check?
    if (game.in_check() === true) {
      status += ', ' + moveColor + ' is in check';
    }
  }

  statusEl.html(status);
  console.log(status);
  fenEl.html(game.fen());
  pgnEl.html(game.pgn());
};
