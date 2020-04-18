const memoryArray = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H'];
let memoryValues = [];
let memoryFieldsIDs = [];
let tilesFlipped = 0;
Array.prototype.shuffleFields = function () {
    let i = this.length, j, temp;
    while (--i > 0) {
        j = Math.floor(Math.random() * (i + 1));
        temp = this[j];
        this[j] = this[i];
        this[i] = temp;
    }
};

function newBoard() {
    tilesFlipped = 0;
    let output = '';
    memoryArray.shuffleFields();
    for (let i = 0; i < memoryArray.length; i++) {
        output += '<div id="tile_' + i + '" onclick="memoryFlipTile(this,\'' + memoryArray[i] + '\')"></div>';
    }
    document.getElementById('memory_board').innerHTML = output;
}

function memoryFlipTile(tile, val) {
    if (tile.innerHTML === "" && memoryValues.length < 2) {
        tile.style.background = '#FFF';
        tile.innerHTML = val;
        if (memoryValues.length === 0) {
            memoryValues.push(val);
            memoryFieldsIDs.push(tile.id);
        } else if (memoryValues.length === 1) {
            memoryValues.push(val);
            memoryFieldsIDs.push(tile.id);
            if (memoryValues[0] === memoryValues[1]) {
                tilesFlipped += 2;
                // Clear both arrays
                memoryValues = [];
                memoryFieldsIDs = [];
                // Check to see if the whole board is cleared
                if (tilesFlipped === memoryArray.length) {
                    alert("Congratulations, You won the game!");
                    document.getElementById('memory_board').innerHTML = "";
                    newBoard();
                }
            } else {
                function flipCardToBack() {
                    const tile1 = document.getElementById(memoryFieldsIDs[0]);
                    const tile2 = document.getElementById(memoryFieldsIDs[1]);
                    tile1.style.background = '#222222 no-repeat';
                    tile1.innerHTML = "";
                    tile2.style.background = '#222222 no-repeat';
                    tile2.innerHTML = "";
                    // Clear both arrays
                    memoryValues = [];
                    memoryFieldsIDs = [];
                }
                setTimeout(flipCardToBack, 200);
            }
        }
    }
}
