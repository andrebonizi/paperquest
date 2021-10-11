export default class Player {
  
  constructor() {
    this.body = document.createElement('img');
    this.body.id = 'player';
    this.body.classList.add('stand');
    this.body.classList.add("look-right");
    this.position = 0;
    this.body.style.left = this.position;
    this.sprite = 'public/assets/char/deko_stand0.png'
    this.body.setAttribute('src', this.sprite)
    this.state = 'explore';
    this.steps = 10;
    this.direction = 'right';
    this.voice = document.createElement('p');
    this.body.append(this.voice)
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
}