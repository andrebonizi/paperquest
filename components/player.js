export default class Player {


  constructor() {
    this.animation = false;
    this.moving = false;

    this.position = 0;
    this.sprite = 0;
    this.steps = 10;
    
    this.direction = 'right';
    this.state = 'explore';
    
    this.sprites = [
      'public/assets/char/Deko_0.png',
      'public/assets/char/Deko_1.png',
      'public/assets/char/Deko_2.png',
      'public/assets/char/Deko_3.png'
    ]

    this.voice = document.createElement('p');

    this.body = document.createElement('img');
    this.body.id = 'player';
    this.body.classList.add('stand');
    this.body.classList.add('look-right');
    this.body.style.left = this.position;
    this.body.setAttribute('src', 'public/assets/char/Deko_0.png')
    this.body.append(this.voice)

    this.start();
  }

  animate(animation) {
    if(this.animation) return
    this.animation = true;
    switch(animation){
      case 'walk': 
        switch(this.sprite) {
          case 0: this.sprite=2;break;
          case 1: this.sprite=3;break;
          case 3: this.sprite=0;break;
          case 2: this.sprite=1;break;
        }
        this.setSprite(this.sprites[this.sprite]);
        setTimeout(()=>{
          this.animation = false;
        }, 100);
      break;
    }
    
  }

  setSprite(sprite) {
    this.body.setAttribute('src', sprite)
  }

  look(direction){
    if (direction !== 'right' && direction !== 'left') return;
    if (this.direction !== direction) {
        this.body.classList.toggle("look-right");
        this.body.classList.toggle("look-left");
    }
    this.direction = direction;
  }
  move(direction){
    if (direction !== this.direction) { this.look(direction); return; }
    //this.state === 'explore' ? this.walk(direction) : 
    this.walk(direction);
  }
  walk(direction){
    this.animate('walk');
    this.position += this.steps * this.positionIncrement(direction);
    if (this.hitScreenBorder()) {
      this.position -= this.steps * this.positionIncrement(direction);
      return;
    }
    this.body.style.left = this.position + 'px';
  }
  
  hitScreenBorder() {
    return !(this.position >=0 && this.position <= window.innerWidth - 64)
  }
  positionIncrement(direction) {
    return direction === 'right' ? 1 : -1;
  }
  run(){}
  speak(words) {
    console.log(words)
    this.voice.innerHTML = words;
    setTimeout(()=>{
        this.voice.innerHTML = '';
    }, 5000)
  }
  
  shift() {
    this.state = this.state === 'explore' ? 'fight' : 'explore';
  }

  stand(){
    this.body.classList.remove("crouch");
    this.body.classList.add("stand");
  }
  
  duck() {
    this.body.classList.add("crouch");
    this.body.classList.remove("stand");
  }

  setLooking(x){
    const relativePosition = this.position+30;
    if (x+50 > relativePosition) this.look('right');
    if (x-20 < relativePosition) this.look('left');
  }

  getMouseLookX(event) {
    this.setLooking(event.clientX)
  }

  getMouseClickX(event) {
    clearInterval();
    this.setLooking(event.clientX)
    this.moving = true;
  }

  keyProcessing(event) {
    const keyName = event.key;
    switch(keyName) {
        case 'w': this.stand();break;
        case 's': this.duck();break;
        case 'd': this.move('right'); break;
        case 'a': this.move('left'); break;
        case 'Shift': this.shift(); break;
    }
  }

  start(){
    setInterval(()=>{
      if(this.moving) {
        this.move(this.direction);
      }
    }, 100);

    const lookListener = (e)=>{ this.getMouseLookX(e) };
    const clickListener = (e)=>{ this.getMouseClickX(e) };
    const keyListener = (e)=>{ this.keyProcessing(e) };
    document.addEventListener('mousemove', lookListener)
    document.addEventListener('mousedown', clickListener)
    document.addEventListener('mouseup', () => {
      clearInterval();
      this.moving = false;
      this.sprite = 0;
      this.setSprite(this.sprites[this.sprite]);
    })
    document.addEventListener('keydown', keyListener);    
  }

}