import Player from '../../components/player.js';
import { loadScene } from '../../components/scene.js';

var container = document.getElementById('container');
document.body.append(container);

const scene = loadScene();
container.append(scene);
const player = new Player();
scene.append(player.body);



const enemies = document.getElementsByClassName('enemy');

let npcs = ['guard'];
npcs = npcs.map(()=>{
    const npc = document.createElement('div');
    npc.classList.add('npc');
    scene.append(npc);
    return npc;
})

console.log(npcs.length)
document.getElementsByClassName('npc');
const itens = document.getElementsByClassName('item');

npcs[0].style.left= '100px';


const roll = 30;
let scenePosition = 0;
scene.dataset.position = scenePosition;

function start() {
    console.log('game start');
    document.body.append(scene);
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


start();