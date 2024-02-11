/* Records */
let size = 0;
let name1 = "";
let name2 = "";
let name3 = "";
let name4 = "";
points();



/* Puntajes */
function points(){
    let pN1 = document.querySelector(".name1");
    let pV1 = document.querySelector(".victories1");

    let pN2 = document.querySelector(".name2");
    let pV2 = document.querySelector(".victories2");

    let pN3 = document.querySelector(".name3");
    let pV3 = document.querySelector(".victories3");

    let pN4 = document.querySelector(".name4");
    let pV4 = document.querySelector(".victories4");

    const keys = Object.keys(localStorage);
    let table = [];

    
    for (let i = 0; i < keys.length; i++) {
        let values = [keys[i], localStorage.getItem(keys[i])];
        table.push(values);
    }

    const comparePoints = (a, b) => b[1] - a[1]; 
    table.sort(comparePoints);

    table = [table[0], table[1], table[2], table[3]];

    try{
        for (let i = 0; i < 4; i++) {
            if (i == 0){
                pN1.textContent = table[i][0];
                pV1.textContent = table[i][1];

            } else if (i==1){
                pN2.textContent = table[i][0];
                pV2.textContent = table[i][1];
                
                
            } else if (i==2){
                pN3.textContent = table[i][0];
                pV3.textContent = table[i][1];
                
            } else {
                pN4.textContent = table[i][0];
                pV4.textContent =table[i][1];
                
            }        

        }
    } catch (error){
    }
}

/* Info Forms*/
window.onload = function() {
    let urlParams = new URLSearchParams(window.location.search);
    name1 = urlParams.get('player1');
    name2 = urlParams.get('player2');
    name3 = urlParams.get('player3');
    name4 = urlParams.get('player4');
    size = urlParams.get('matrix_size');
    localStorage = urlParams.get('localStorage');

    try{
        let p1 = document.getElementById("player1name");
        p1.textContent = name1 + p1.textContent;
        let p2 = document.getElementById("player2name");
        p2.textContent = name2 + p2.textContent;
        let p3 = document.getElementById("player3name");
        p3.textContent = name3 + p3.textContent;
        let p4 = document.getElementById("player4name");
        p4.textContent = name4 + p4.textContent;
    } catch {

    }
    

    createMatrix(size);
    
}


/*Boton Generate*/
let data = 0;
let end = false;
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
    if (data == 25){
        end = true;
    }

    random();
}

function random(){
    const value = Math.floor(Math.random() * numeros.length);
    const chosenOne = numeros[value];
    numeros.splice(value, 1);
    const counter = document.querySelectorAll(".Counter");
    counter.forEach(c =>{
        c.textContent = chosenOne;
    })

    popup(chosenOne);
}

function popup(number){
    document.body.classList.add("active-popup");
    color(number);
}

let cards = document.querySelectorAll(".bingo-card");
function color(number){
    cards.forEach(card => {
        const values = card.querySelectorAll(".value");

        values.forEach(value => {
            if (value.textContent == number){
                
                if (card.id == "pointsPlayer1"){
                    value.style.backgroundColor = "rgb(243, 146, 146)";
                } else if (card.id == "pointsPlayer2"){
                    value.style.backgroundColor = "rgb(214, 56, 235)";
                } else if (card.id == "pointsPlayer3"){
                    value.style.backgroundColor = "rgb(62, 209, 62)";
                } else {
                    value.style.backgroundColor = "rgb(83, 155, 238)";
                }
                
            }
        })
        
        
    })  

    let card1 = document.querySelector("#pointsPlayer1");
    let points1 = document.querySelector("#player1Points")

    let card2 = document.querySelector("#pointsPlayer2");
    let points2 = document.querySelector("#player2Points")

    let card3 = document.querySelector("#pointsPlayer3");
    let points3 = document.querySelector("#player3Points")

    let card4 = document.querySelector("#pointsPlayer4");
    let points4 = document.querySelector("#player4Points")

    check(card1, points1) ;
    check(card2, points2) ;
    check(card3, points3) ;
    check(card4, points4) ;

    if (end){
        const url = new URL("https://marivictoriamb.github.io/Bingo-MartinezMaria/points.html", window.location.origin);
        url.searchParams.set("name1", name1);
        url.searchParams.set("name2", name2);
        url.searchParams.set("name3", name3);
        url.searchParams.set("name4", name4);

        url.searchParams.set("points1", document.querySelector("#player1Points").textContent);
        url.searchParams.set("points2", document.querySelector("#player2Points").textContent);
        url.searchParams.set("points3", document.querySelector("#player3Points").textContent);
        url.searchParams.set("points4", document.querySelector("#player4Points").textContent);

        window.location.href = url.toString();
    }
}

