/**
This is the snakes brain!
Tell the snake where to go!

**/

function snake_brain() {
	move_left()
}


/**
All of the code below this should not be touched.
If you like you can have a look, but these are here to help you snake get the apple!
**/

//config object used to set the parameters of the game. This object is passed to the worker thread to initialize it
var config = new Object();
config.grid_size = 20;
config.number_obstacles = 0;
config.square_size = 13;
config.snake_length = 5;
config.runTimeout = 0;

//the canvas used to draw the state of the game
var ctx;

//some local variables used by the worker to track it's state.
var stats = new Object();
stats.moves = 0;
stats.food = 0;
stats.count = 0;
var squares;
var empty_square = 0;
var food_square = 2;
var wall_square = 3;
var stump_square = 4;
var snake;
var food;
var moves = new Array();

function init(){
	ctx = document.getElementById('canvas').getContext("2d");
	
	squares = new Array(config.grid_size);
	for(var i=0;i<config.grid_size;i++){
		squares[i] = new Array(config.grid_size);
	}
	//initialize square values, set walls
	for(var i=0;i<config.grid_size;i++){
		for(var j=0;j<config.grid_size;j++){
			if(i == 0 || j == 0 || i == config.grid_size-1 || j == config.grid_size-1){
				squares[i][j] = 3;
			}else{
				squares[i][j] = 0;
			}
		}
	}

	//place the snake, obstacles, and food.
	snake = place_snake(config.snake_length);
	place_obstacles(config.number_obstacles);
	place_food();
	refresh_view();
}

//Redraw the screen based on the state of the game, which is passed from the worker
function refresh_view(){
	//stop when we reach 100, this is so we have consistent sample sizes
	if(stats.food >= 100)
		stop();
	//output some stats about our performance
	document.getElementById('moves_val').innerHTML = stats.moves;
	document.getElementById('food_val').innerHTML = stats.food;
	document.getElementById('avg_moves_val').innerHTML = stats.moves/(stats.food);
	//draw the squares, color based on what type of square
	for(var i=0;i<config.grid_size;i++){
		for(var j=0;j<config.grid_size;j++){
			switch(squares[i][j]){
			case 0:
				//empty
				ctx.fillStyle = "#fff";
				ctx.beginPath();
				ctx.rect(i*config.square_size, j*config.square_size, config.square_size-1, config.square_size-1);
				ctx.closePath();
				ctx.fill();
				ctx.beginPath();
				ctx.rect(i*config.square_size, j*config.square_size, config.square_size, config.square_size);
				ctx.closePath();
				ctx.fillStyle = "#000";
				ctx.stroke();
				break;
			case 1:
				//path
				ctx.fillStyle = "#C3D9FF";
				ctx.beginPath();
				ctx.rect(i*config.square_size,j*config.square_size, config.square_size, config.square_size);
				ctx.closePath();
				ctx.fill();
				break;
			case 2:
				//food
				ctx.fillStyle = "#c33";
				ctx.beginPath();
				ctx.rect(i*config.square_size,j*config.square_size, config.square_size, config.square_size);
				ctx.closePath();
				ctx.fill();
				break;
			case 3:
				//wall
				ctx.fillStyle = "#999";
				ctx.beginPath();
				ctx.rect(i*config.square_size,j*config.square_size, config.square_size, config.square_size);
				ctx.closePath();
				ctx.fill();
				break;
			case 4:
				//obstacle
				ctx.fillStyle = "#000000";
				ctx.beginPath();
				ctx.rect(i*config.square_size,j*config.square_size, config.square_size, config.square_size);
				ctx.closePath();
				ctx.fill();
				break;
			default:
				if(squares[i][j] == 5){
					//head
					ctx.fillStyle = "#00FF00";
					ctx.beginPath();
					ctx.rect(i*config.square_size,j*config.square_size, config.square_size, config.square_size);
					ctx.closePath();
					ctx.fill();
					break;
				}
				if(squares[i][j] == 4+snake.length){
					//tail
					ctx.fillStyle = "#0000A0";
					ctx.beginPath();
					ctx.rect(i*config.square_size,j*config.square_size, config.square_size, config.square_size);
					ctx.closePath();
					ctx.fill();
					break;
				}
				//body
				ctx.fillStyle = "#800080";
				ctx.beginPath();
				ctx.rect(i*config.square_size,j*config.square_size, config.square_size, config.square_size);
				ctx.closePath();
				ctx.fill();
				break;				
			}
		}
	}
}

