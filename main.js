//Get input from the user through the terminal
const prompt = require('prompt-sync')({ sigint: true });

//Clear the terninal screen
const clear = require('clear-screen');

//Create some global variables
const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';
const row = 10;
const col = 10;
const field = [[]];

let currCharRow = 0;
let currCharCol = 0;


//Generate Field

function generateField() {

    for (let x = 0; x < row; x++) {
        field[x] = [];

        for (let y = 0; y < col; y++) {

            // Generate randomised number of holes

            let numHoles = (Math.floor(Math.random() * 10));

            if (numHoles < 3) {
                field[x][y] = hole;
            }
            // Rest of the field woul be filled up by fieldCharacter

            else {
                field[x][y] = fieldCharacter;
            }
        }

    }
    //Default Player Position when generating each field
    field[currCharRow][currCharCol] = pathCharacter;


    let x = (Math.floor(Math.random() * 10));
    let y = (Math.floor(Math.random() * 10));

    //Randomised Hat Location
    field[x][y] = hat;

}

// map method is to loop through:
// (1) all the columns and join the elements with no space
// (2) all the row and join the elements with next line ('/n)

function print() {

    clear();

    const displayString = field.map(row => {
        return row.join('');
    }).join('\n');      /// \n is next line( line break)

    console.log(displayString);     //convert to string

}

//End of Print Function

function askQuestion() {

    //prompt user to move the Character
    let getInput = prompt("Which way to want to go? ").toLowerCase();

    switch (getInput) {
        case "u":
            currCharRow--;
            break;
        case "d":
            currCharRow++;
            break;
        case "l":
            currCharCol--;
            break;
        case "r":
            currCharCol++;
            break;
        default:
            prompt("Invalid input. Please enter ONLY u,d,,l,r");
            clear();
            break;
    }
}

function startGame() {

    let isPlaying = true;

    while (isPlaying) {

        print();
        askQuestion();

        if (currCharRow < 0 || currCharRow >= row || currCharCol < 0 || currCharCol >= col) {

            console.log("Out of bounds - Game End!");
            isPlaying = false;
        }


        else if (field[currCharRow][currCharCol] == hole) {

            console.log("Sorry, you fell down a hole!");
            isPlaying = false;
        }

        else if (field[currCharRow][currCharCol] == hat) {

            console.log("Congrats, you found your hat!")
            isPlaying = false;
        }

        else {
            field[currCharRow][currCharCol] = pathCharacter;
        }
    }

}

//To print put the field
generateField();

//To start the game
startGame();
