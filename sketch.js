/*
	TODO:
	Remove Vectors
	Basis Vector Based mouse Cordinates
	Arrows
	More Operations
	Usage
	gh pages
	span
	transformed grid
*/

let i_hat;
let j_hat;

let scl = 20;
let cols;
let rows;

let vectors = [];

let addVecButton;
let dropdown1;
let dropdown2;
let dropdown3;

let idCounter = 0;


function setup()
{
	let cn = createCanvas(801,401);
	i_hat = createVector(1,0);
	j_hat = createVector(0,-1);
	cn.parent("canvas");

	dropdown1 = select("#select1");
	dropdown2 = select("#select2");
	dropdown3 = select("#select3");
	addVecButton = select("#addVec");

	addVecButton.mousePressed(vectorOp);

	let option1 = createElement("option", "Add"  );
	let option2 = createElement("option", "Mult" );
	let option3 = createElement("option", "Sub"  );
	let option4 = createElement("option", "Cross");

	option1.parent("select1");
	option2.parent("select1");
	option3.parent("select1");
	option4.parent("select1");

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



	//Drawing Vectors
	strokeWeight(3);
	drawVectors();


	//Drawing Basis Vectors
	strokeWeight(4);
	stroke(255, 0, 0);
	line(0, 0, i_hat.x * scl, i_hat.y * scl);
	stroke(0, 255, 0);
	line(0, 0, j_hat.x * scl, j_hat.y * scl);


	//Drawing Cordinates
	drawCordinates();


	//Drawing Mouse Tip Points
	let mx = mouseX - ((width) / 2);
	let my = mouseY - ((height) / 2);
	strokeWeight(8);
	stroke(255, 0, 255);
	point(round(mx / scl) * scl, round(my / scl) * scl);

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
	newVec.id = idCounter;
	vectors.push(newVec);

	let option1 = createElement("option", "(" + x + "," + y + ")");
	let option2 = createElement("option", "(" + x + "," + y + ")");

	option1.attribute("value",idCounter);
	option2.attribute("value",idCounter);

	option1.style("background-color", "rgb(" +r+","+g+","+b+")");
	option1.parent("select2");
	option2.style("background-color", "rgb(" + r + "," + g + "," + b + ")");
	option2.parent("select3");

	idCounter++;
}

function mousePressed()
{
	if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height){
		let mx = mouseX-((width)/2);
		let my = mouseY-((height)/2);
		let x = round(mx / scl);
		let y = -round(my / scl);
		addVectors(x,y);
	}
}

function keyPressed()
{
	switch (keyCode)
	{
		case UP_ARROW:
			i_hat.y -= 1;
			break;
		case DOWN_ARROW:
			i_hat.y += 1;
			break;
		case RIGHT_ARROW:
			i_hat.x += 1;
			break;
		case LEFT_ARROW:
			i_hat.x -= 1;
			break;
		case 87: // W Key
			j_hat.y -= 1;
			break;
		case 83: // S Key
			j_hat.y += 1;
			break;
		case 68: // D Key
			j_hat.x += 1;
			break;
		case 65: // A Key
			j_hat.x -= 1;
			break;
	}
}



function vectorOp()
{
	let v1;
	let v2;
	let ret;
	let v1_val = dropdown2.value();
	let v2_val = dropdown3.value();
	console.log(v1_val,v2_val);

	for (let i=0;i<vectors.length;i++)
	{
		if(vectors[i].id == v1_val)
		{
			v1 = vectors[i].vec;
		}if(vectors[i].id == v2_val)
		{
			v2 = vectors[i].vec;
		}
	}

	switch (dropdown1.value())
	{
		case "Add":
			ret = p5.Vector.add(v1, v2);
			break;
		case "Mult":
			ret = p5.Vector.mult(v1,v2);
			break;
		case "Sub":
			ret = p5.Vector.sub(v1,v2);
			break;
		case "Cross":
			ret = p5.Vector.cross(v1,v2);
			break;
	}

	addVectors(ret.x,ret.y);
}


function drawCordinates()
{
	noStroke();
	textFont("Aldrich");
	textStyle(BOLD);
	textSize(10);
	let mx = mouseX - ((width) / 2);
	let my = mouseY - ((height) / 2);
	let px = round(mx / scl) * scl;
	let py = round(my / scl) * scl;
	let offset = 10;
	rect(px, py,45,15);
	fill(0);
	text(px + "," + py, px, py + offset);
}