let diagonal3 = [[1, 5, 9], [3, 5, 7]] ;
let diagonal4 = [[1, 6, 11, 16], [4, 7, 10, 13]];
let diagonal5 = [[1, 7, 13, 19, 25], [5,9,13,17,21]];

function check(card, points){
    points.textContent = "0";
    let checkBoard = true;
    let checkVertical = true;
    let checkDiagonal = [true, true];
    let diagonal = 0;

    if (size == 3){
        checkVertical = [true, true, true];
        diagonal = diagonal3;
    } else if (size == 4){
        checkVertical = [true, true, true, true];
        diagonal = diagonal4;
    } else {
        checkVertical = [true, true, true, true, true];
        diagonal = diagonal5;
    }

    
    let rows = card.querySelectorAll(".row");
    rows.forEach(row =>{
        let i = 1;
        let checkHorizontal = true;

        let values = row.querySelectorAll(".value");
        values.forEach(value => {
            if (getComputedStyle(value).backgroundColor == 'rgb(53, 51, 51)' & checkHorizontal){
                checkHorizontal = false;
            } 

            if (getComputedStyle(value).backgroundColor == 'rgb(53, 51, 51)' & checkBoard){
                checkBoard = false;
            } 

            if (getComputedStyle(value).backgroundColor == 'rgb(53, 51, 51)' & i==1){
                checkVertical[0] = false;
            } else if (getComputedStyle(value).backgroundColor == 'rgb(53, 51, 51)' & i==2){
                checkVertical[1] = false;
            } else if (getComputedStyle(value).backgroundColor == 'rgb(53, 51, 51)' & i==3){
                checkVertical[2] = false;
            } else if (getComputedStyle(value).backgroundColor == 'rgb(53, 51, 51)' & i==4){
                checkVertical[3] = false;
            } else if (getComputedStyle(value).backgroundColor == 'rgb(53, 51, 51)' & i==5){
                checkVertical[4] = false;
            }

            i++;

            if (getComputedStyle(value).backgroundColor == 'rgb(53, 51, 51)'){
                let position = value.id;
                checkDiagonal[findNumberPosition(diagonal, position)] = false
            }

        })

        if (checkHorizontal){
            points.textContent =  parseInt(points.textContent) + 1;
        }

    })

    checkVertical.forEach(exist => {
        if (exist){
            points.textContent =  parseInt(points.textContent) + 1;
        }
    })

    checkDiagonal.forEach(exist => {
        if (exist){
            points.textContent =  parseInt(points.textContent) + 3;
        }
    })

    if (checkBoard){
        points.textContent =  parseInt(points.textContent) + 5;
        end = true;
    }
    
}

function findNumberPosition(matrix, number) {
    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix[i].length; j++) {
        if (matrix[i][j] === parseInt(number)) {
            return i;
        }
      }
    }
    return null; 
}

try{
    document.querySelector(".popup .close-btn").addEventListener("click", function(){
        document.body.classList.remove("active-popup");
    })
} catch{

}



/*Matriz*/
function createMatrix(size) {
    cards = document.querySelectorAll(".bingo-card");
    cards.forEach(card => {
        card.innerHTML = ''; 
        let numbers = generateList();
        let k = 1;
        for (let i = 0; i < size; i++){
            
            const div1 = document.createElement('div');
            div1.classList.add('row');

            for (let j = 0; j < size; j++) {
                const div2 = document.createElement('div');
                div2.classList.add('value');
                div2.setAttribute("id", k);

                numbers = choose(numbers, div2);


                div1.appendChild(div2);
                k ++;
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
    array.splice(value, 1);

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
        carousel.scrollLeft += btn.className == "left" ? - firstCardWidth: firstCardWidth;
    })
})





