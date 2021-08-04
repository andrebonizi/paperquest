const player = document.querySelector('#player')
const scene = document.querySelector('#scene')
const enemies = document.getElementsByClassName('enemy');
const npcs = document.getElementsByClassName('npc');
const itens = document.getElementsByClassName('item');
npcs[0].style.left= '1000px';
const steps = 30;
const roll = 100;
    
let playerPosition = 0;
let scenePosition = 0;

scene.dataset.position = scenePosition;

player.dataset.state = 'explore';
player.dataset.direction = 'right';
player.dataset.position = playerPosition;
player.classList.add("look-right");
player.style.left = playerPosition + 'px';

function look(direction) {
    if (direction !== 'right' && direction !== 'left') return;
    if (player.dataset.direction !== direction) {
        player.classList.toggle("look-right");
        player.classList.toggle("look-left");
    }
    player.dataset.direction = direction;
}

function shift() {
    player.dataset.state = player.dataset.state === 'explore' ? 'fight' : 'explore';
}

function move(direction) {
    if (direction !== player.dataset.direction) { look(direction); return; }
    player.dataset.state === 'explore' ? scroll(direction) : walk(direction);
}

function walk(direction) {
    playerPosition+=steps*positionIncrement(direction);
    if (hitScreenBorder()) { playerPosition-=steps*positionIncrement(direction); return; }
    player.style.left = playerPosition + 'px';
    player.dataset.position = scenePosition*roll +playerPosition;
    
}

function scroll(direction) {
    scenePosition+=positionIncrement(direction);
    var offsetLeft = scenePosition*-1*roll;
    if (hitSceneBorder() || !player.classList.contains('stand')) { 
        scenePosition-=positionIncrement(direction); return; 
    } 
    scene.style.left = offsetLeft + 'px';
    player.dataset.position = offsetLeft*-1 + playerPosition;
}

function positionIncrement(direction) {
    return direction === 'right' ? 1 : -1;
}

function duck() {
    player.classList.toggle("crouch");
    player.classList.toggle("stand");
}

function hitSceneBorder() {
    let position = scenePosition*roll;
    return !(position >= 0 && position < scene.offsetWidth - window.innerWidth)
}

function hitScreenBorder() {
    return !(playerPosition >=0 && playerPosition <= window.innerWidth - 64)
}

function start() {
    console.log('start');
    let rand, direction;
    for (let enemy of enemies) {
        rand = Math.random() // 0 - 1
        enemy.style.left = rand*scene.offsetWidth + 'px';
        console.log('Enemy position:', enemy.style.left)
        enemy.dataset.position = enemy.style.left.replace('-','').replace('px','');
        direction = rand > .5 ? 'look-right' : 'look-left';
        enemy.classList.add(direction);
    }
}

function collision(other) {
    let playerPosition = parseInt(player.dataset.position/100);
    console.log('player:', playerPosition)
    //let otherPosition = parseInt(other.style.left.replace('-', '').replace('px', ''))/100;
    let otherPosition = parseInt(other.dataset.position/100);
    console.log('other:', otherPosition)
    return (playerPosition >= otherPosition && playerPosition < otherPosition+1)
}

var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        if(mutation.attributeName !== 'data-position') return
        for (let enemy of enemies) {
            collision(enemy) ? console.log('Eita um inimigo! '): '';
        }
        for (let npc of npcs) {
            collision(npc) ? console.log('Eae NPC!'): '';
        }
        for (let item of itens) {
            collision(item) ? console.log('Achou um Item!'): '';
        }
    });
});

observer.observe(player, { attributes: true });

document.addEventListener('keydown', (event) => {
    const keyName = event.key;
    switch(keyName) {
        case 's': duck();break;
        case 'd': move('right'); break;
        case 'a': move('left'); break;
        case 'Shift': shift(); break;
    }
});    

start();