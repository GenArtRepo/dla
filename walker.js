class Walker {
    
    
    constructor(x, y) {
        this.position = createVector(x, y);
        this.vel = p5.Vector.random2D();
        this.vel.mult(random(0.6,1.));
        this.color = color(255, 255, 255);
    }

    distance(a, b){
        var dx = (a.x - b.x);
        var dy = (a.y - b.y);
        return dx*dx + dy*dy;
    }

    // Check with all neighbors and walls a collision
    detectCollision(tree, detect_edges=false){

        // collision with edges
        if(detect_edges){
            if (this.position.x + settings.Radius >= width  || 
                this.position.y + settings.Radius >= height || 
                this.position.x - settings.Radius <= 0      || 
                this.position.y - settings.Radius <= 0){
                    return true;
                }
        }
        
        // collision with other walkers
        for (let i = 0; i < tree.length; i++) {
            var distance = this.distance(this.position, tree[i].position);
            if(distance <= 2*settings.Radius*settings.Radius){
            // if(distance <= 2*settings.Radius){
                return true;
            }
        }

        return false;
    }

    // Create a random velocity and move the walker in that direction
    move(){
        // var vel = p5.Vector.random2D();
        var turn = random(-.2,.2);
        this.vel.rotate(turn);
        this.position.add(this.vel);     
        if(this.position.x < settings.Radius || this.position.x > width - settings.Radius){
            this.vel.x*=-1;
        }
        if(this.position.y < settings.Radius || this.position.y > height - settings.Radius){
            this.vel.y*=-1;
        }

        // this.position.x = constrain(this.position.x, 0, width);
        // this.position.y = constrain(this.position.y, 0, height);
    }

    render(){
        fill(this.color);
        strokeWeight(0.2);
        circle(this.position.x, this.position.y, settings.Radius*2);
    }
}