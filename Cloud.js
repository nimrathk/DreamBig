class Cloud
{
  // constructs a Cloud object
  constructor()
  {
    this.r = 60;
    this.x = width;
    this.y = height - 130;
  }

  // hides clouds when game is over
  hide()
  {
    this.y = -200;
  }

  movement()
  {
    this.x = this.x - 7.7;
  }

  directions()
  {
    this.x = 350;
    this.y = 300;
  }

  illustrate()
  {
    image(cloudImg, this.x, this.y, this.r, this.r);
    fill(255, 50);
    // ellipseMode(CORNER);
    // ellipse(this.x, this.y, this.r, this.r);
  }
} 