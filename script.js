window.onload = function() {
    let urlParams = new URLSearchParams(window.location.search);
    let player1 = urlParams.get('player1');
    let player2 = urlParams.get('player2');
    let player3 = urlParams.get('player3');
    let player4 = urlParams.get('player4');
    let matrixSize = urlParams.get('matrix_size');

    let p1 = document.getElementById("player1name");
    p1.textContent = player1;

    let p2 = document.getElementById("player2name");
    p2.textContent = player2;

    let p3 = document.getElementById("player3name");
    p3.textContent = player3;

    let p4 = document.getElementById("player4name");
    p4.textContent = player4;

    createMatrix(matrixSize);
    
}


/*Boton Generate
1. Incrementa el contador de puntos ✅
2. Valida cuando llega a 25 dicho contador
3. Genera el numero random seleccionado (el cual no se puede repetir) ✅
4. Muestra dicho mensaje y modifica el valor de la bola ✅
5. Valida si hay en cada carton un carton lleno, line vertical, horizontal o diagonal
*/
let data = 0;
let numeros = [];

function increment() {
    if (data == 0){
        for(let i = 0; i<50; i++){
            numeros[i] = i+1;
        }
    }

    let counterRounds = document.querySelector(".Quantity");
    data = data + 1;
    counterRounds.textContent = data;
    counterRounds.innerText = data;

    random();
}

function random(){
    const value = Math.floor(Math.random() * numeros.length);
    const chosenOne = numeros[value];
    numeros.splice(Math.floor(Math.random() * numeros.length), 1);
    const counter = document.querySelectorAll(".Counter");
    counter.forEach(c =>{
        c.textContent = chosenOne;
    })

    popup();
}

function popup(){
    document.body.classList.add("active-popup");
}

document.querySelector(".popup .close-btn").addEventListener("click", function(){
    document.body.classList.remove("active-popup");
})


/*Matriz*/
const cards = document.querySelectorAll(".bingo-card");

function createMatrix(size) {
    console.log(size);
    cards.forEach(card => {
        card.innerHTML = ''; 
        for (let i = 0; i < size; i++){
            
            const div1 = document.createElement('div');
            div1.classList.add('row');
            let numbers = generateList();

            for (let j = 0; j < size; j++) {
                const div2 = document.createElement('div');
                div2.classList.add('value');

                numbers = choose(numbers, div2);


                div1.appendChild(div2);
            }

            if (size == 3){
                div1.style.gap = "8vw";
            } else if (size == 4){
                div1.style.gap = "5vw";
            } else{
                div1.style.gap = "3vw";
            }
            
            card.appendChild(div1);
        }
        
    })   
}

function generateList(){
    const numeros = [];
    for(let i = 0; i<50; i++){
        numeros[i] = i+1;
    }
    return numeros;
}

function choose(array, div2){
    const value = Math.floor(Math.random() * array.length);
    const chosenOne = array[value];
    array.splice(Math.floor(Math.random() * numeros.length), 1);

    div2.textContent = chosenOne;
    div2.innerText = chosenOne;
    
    return array;
}


/*Moverse en el Carrusel*/
const carousel = document.querySelector('.carousel');
const button2 = document.querySelectorAll(".wrapper button")
button2.forEach(btn => {
    btn.addEventListener("click", () => {
        const firstCardWidth = document.querySelector(".carousel").offsetWidth;
        console.log(firstCardWidth);
        carousel.scrollLeft += btn.className == "left" ? - firstCardWidth: firstCardWidth;
    })
})