const chalk = require('chalk');
const readline = require('readline');
const index = require('./index.js');
const solutions = require('./solutions');
var storage = [];

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

var prefix = 'sudokuValidator>'
rl.setPrompt(prefix, prefix.length);
rl.prompt();

function createArrayOfNumbers(input){
    var toReturn = [];
    var input = input.toString();
    for (var i = 0; i < input.length; i++){
        if (typeof parseFloat(input[i]) === 'number'
                && !isNaN(parseFloat(input[i]))){

            toReturn.push(parseFloat(input[i]));
        }
    }
    return toReturn;
};

function createDisplay(array, invalidIndexes=[]){
    var returnArray = [];
    var nineSet = [];
    var display = '';

    for (var i = 0; i < array.length; i++){
        if (typeof parseFloat(array[i]) === 'number'
                && !isNaN(parseFloat(array[i]))){
            nineSet.push(parseFloat(array[i]));
        }

        if (nineSet.length === 9 || i === array.length - 1){
            returnArray.push(nineSet);
            nineSet = [];
        }
    }

    for (var i = 0; i < returnArray.length; i++){
        returnArray[i].map(function(item, index){
            var itemToAdd = item;
            var isInvalid = false;
            if(invalidIndexes.includes((i * 9)+ index)){
                isInvalid = true;
            }
            if (index === 8){
                itemToAdd = chalk.blue.underline.bold(chalk.green(' ' + item + '  '));
            } else {
                itemToAdd = chalk.blue.underline.bold(chalk.green(' ' + item) + ' |');
            }
            if (index % 9 === 0 ){
                display += '\n ';
            }
            if(isInvalid){
                if (index === 8){
                    itemToAdd = chalk.blue.underline.bold(chalk.red.bold(' ' + item + '  '));
                } else {
                    itemToAdd = chalk.blue.underline.bold(chalk.red.bold(' ' + item) + ' |');
                }
            }
            display += itemToAdd;
        })
    }

    return chalk.bgWhiteBright(display);
}

function storeInput(cmd){

    if (cmd.match(/clear/g)){
        storage = [];
    }

   if (cmd.match(/Valid/g)){
       storage = solutions.validSolution;
       const arrayOfNumbers = createArrayOfNumbers(storage);
       const testedReturn = index.testArray(arrayOfNumbers, true);
       console.log(createDisplay(arrayOfNumbers, testedReturn.invalidIndexes));
       console.log('\n', `Sudoku is correct-> ${testedReturn.arrayValid}`)
       process.exit(0);
  }

    if (cmd.match(/Invalid/g)){
        storage = solutions.inValidSolution;
        const arrayOfNumbers = createArrayOfNumbers(storage);
        const testedReturn = index.testArray(arrayOfNumbers, true);
        console.log(createDisplay(arrayOfNumbers, testedReturn.invalidIndexes));
        console.log('\n', `Sudoku is correct-> ${testedReturn.arrayValid}`)
        process.exit(0);
    }
    var array = createArrayOfNumbers(cmd);

    array.map(function(item, index){
        storage.push(item);
    });
}

console.log(chalk.green.bold('\n', 'Welcome to the Sodoku Solution Validator!\n'));
console.log(chalk.bold.blue('Enter values from top-left to bottom right of your Sudoku'), '\n');
console.log(chalk.green.bold("Once 81 characters are entered, the submitted sudoku will be validated."));
console.log('\n',
    chalk.blue("To see an INVALID sudoku type") + chalk.red.bold(" 'Invalid'", '\n'),
    chalk.blue("To see an VALID sudoku type")+ chalk.green.bold(" 'Valid'", '\n')
);

rl.on('line', function (cmd) {
    storeInput(cmd);
    if (storage.length != 81){
        console.log('\n', chalk.blue.bold('You entered ', chalk.red.bold(storage.length) + ' of ' + '81 numbers' + '\n'));
        console.log(chalk.blue("Type "+ chalk.red.bold("'clear'")+" to start over, or continue to add values", '\n'));
    }
    if (storage.length === 0){
        console.log(
            '\n',
            chalk.blue("You may add any number of integers (1-9) followed by an 'enter'"),
            '\n',
            chalk.green.bold("Once 81 characters are entered, the submitted sudoku will be validated."),
            '\n')
    } else if (storage.length === 81){
        const arrayOfNumbers = createArrayOfNumbers(storage);
        const testedReturn = index.testArray(arrayOfNumbers, true);
        console.log(createDisplay(arrayOfNumbers, testedReturn.invalidIndexes));
        console.log('\n', `Sudoku is correct-> ${testedReturn.arrayValid}`)
        process.exit(0);
    } else {
            console.log(chalk.yellow('So far your sudoku looks like this:\n'), createDisplay(createArrayOfNumbers(storage)) + '\n');
    }
    rl.setPrompt(prefix, prefix.length);
    rl.prompt();
})
    .on('close', function() {
        process.exit(0);
    });
