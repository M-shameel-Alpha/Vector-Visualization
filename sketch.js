let i_hat;
let j_hat;

let scl = 20;
let cols;
let rows;

let vectors = [];

let addVecButton;





function setup()
{
	let cn = createCanvas(801,401);
	i_hat = createVector(1,0);
	j_hat = createVector(0,-1);
	cn.parent("canvas");

	addVecButton = select("addVec");
	addVecButton.mousePressed();


	cols = width/scl;
	rows = height/scl;
}

function draw()
{

	background(0);
	//Drawing Grid
	drawGrid();

	//Applying Transformations
	push();
	translate(width/2,height/2);
	scale(1, 1);


	//Drawing Basis Vectors
	strokeWeight(3);
	stroke(255, 0, 0);
	line(0, 0, i_hat.x*scl, i_hat.y*scl);
	stroke(0, 255, 0);
	line(0, 0, j_hat.x*scl, j_hat.y*scl);


	//Drawing Mouse Tip Points
	let mx = mouseX - ((width) / 2);
	let my = mouseY - ((height) / 2);
	strokeWeight(8);
	stroke(255,0,255);
	point(floor(mx/scl)*scl,floor(my/scl)*scl);
	


	//Drawing Vectors
	strokeWeight(3);
	drawVectors();

	pop();
}


function drawGrid()
{
	for (let j = 0; j < cols; j++) {
		stroke(255);

		line(j * scl, 0, j * scl, height);
	}
	for (let i = -1; i < rows; i++) {
		stroke(255);

		line(0, i * scl, width, i * scl);

	}
}

function drawVectors()
{
	for (let v=0;v<vectors.length;v++)
	{
		let vec = vectors[v].vec;
		let a = i_hat.copy().mult(vec.x);
		let b = j_hat.copy().mult(vec.y);
		a.add(b);
		a.mult(scl);
		stroke(vectors[v].color);
		line(0,0,a.x,a.y);
	}
}

function addVectors(x,y)
{
	let newVec = {};
	newVec.vec = createVector(x,y);

	let r = floor(random(256));
	let g = floor(random(256));
	let b = floor(random(256));

	newVec.color = color(r,g,b);
	vectors.push(newVec);

	let option1 = createElement("option", "(" + x + "," + -y + ")");
	let option2 = createElement("option", "(" + x + "," + -y + ")");

	option1.style("background-color", "rgb(" +r+","+g+","+b+")");
	option1.parent("select1");
	option2.style("background-color", "rgb(" + r + "," + g + "," + b + ")");
	option2.parent("select2");
}

function mousePressed()
{
	if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height){
		let mx = mouseX-((width)/2);
		let my = mouseY-((height)/2);
		console.log(floor(mx / scl), floor(my / scl));
		let x = floor(mx / scl);
		let y = -floor(my / scl);
		addVectors(x,y);
	}
}

function VectorAddition()
{
	let vec1 = 
}
