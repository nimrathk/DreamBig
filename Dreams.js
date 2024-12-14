class Dream
{
  constructor()
  {
    this.r = 60;
    this.x = width;
    this.y = 300;
  }

  movement()
  {
    this.x = this.x - 4;
  }

  illustrate()
  {
    image(dreamImg, this.x, this.y, this.r, this.r);
    fill(255, 50);
    ellipseMode(CORNER);
    ellipse(this.x, this.y, this.r, this.r);
  }

  // hide dreams when game is over
  hide()
  {
    this.y = -300;
  }

  directions()
  {
    this.x = 350;
    this.y = 220;
  }
}