function get_apple_point() {
	for(var x=0;x<config.grid_size;x++){
		for(var y=0;y<config.grid_size;y++){
			if(squares[x][y] == 2) {
				apple_point = new Point(x,y);
				return apple_point
			}
		}
	}
}

function apple_is_above() {
	apple = get_apple_point();
	snake_head = snake[0];
	if (apple.y < snake_head.y) {
		return true
	}
	return false
}

function apple_is_below() {
	apple = get_apple_point();
	snake_head = snake[0];
	if (apple.y > snake_head.y) {
		return true
	}
	return false
}

function apple_is_left() {
	apple = get_apple_point();
	snake_head = snake[0];
	if (apple.x < snake_head.x) {
		return true
	}
	return false
}

function apple_is_right() {
	apple = get_apple_point();
	snake_head = snake[0];
	if (apple.x > snake_head.x) {
		return true
	}
	return false
}

function is_danger(point) {
	if (point > 2){
		return true
	}
	return false
}

function tail_is_not_above() {
	snake_head = snake[0];
	square_above = squares[snake_head.x][snake_head.y - 1]
	if (is_danger(square_above)) {
		return false
	}
	return true
}

function tail_is_not_below() {
	snake_head = snake[0];
	square_below = squares[snake_head.x][snake_head.y + 1]
	if (is_danger(square_below)) {
		return false
	}
	return true
}

function tail_is_not_left() {
	snake_head = snake[0];
	square_left = squares[snake_head.x - 1][snake_head.y]
	if (is_danger(square_left)) {
		return false
	}
	return true
}

function tail_is_not_right() {
	snake_head = snake[0];
	square_right = squares[snake_head.x + 1][snake_head.y]
	if (is_danger(square_right)) {
		return false
	}
	return true
}

function stump_is_not_above() {
	snake_head = snake[0];
	square_above = squares[snake_head.x][snake_head.y - 1]
	if (square_above == stump_square) {
		return false
	}
	return true
}

function stump_is_not_below() {
	snake_head = snake[0];
	square_below = squares[snake_head.x][snake_head.y + 1]
	if (square_below == stump_square) {
		return false
	}
	return true
}

function stump_is_not_left() {
	snake_head = snake[0];
	square_left = squares[snake_head.x - 1][snake_head.y]
	if (square_left == stump_square) {
		return false
	}
	return true
}

function stump_is_not_right() {
	snake_head = snake[0];
	square_right = squares[snake_head.x + 1][snake_head.y]
	if (square_right == stump_square) {
		return false
	}
	return true
}

function move_up() {
	point = new Point(snake[0].x, snake[0].y - 1)
	moves.unshift(point)
}

function move_down() {
	point = new Point(snake[0].x, snake[0].y + 1)
	moves.unshift(point)
}

function move_left() {
	point = new Point(snake[0].x - 1, snake[0].y)
	moves.unshift(point)
}

function move_right() {
	point = new Point(snake[0].x + 1, snake[0].y)
	moves.unshift(point)
}

//Point class, used to refer to a specific square on the grid
function Point(pos_x,pos_y){
	this.x = pos_x;
	this.y = pos_y;
}


