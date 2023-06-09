let balls = [];

const letters = 'BSc. Creative Computing';

function setup() {
  createCanvas(800, 800);
  textSize(20);
  noStroke();
  
  textFont('Helvetica');
}

function draw() {
  background(0);
  
  
//  for(let i = 0; i < 2; i++){
//   let ball = new Ball(random(width), random(height));
//  balls.push(ball);
// }
    
    for(let i = 0;i < 10; i++){
      const rand = int(random(0,letters.length-1));
      fill((mouseX/2)+random(60,-60), mouseY/2+random(60,-60),100);
      
      textSize(random(30,60));
  
      text(letters[rand], random(width),random(height));
      
  }

  for (let i = balls.length - 1; i >= 0; i--) {
    balls[i].move();
    balls[i].display();
    balls[i].reduceLifespan();
    if (balls[i].lifespan <= 0) {
      balls.splice(i, 1);
    } else {
      for (let j = i + 1; j < balls.length; j++) {
        if (balls[i].collidesWith(balls[j])) {
          balls[i].rebound(balls[j]);
        }
      }
    }
  }
}

function mouseClicked() {
  let ball = new Ball(mouseX, mouseY);
  balls.push(ball);
}

class Ball {
  constructor(x, y) {
    this.x = x;
   this.y = y;
    this.speedX = random(-10, 10);
    this.speedY = random(-10, 0);
   this.gravity = random(-2,2);
    this.friction = 0.4;
   this.radius = random(5,30);
   this.color = color((mouseX/2)+random(60,-60), mouseY/2+random(60,-60),100);
   this.opacity = random(50,100);
   this.lifespan = 150;
    //this.size = random(4,20);
  }

  
  
  move(){
    this.y += this.speedY;
    this.x += this.speedX;
    this.speedX *= this.friction;
    this.speedY *= this.friction;
    this.speedY += this.gravity;
  
    if (this.y + this.radius > height) {
      this.y = height - this.radius;
      this.speedY *= -1;
      this.speedY *= this.friction;
    }
    if (this.y - this.radius < 0) {
      this.y = this.radius;
      this.speedY *= -1;
      this.speedY *= this.friction;
    }
    if (this.x + this.radius > width) {
      this.x = width - this.radius;
      this.speedX *= -1;
      this.speedX *= this.friction;
    }
    if (this.x - this.radius < 0) {
      this.x = this.radius;
      this.speedX *= -1;
      this.speedX *= this.friction;
    
  }
  }
  display(){
    noStroke();
    fill(this.color);
    ellipse(this.x, this.y, this.radius * 2, this.radius * 2);
  }

  collidesWith(other){
    let distance = dist(this.x, this.y, other.x, other.y);
    return distance <= this.radius + other.radius;
}
  
  

  rebound(other){
    let dx = this.x - other.x;
    let dy = this.y - other.y;
    let distance = dist(this.x, this.y, other.x, other.y);
    let unitX = dx / distance;
    let unitY = dy / distance;
    let p = 2 * (this.speedX * unitX + this.speedY * unitY - other.speedX * unitX - other.speedY * unitY) / (this.radius + other.radius);
    this.speedX -= p * other.radius * unitX;
    this.speedY -= p * other.radius * unitY;
    other.speedX += p * this.radius * unitX;
    other.speedY += p * this.radius * unitY;
  }

  reduceLifespan(){
    this.lifespan -= 2;

}
  
}
