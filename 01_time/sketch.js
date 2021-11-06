/* global p5 */
/* global x */
/* global y */
/* global x2 */
/* global y2 */
/* global x3 */
/* global y3 */

function setup() {
 
  createCanvas(1000, 1000);
  background(255);
  strokeWeight(1);
  stroke(255, 204, 0);
  smooth();
    

}
function draw(){

    var centx = 300;
    var centy = 300;
  var S = second();
  var M = minute();
  var H = hour();
  var count = 0;
  for (var radius = 20; radius < 70; radius+=10){
  for (var ang = 0; ang < 360; ang += 30) {
    count++;
    var rad = radians(ang-90);
    console.log('​setup -> rad', rad);
    x = centx + (radius * cos(rad));
    y = centy + (radius * sin(rad));
    if (S >= count) {
      fill(204, 88, 3);
      circle(x, y, 10);
      
    } else {
      fill(255);
    circle(x, y, 10);
    }
      }
   } 
  count=0;
  for(var radius = 75; radius < 170; radius+=20){
    for (var ang = 0; ang < 360; ang += 30) {
      var rad = radians(ang-90);
      console.log('​setup -> rad', rad);
      x2 = centx + (radius * cos(rad));
      y2 = centy + (radius * sin(rad));
      count++;
      console.log("count==" + count + ";M="+M);
      if (  M >= count) {
        fill(226, 113, 29);
        circle(x2, y2, 20);
    
      } else {
        fill(255);
        circle(x2, y2, 20);
      }
  }   
}
 count=0;
  for(var radius = 185; radius <= 225; radius+=40){
  for (var ang = 0; ang < 360; ang += 30) {
    var rad = radians(ang-90);
    console.log('​setup -> rad', rad);
    x3 = centx + (radius * cos(rad));
    y3 = centy + (radius * sin(rad));
    count++;
    if (  H >= count) {
        fill(255, 149, 5);
        circle(x3, y3, 40);
    
      } else {
        fill(255);
        circle(x3, y3, 40);
      }
  }   

  }
}
