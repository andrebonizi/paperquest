
import Player from '../../components/player.js';

const container = document.createElement('div');
document.body.append(container);
console.log('eita')
//const scene = document.createElement('div');
const scene = document.querySelector('#scene')
//container.append(scene);

const player = new Player();
//const player = document.querySelector('#player')
//const voice = document.getElementById('voice')
scene.append(player)


const enemies = document.getElementsByClassName('enemy');
const npcs = document.getElementsByClassName('npc');


const itens = document.getElementsByClassName('item');

npcs[0].style.left= '1000px';

const roll = 30;
    
let playerPosition = 0;
let scenePosition = 0;

scene.dataset.position = scenePosition;


scene.append(player.body)


function scroll(direction) {
    scenePosition+=positionIncrement(direction);
    var offsetLeft = scenePosition*-1*roll;
    if (hitSceneBorder() || !player.body.classList.contains('stand')) { 
        scenePosition-=positionIncrement(direction); return; 
    } 
    scene.style.left = offsetLeft + 'px';
    player.position = offsetLeft*-1 + playerPosition;
}

function hitSceneBorder() {
    let position = scenePosition*roll;
    return !(position >= 0 && position < scene.offsetWidth - window.innerWidth)
}



function start() {
    console.log('game start');
    let rand, direction;
    for (let enemy of enemies) {
        rand = Math.random() // 0 - 1
        enemy.style.left = rand*scene.offsetWidth + 'px';
        console.log('Enemy position:', enemy.style.left)
        enemy.dataset.position = enemy.style.left.replace('-','').replace('px','');
        direction = rand > .5 ? 'look-right' : 'look-left';
        enemy.classList.add(direction);
    }
    for (let npc of npcs) {
        npc.dataset.position = npc.style.left.replace('-','').replace('px','');
    }
}

function collision(other) {
    //console.log('player:', playerPosition)
    let otherPosition = parseInt(other.dataset.position);
    console.log('other:', otherPosition)
    return (player.position+32 >= otherPosition-32 && player.position-32 < otherPosition+32)
}



var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        if(mutation.attributeName !== 'data-position') return
        
        for (let enemy of enemies) {
            collision(enemy) ? player.speak('Eita um inimigo!'): '';
        }
        for (let npc of npcs) {
            collision(npc) ? player.speak('Eae NPC!'): '';
        }
        for (let item of itens) {
            collision(item) ? player.speak('Achei um Item!'): '';
        }
    });
});

observer.observe(player.body, { attributes: true });

document.addEventListener('keydown', (event) => {
    const keyName = event.key;
    switch(keyName) {
        case 'w': player.stand();break;
        case 's': player.duck();break;
        case 'd': player.move('right'); break;
        case 'a': player.move('left'); break;
        case 'Shift': player.shift(); break;
    }
});    

start();