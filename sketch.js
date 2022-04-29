/*
** Diffusion-Limited Aggregation 
* Cristian Rojas Cardenas, April 2022
* Algorithm based on the thecodingtrain implementation.
* See the example here: 
* https://thecodingtrain.com/CodingChallenges/034-dla.html
* 
* The algorithm generates a bunch of point (walkers) over the canvas. 
* The walkers change the direction of their velocity randomly in each operation, 
* as well as they stop moving given the next scenarios:
* 
* 1.	Stuck against a wall.
* 2.	Stuck against another walker stuck.
* 
* The algorithm generates “n” walkers and evaluates their changes every “steps” frames. 
* For more information about the theory behind the algorithm please visit: 
* http://paulbourke.net/fractals/dla/
* 
*/

// Settings, values used in the algorithm execution
let settings = { 
    Play: function(){ play=true; },
    Pause: function(){ play=false; },
    Reset: function(){ init()},
    Radius: 4,
    n: 1000,
    Steps: 200,
  }
  
  function gui(){
      // Adding the GUI menu
      var gui = new dat.GUI();
      gui.width = 150;
      gui.add(settings,'Play');
      gui.add(settings,'Pause');
      gui.add(settings,'Reset');
      gui.add(settings,'Radius', 1, 10).step(1);
      gui.add(settings,'n', 100, 2000).step(100);
      gui.add(settings,'Steps', 10, 500).step(10);
  }
  
  let play = true;
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
      createCanvas(720, 400); 
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
                  if(walkers[i].detectCoalition(tree)){
  
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
  