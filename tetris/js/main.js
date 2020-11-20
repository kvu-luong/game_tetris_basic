document.addEventListener('DOMContentLoaded', () => {
	const grid = document.querySelector('.grid');
	const width = 10;
	let html = generateGrid(200);
	let lastRowHtml = generateLastRow(width, 'taken');
	grid.innerHTML = html+lastRowHtml;
	let squares = Array.from(document.querySelectorAll('.grid div'));
	const ScoreDisplay = document.querySelector('#score');
	const StartBtn = document.querySelector('#start-button');
	
	
	//The tetrominos
	 const lTetromino = [
	    [1, width+1, width*2+1, 2],
	    [width, width+1, width+2, width*2+2],
	    [1, width+1, width*2+1, width*2],
	    [width, width*2, width*2+1, width*2+2]
	];

	const zTetromino = [
	    [0,width,width+1,width*2+1],
	    [width+1, width+2,width*2,width*2+1],
	    [0,width,width+1,width*2+1],
	    [width+1, width+2,width*2,width*2+1]
	];

	const tTetromino = [
	    [1,width,width+1,width+2],
	    [1,width+1,width+2,width*2+1],
	    [width,width+1,width+2,width*2+1],
	    [1,width,width+1,width*2+1]
	];

	const oTetromino = [
	    [0,1,width,width+1],
	    [0,1,width,width+1],
	    [0,1,width,width+1],
	    [0,1,width,width+1]
	];

	const iTetromino = [
	    [1,width+1,width*2+1,width*3+1],
	    [width,width+1,width+2,width+3],
	    [1,width+1,width*2+1,width*3+1],
	    [width,width+1,width+2,width+3]
	];

	const theTetrominoes = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino];

	//Default: First shape of lTetromino
	let currentPosition = 4;
	let currentRotation = 0;
	//randomly select a Tetromino and its first rotation
	let random = Math.floor(Math.random() * theTetrominoes.length);
	let current = theTetrominoes[random][currentRotation];//tetromino

	
	

	draw();

	//draw the first rotation in the first tetromino
	function draw(){
		current.forEach(index => {
			squares[currentPosition + index].classList.add('tetromino');
		})
	}
	//draw the first rotation in the first tetromino
	function undraw(){
		current.forEach(index => {
			squares[currentPosition + index].classList.remove('tetromino');
		})
	}
	//make the tetromio move down every second
	 timerId = setInterval(moveDown, 1000);

	function moveDown(){
		undraw();
		currentPosition += width;
		draw();
		freeze();
	}

	//freeze 
	function freeze(){
		let nextRow = currentPosition + index + width;
		if(current.some(index => squares[nextRow].classList.contains('taken'))){
			current.forEach(index => squares[currentPosition + index].classList.add('taken'));
			//start a new tetromino falling
			random = Math.floor(Math.random() * theTetrominoes.length);
			current = theTetrominoes[random][currentRotation];
			currentPosition = 4;
			draw();
		}
	}

	
})

function generateGrid($time){
	let grid = "";
	for(let i = 0; i < $time; i++){
		grid += "<div></div>";
	}
	return grid;
}
function generateLastRow($time , classLastRow){
	let grid = "";
	for(let i = 0; i < $time; i++){
		grid += `<div class="${classLastRow}"></div>`;
	}
	return grid;
}