import hello_word from './hello.js';
import world_word from './world.js';
import '../style/index.css';

document.querySelector("#root").innerHTML = hello_word + " " + world_word;