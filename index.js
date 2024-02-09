window.onload = function() {
    var urlParams = new URLSearchParams(window.location.search);
    var player1 = urlParams.get('player1');
    var player2 = urlParams.get('player2');
    var player3 = urlParams.get('player3');
    var player4 = urlParams.get('player4');
    var matrixSize = urlParams.get('matrix_size');

    var p1 = document.getElementById("player1");
    p1.textContent = player1;

    var p2 = document.getElementById("player2");
    p2.textContent = player2;

    var p3 = document.getElementById("player3");
    p3.textContent = player3;

    var p4 = document.getElementById("palyer4");
    p4.textContent = player4;
    
}