//This function runs repeatedly. Checks if we should move, or search for more moves, and carries out the moves.
function run(){
	//stop at 100 food, for statistical purposes:
	if(stats.food >= 100){
		clearTimeout(config.runTimeout);
		return;
	}
	//moves is a list of moves that the snake is to carry out. IF there are no moves left, then run a search to find more.
	if(moves.length == 0){
		snake_brain()
	}else{
		//we still have moves left, so move the snake to the next square.
		move(moves.shift());
	}
	//send the new state to the browser
	refresh_view();
	//wait and then continue with the next move.
	clearTimeout(config.runTimeout);
	config.runTimeout = setTimeout(run, 100);//need to wait a bit, otherwise CPU get overloaded and browser becomes unresponsive.
}

//updates scores of child nodes
function update_scores(parent){
	for(var i=0;i<parent.children.length;i++){
		parent.children[i].g_score = parent.g_score+1;
		parent.children[i].h_score = heuristic_estimate(parent.children[i].point);
		parent.children[i].f_score = parent.children[i].g_score + parent.children[i].h_score;
		//recursively update any child nodes that this child might have.
		update_scores(parent.children[i]);
	}
}

//start the run function
function start(){
	init();
	config.runTimeout = setTimeout(run, 100);
	stats.moves = 0;
	stats.food = 0;
	stats.count = 0;
}

//stop the run function
function stop(){
	clearTimeout(config.runTimeout);
}

//move the snake to the new Point given
function move(new_head){
	//check that this is a legal move. Square must be adjacent and empty (can move to empty, food or path.
	if((!is_adjacent(new_head,snake[0])) || squares[new_head.x][new_head.y] > 2){
		return false;
	}
	//if we are at a food square, put a new food on the grid, and keep stats.
	if(squares[new_head.x][new_head.y] == 2){
		place_food();
		stats.food++
		newSnake = new Array(snake.length + 1)
		newSnake[0] = new Point(new_head.x, new_head.y);
		squares[newSnake[0].x][newSnake[0].y] = 5
		for (var i = 1; i < newSnake.length; i++) {
			newSnake[i] = snake[i - 1]
		};
		snake = newSnake
	}
	else {
		//clear the tail
		squares[snake[snake.length-1].x][snake[snake.length-1].y] = 0;
		//move the snake forward
		for(var i=snake.length-1;i>0;i--){
			snake[i].x = snake[i-1].x;
			snake[i].y = snake[i-1].y;
		}
		snake[0].x = new_head.x;
		snake[0].y = new_head.y;
		
		//update squares with new snake information for redrawing
		for(var i=0;i<snake.length;i++){
			squares[snake[i].x][snake[i].y] = 5+i;
		}
	}
	
	//keep stats
	stats.moves++;
	return true;
}

//place the snake on the grid. 
function place_snake(length){
	var middle_x = Math.floor(config.grid_size/2);
	var middle_y = Math.floor(config.grid_size/2);
	var snake = new Array(length);
	while(length){
		squares[middle_x+length][middle_y] = 4+length;
		snake[length-1] = new Point(middle_x+length,middle_y);
		length--;
	}
	return snake;
}

//helper function checks if two points are adjacent. Used to check if moves are legal.
function is_adjacent(point1, point2){
	if(point1.x == point2.x && (point1.y == point2.y-1 || point1.y == point2.y+1))
		return true;
	if(point1.y == point2.y && (point1.x == point2.x-1 || point1.x == point2.x+1))
		return true;
	return false;
}

//randomly place obstacles on the grid.
function place_obstacles(count){
	for(var c=0;c<count;){
		var random_x = Math.floor(Math.random()*(config.grid_size-2))+1;
		var random_y = Math.floor(Math.random()*(config.grid_size-2))+1;
		if(squares[random_x][random_y] == 0){
			squares[random_x][random_y] = 4;
			c++;
		}
	}
}

//randomly place a food pellet on the grid.
function place_food(){
	do{
		var random_x = Math.floor(Math.random()*(config.grid_size-2))+1;
		var random_y = Math.floor(Math.random()*(config.grid_size-2))+1;
	}while(squares[random_x][random_y] != 0);
	squares[random_x][random_y] = 2;
	food = new Point(random_x,random_y);
}
