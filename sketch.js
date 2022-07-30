/*
** Diffusion-Limited Aggregation 
* Cristian Rojas Cardenas, April 2022
* Algorithm based on the implementation by Daniel Shifman.
* See the example here: 
* https://thecodingtrain.com/CodingChallenges/034-dla.html
* 
* In this implementation, a set number of particles (walkers) are randomly placed 
* on a 2D canvas. At every time step, each walker changes it position by adding a 
* randomly generated velocity vector to its position.
* A walker will stop moving if:
* 
* 1.	It collides with an edge of the canvas, or
* 2.	It collides with another static walker.
*
* Additionally, the colour of a walker is changed when it changes state (from moving
* to static). The darkness of the shade of static walkers illustrates the distance travelled.
* 
* For more information about the theory behind the algorithm please visit: 
* http://paulbourke.net/fractals/dla/
* 
*/

// Settings, values used in the algorithm execution
let settings = { 
    Play: function(){ play=true; },
    Pause: function(){ play=false; },
    Reset: function(){ init()},
    Radius: 3,
    n: 2000,
    Steps: 1,
  }
  


  function gui(){
      // Adding the GUI menu
      var gui = new dat.GUI();
      gui.width = 150;
      gui.add(settings,'Play');
      gui.add(settings,'Pause');
      gui.add(settings,'Reset');
      gui.add(settings,'Radius', 1, 10).step(1);
      gui.add(settings,'n', 100, 5000).step(100)
      gui.add(settings,'Steps', 10, 500).step(10);
  }
  
  let play = false;
  let tree = [];
  let walkers = [];
  let walker;

  
  function init(){
      background(255);
      tree = [];
      walkers = [];
      for (let i = 0; i < settings.n; i++) {
          walker = new Walker(
              random(settings.Radius, width-settings.Radius), 
              random(settings.Radius, height-settings.Radius));
          walkers.push(walker);
      }
  }
  
  function setup(){
      gui();
      createCanvas(400, 400); 
      maxDistance = width/2*width/2 + height/2*height/2;
      init();
  }
  
  function draw(){
  
      if(play){
          background(255);
  
          // Draw the current tree composed of stuck walkers
          tree.forEach(walker => {  
              walker.render();
          });
  
          // Move the walkers
          for (let i = 0; i < settings.Steps; i++) {
                  for (let i = 0; i < walkers.length; i++) {
                  walkers[i].move();
                  
                  // In case of coaltion relocate the walker into the tree
                  if(walkers[i].detectCollision(tree)){
                      // Color processing
                      factor = walkers[i].distance(
                          walkers[i].position, 
                          createVector(width/2, height/2)
                      )/maxDistance * 255;
                      walkers[i].color = color(
                          1 - factor, 
                          1 - factor, 
                          factor);
  
                      // Relocate
                      tree.push(walkers[i]);
                      walkers.splice(i, 1);
                  }    
              }    
          }
  
          // Render the walkers not stuck yet
          walkers.forEach(walker => {  
              walker.render();
          });
          
          
  
      }
  
  }
  