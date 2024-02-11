
let points1 = 0;
let points2 = 0;
let points3 = 0;
let points4 = 0;
let name1 = "";
let name2 = "";
let name3 = "";
let name4 = "";

window.onload = function() {
    let urlParams = new URLSearchParams(window.location.search);
    name1 = urlParams.get('name1');
    name2 = urlParams.get('name2');
    name3 = urlParams.get('name3');
    name4 = urlParams.get('name4');

    points1 = urlParams.get("points1");
    points2 = urlParams.get("points2");
    points3 = urlParams.get("points3");
    points4 = urlParams.get("points4");

    gameOver();
    
}

/*GameOver*/
function gameOver(){
    let pN1 = document.querySelector(".name1");
    let pP1 = document.querySelector(".points1");
    let pV1 = document.querySelector(".victories1");
    let value1 = document.querySelector(".one");

    let pN2 = document.querySelector(".name2");
    let pP2 = document.querySelector(".points2");
    let pV2 = document.querySelector(".victories2");
    let value2 = document.querySelector(".two");

    let pN3 = document.querySelector(".name3");
    let pP3 = document.querySelector(".points3");
    let pV3 = document.querySelector(".victories3");
    let value3 = document.querySelector(".three");

    let pN4 = document.querySelector(".name4");
    let pP4 = document.querySelector(".points4");
    let pV4 = document.querySelector(".victories4");
    let value4 = document.querySelector(".four");

    let table = [[name1, points1], [name2, points2], [name3, points3], [name4, points4]];

    const comparePoints = (a, b) => b[1] - a[1]; 
    table.sort(comparePoints);

    i = 0;
    table.forEach(pair => {
        let p = parseInt(localStorage.getItem(pair[0]));
        if (isNaN(p)){
            p = 0;
            console.log(p);
        }
        
        if (i == 0){
            localStorage.setItem(pair[0], p+1);
            pN1.textContent = pair[0];
            pP1.textContent = pair[1];
            pV1.textContent = p+1;
            value1.style.backgroundColor = "#ffed84";

        } else if (i==1){
            if (pair[1] == table[0][1]){
                localStorage.setItem(pair[0], p+1);
                pV2.textContent = p+1;
                value2.style.backgroundColor = "#ffed84";
            } else {
                pV2.textContent = p;
            }
            pN2.textContent = pair[0];
            pP2.textContent = pair[1];
            
            
        } else if (i==2){
            if (pair[1] == table[0][1]){
                localStorage.setItem(pair[0], p+1);
                pV3.textContent = p+1;
                value3.style.backgroundColor = "#ffed84";
            } else{
                pV3.textContent = p;
            }
            pN3.textContent = pair[0];
            pP3.textContent = pair[1];;
            
        } else {
            if (pair[1] == table[0][1]){
                localStorage.setItem(pair[0], p+1);
                pV4.textContent = p+1;
                value4.style.backgroundColor = "#ffed84";
            } else {
                pV4.textContent = p;
            }
            pN4.textContent = pair[0];
            pP4.textContent = pair[1];;
            
        }        

        i++;
    })

}

document.querySelector(".goBack").addEventListener("click", function(){
    const url = new URL("./index.html", window.location.origin);
    url.searchParams.set("localStorage", localStorage);

    window.location.href = url.toString();;
})