function shouldStartGame() {
  send('{"start_snake_game":"true"}');
}
function snakeGameStart() {
  //Canvas stuff
  var canvas = $("#snake")[0];
  var ctx = canvas.getContext("2d");
  var w = $("#snake").width();
  var h = $("#snake").height();

  //Lets save the cell width in a variable for easy control
  var cw = 10;

  var score;
  var score2;
  var level;

  //Lets create the snake now
  var snake_array; //an array of cells to make up the snake

  var snake_array2;

  function init() {
    d = "right"; //default direction
    create_snake();

    d2 = "right";
    create_snake2();
    create_food(); //Now we can see the food particle
    //finally lets display the score

    score = 0;
    level = 1;
    score2 = 0;

    //Lets move the snake now using a timer which will trigger the paint function
    //every 60ms
    if (typeof game_loop != "undefined")
      clearInterval(game_loop);
    game_loop = setInterval(paint, 1000);
  }
  init();

  function create_snake() {
    var length = 5; //Length of the snake
    snake_array = []; //Empty array to start with
    for (var i = length - 1; i >= 0; i--) {
      //This will create a horizontal snake starting from the top left
      snake_array.push({x: i, y: 1});
    }

  }

  function create_snake2() {
    var length2 = 5; //Length of the snake
    snake_array2 = []; //Empty array to start with
    for (var l = length2 - 1; l >= 0; l--) {

      //This will create a horizontal snake starting from the top left
      snake_array2.push({x: l, y: 42});
    }

  }

  //Lets create the food now

  function create_food() {
    if (snake_upperPlayer) {
      food = {
        x: Math.round(Math.random() * (w - cw) / cw),
        y: Math.round(Math.random() * (h - cw) / cw)
      };

      send('{"snake_food_update":"true","food_x":' + food.x + ',"food_y":' + food.y + '}');

    }
    //This will create a cell with x/y between 0-44
    //Because there are 45(450/10) positions accross the rows and columns
  }

  //Lets paint the snake now

  function paint() {
    //To avoid the snake trail we need to paint the BG on every frame
    //Lets paint the canvas now

    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, w - 3, h - 3);
    ctx.strokeStyle = "black";
    ctx.strokeRect(0, 0, w - 2, h - 3);

    //The movement code for the snake to come here.
    //The logic is simple
    //Pop out the tail cell and place it infront of the head cell
    var nx = snake_array[0].x;
    var ny = snake_array[0].y;

    var nx2 = snake_array2[0].x;
    var ny2 = snake_array2[0].y;

    //These were the position of the head cell.
    //We will increment it to get the new head position
    //Lets add proper direction based movement now

    if (d == "right")
      nx++;
    else if (d == "left")
      nx--;
    else if (d == "up")
      ny--;
    else if (d == "down")
      ny++;

    if (d2 == "right")
      nx2++;
    else if (d2 == "left")
      nx2--;
    else if (d2 == "up")
      ny2--;
    else if (d2 == "down")
      ny2++;

    //Lets add the game over clauses now
    //This will restart the game if the snake hits the wall
    //Lets add the code for body collision
    //Now if the head of the snake bumps into its body, the game will restart
    if (nx == -1 || nx >= w / cw || ny == -1 || ny >= h / cw || check_collision(nx, ny, snake_array)) {
      //restart game
      //init();
      //Lets organize the code a bit now.
      return;
    }

    if (nx2 == -1 || nx2 == w / cw || ny2 == -1 || ny2 == h / cw || check_collision(nx2, ny2, snake_array2)) {
      //restart game
      //init();
      //Lets organize the code a bit now.
      return;
    }

    //Lets write the code to make the snake eat the food
    //The logic is simple
    //If the new head position matches with that of the food,
    //Create a new head instead of moving the tail
    if (nx == food.x && ny == food.y) {
      var tail = {
        x: nx,
        y: ny
      };
      score++;

      //Create new food
      create_food();
    } else {
      var tail = snake_array.pop(); //pops out the last cell
      tail.x = nx;
      tail.y = ny;
    }
    //The snake can now eat the food.

    snake_array.unshift(tail); //puts back the tail as the first cell

    if (nx2 == food.x && ny2 == food.y) {
      var tail2 = {
        x: nx2,
        y: ny2
      };
      score2++;

      //Create new food
      create_food();
    } else {
      var tail2 = snake_array2.pop(); //pops out the last cell
      tail2.x = nx2;
      tail2.y = ny2;

    }
    //The snake can now eat the food.

    snake_array2.unshift(tail2);

    for (var i = 0; i < snake_array.length; i++) {
      var c1 = snake_array[i];
      //Lets paint 10px wide cells
      paint_cell(c1.x, c1.y, "blue");
    }

    for (var i = 0; i < snake_array2.length; i++) {
      var c2 = snake_array2[i];
      //Lets paint 10px wide cells
      paint_cell(c2.x, c2.y, "red");
    }

    //Lets paint the food
    // console.log(food);

    paint_cell(food.x, food.y, "red");
    //Lets paint the score

    var score_text = "Score: " + score;
    var level_text = "Level: " + level;
    ctx.fillText(score_text, 5, h - 5);
    ctx.fillText(level_text, 60, h - 5);

    var score_text2 = "Score: " + score2;
    var level_text = "Level: " + level;
    ctx.fillText(score_text2, 120, h - 5);
  }

  //Lets first create a generic function to paint cells
  function paint_cell(x, y, color) {

    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x * cw, y * cw, 4, 0, 2 * Math.PI, false);

    ctx.fill();
  }

  function check_collision(x, y, array) {
    //This function will check if the provided x/y coordinates exist
    //in an array of cells or not
    for (var i = 0; i < array.length; i++) {
      if (array[i].x == x && array[i].y == y)
        return true;
      }
    return false;
  }

  //Lets add the keyboard controls now
  $(document).keydown(function(e) {
    var key = e.which;
    //We will add another clause to prevent reverse gear

    if (snake_upperPlayer) {
      if (key == "65" && d != "right")
        d = "left";
      else if (key == "87" && d != "down")
        d = "up";
      else if (key == "68" && d != "left")
        d = "right";
      else if (key == "83" && d != "up")
        d = "down";
      send('{"snake_move":"' + d + '"}');

    } else {
      console.log("This done");
      if (key == "65" && d != "right")
        d2 = "left";
      else if (key == "87" && d != "down")
        d2 = "up";
      else if (key == "68" && d != "left")
        d2 = "right";
      else if (key == "83" && d != "up")
        d2 = "down";
      send('{"snake_move":"' + d2 + '"}');

    }


    // if(key == "37" && d != "right") d2 = "left";
    // else if(key == "38" && d != "down") d2 = "up";
    // else if(key == "39" && d != "left") d2 = "right";
    // else if(key == "40" && d != "up") d2 = "down";

    //The snake is now keyboard controllable
  })


}
