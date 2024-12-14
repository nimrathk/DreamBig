class Lily
  {
    //Constructs a Lily object with coordinates x & y
    constructor()
    {
      this.r = 80;
      this.x = 60;
      this.y = -200;
      this.vy = 0;
      this.gravity = 0.9;
    }

    // bring lily onto screen when time to play
    play()
    {
      this.y = height - 100;
    }

    // hides lily after game is over
    hide()
    {
      this.y = -100;
    }

    // gives Lily the ability to jump up 
    jump()
    {
      if(this.y == height - 110)
      {
        this.vy = -21.3;
      }
    }

    // when lily collides with a cloud
    hits(cloud)
    {
      let x1 = this.x + this.r * 0.5;
      let y1 = this.y + this.r * 0.5;
      let x2 = cloud.x + cloud.r * 0.5;
      let y2 = cloud.y + cloud.r * 0.5;
      return collideCircleCircle(x1, y1, this.r, x2, y2, cloud.r);
    }

    // when lily collides with a dream
    collects(dream)
    {
      let x1 = this.x + this.r * 0.5;
      let y1 = this.y + this.r * 0.5;
      let x2 = dream.x + dream.r * 0.5;
      let y2 = dream.y + dream.r * 0.5;
      return collideCircleCircle(x1, y1, this.r, x2, y2, dream.r);
    }

    // lily moves
    movement()
    {
      // alters Lily's y-position based on her velocity
      this.y = this.y + this.vy;

      //adds the effects of gravity to Lily's vertical velocity
      this.vy = this.vy + this.gravity;

      // makes sure lily doesn't go below the ground
      this.y = constrain(this.y, 0, height - 110);
    }
    
    // when drawn, the Lily object will be depicted as a cirlce at coordinates x & y with a diameter of r
    illustrate()
    {
      image(lilyImg, this.x, this.y, this.r, this.r);
      fill(255, 50);
      // ellipseMode(CORNER);
      // ellipse(this.x, this.y, this.r, this.r);
    }
    
  } 