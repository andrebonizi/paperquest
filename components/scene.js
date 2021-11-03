
const SCENE_STYLE = {
    height: '800px',
    width: '1600px',
    background: 'yellow',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    position: 'relative',
    top: 0,
    transition: '300ms ease-out',
}

export function loadScene() {
  const map = document.createElement('div');
  Object.assign(map.style, SCENE_STYLE);
  const floor = document.createElement('div');
  floor.classList.add('floor');

  map.appendChild(floor);
  return map
}

export default class Scene {

  constructor() {
    this.roll = 30;
    this.map = document.createElement('div');
    this.map.id = 'scene';
    this.position = 0;
  }

  scroll(direction, player) {
    this.position+=positionIncrement(direction);
    var offsetLeft = this.position*-1*roll;
    if (hitSceneBorder() || !player.body.classList.contains('stand')) { 
        this.position-=positionIncrement(direction); return; 
    } 
    scene.style.left = offsetLeft + 'px';
    player.position = offsetLeft*-1 + playerPosition;
  }
  
  hitSceneBorder() {
    let position = this.position*roll;
    return !(position >= 0 && position < scene.offsetWidth - window.innerWidth)
  }
}