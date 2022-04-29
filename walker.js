class Walker {
    constructor(x, y) {
        this.position = createVector(x, y);
        this.color = color(255, 255, 255);
    }

    distance(a, b){
        var dx = (a.x - b.x);
        var dy = (a.y - b.y);
        return dx*dx + dy*dy;
    }

    // Check with all neighbors and walls a colition
    detectCoalition(tree){
        if (this.position.x + settings.Radius >= width  || 
            this.position.y + settings.Radius >= height || 
            this.position.x - settings.Radius <= 0      || 
            this.position.y - settings.Radius <= 0){
                return true;
            } 
                
        for (let i = 0; i < tree.length; i++) {
            var distance = this.distance(this.position, tree[i].position);
            if(distance <= 2*settings.Radius*settings.Radius){
                return true;
            }
        }

        return false;
    }

    // Create a random velocity and move the walker in that direction
    move(){
        var vel = p5.Vector.random2D();
        this.position.add(vel);     
        constrain(this.position.x, 0, width);
        constrain(this.position.y, 0, height);
    }

    render(){
        fill(this.color);
        strokeWeight(0.2);
        circle(this.position.x, this.position.y, settings.Radius*2);
    }
}