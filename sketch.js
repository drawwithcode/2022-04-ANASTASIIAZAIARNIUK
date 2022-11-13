var lines = []
var penColor
var bgColor
var penWidth
var clearBut
var penShape 
var penRandom

function setup() {
  createCanvas(windowWidth, windowHeight - 180);
  angleMode(DEGREES);
  noiseDetail(4)

  var options = createDiv().style("display: flex"); 

  var optionsName = createDiv().parent(options); 
  createP("Pen Color (checkbox to get random colors!)").parent(optionsName).style("margin-left: 30px");
  createP("Background color").parent(optionsName).style("margin-left: 30px");
  createP("Pen Width").parent(optionsName).style("margin-left: 30px");
  createP("Pen Shape").parent(optionsName).style("margin-left: 30px");


  var optionsValues = createDiv().parent(options).style("margin: 10px 40px; width: 80px");
  penColor = createColorPicker("#ffffff").parent(optionsValues);
  penRandom = createCheckbox ("", false).parent(optionsValues).style("display: inline")
  bgColor = createColorPicker("#lelele").parent(optionsValues).style("margin-top: 10px");
  penWidth = createSelect(false).parent(optionsValues).style("margin-top: 10px");
  penWidth.option (1);
  penWidth.option (2);
  penWidth.option (3);
  penWidth.option (4);
  penWidth.option (5);
  penWidth.option (6);
  penWidth.option (7);
  penWidth.option (8);
  penWidth.option (9);
  penWidth.option (10);
  penWidth.option (16);
  penWidth.option (24);
  penWidth.option (32);

  penShape = createSelect(false).parent(optionsValues).style("margin-top: 10px; width: 50px; height: 25px");
  penShape.option("Line");
  penShape.option("Circle");
  penShape.option("Rectangle");
  penShape.option("Triangle");
  penShape.option("Star");

  clearBut = createButton("Clear").parent(options).style("width: 100px"); 
}
 
function draw() {
  background(bgColor.value());

  if (penRandom.checked()) {
    var r = hex(floor(map(noise(frameCount / 100), 0, 1, 0, 255)), 2);
    var g = hex(floor(map(noise(frameCount / 100 + 1000), 0, 1, 0, 255)), 2);
    var b = hex(floor(map(noise(frameCount / 100 + 2000), 0, 1, 0, 255)), 2);
  
    penColor.value("#" + r + g + b); 

  }

  


  clearBut.mousePressed(function(){
    lines = []
  })

  if (mouseIsPressed) {
    var line = new MyLine(penColor.value(), penWidth.value(), penShape.value());
    lines.push(line);
  }

  for (var line of lines) {
    line.show()
  }
}

class MyLine {
  constructor(penColor,penWidth, penShape ) {
    this.px = pwinMouseX; 
    this.py = pwinMouseY;
    this.x = winMouseX;
    this.y = winMouseY;

    this.penColor = penColor;  
    this.penWidth = penWidth; 
    this.penShape = penShape;  
  }
  show() {
    if (this.penShape === "Line") {
      stroke(this.penColor);
     strokeWeight(this.penWidth);
     line(this.px,this.py, this.x, this.y);
    }
    if (this.penShape === "Circle") {
      fill(this.penColor); 
      noStroke()
      ellipse(this.x, this.y, this.penWidth)
    } 
    if (this.penShape === "Rectangle") {
      fill(this.penColor); 
      noStroke()
      rect(this.x, this.y, this.penWidth)
    }
    if (this.penShape === "Triangle") {
      fill(this.penColor);
      noStroke()

      push()

      translate(this.x, this.y)

      beginShape()
      for (var i = 0; i < 360; i += 120) {
        var rad = this.penWidth / 2; 
        var x = rad * cos(i);
        var y = rad * sin(i); 
        vertex(x,y)  
      }
      endShape(CLOSE)
      pop()
    }
    if (this.penShape === "Star") {
      fill(this.penColor);
      noStroke()

      push()

      translate(this.x, this.y)

      beginShape()
      for (var i = 0; i < 720; i += 720 / 5) {
        var rad = this.penWidth / 2; 
        var x = rad * cos(i);
        var y = rad * sin(i); 
        vertex(x,y)  
      }
      endShape(CLOSE)
      pop()
    }
  }
}
