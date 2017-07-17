module.exports = {
    inSameRow,
    inSameColumn,
    inSameSonet,
    testArray,
    isValid,
    getAllOccurancesOfNumberAsIndexes
};

function inSameRow(indexInArray, nextOccurance){
    //checks all values that are in same row due to finding the division of
    //the index by the number of rows.
    //Floor gives us thirds being rounded giving us sections of 3
    return (Math.floor(indexInArray/9) === Math.floor(nextOccurance/9));
}

function inSameColumn(indexInArray, nextOccurance){
    //checks all values that are in same column due to the modulo(remainder)
    //showing which column that index belongs to
    return (Math.floor(indexInArray % 9) === Math.floor(nextOccurance % 9));
}

function inSameSonet(indexInArray, nextOccurance){
    //intersection of top three rows && 3 columns are equal
    return (Math.floor(indexInArray/27) === Math.floor(nextOccurance/27)
        && Math.floor(nextOccurance%9/3) === Math.floor(indexInArray%9/3));
}


function isValid(firstIndex, nextIndex){

    if (inSameRow(firstIndex, nextIndex)){
        return false;
    };

    if (inSameColumn(firstIndex, nextIndex)){
        return false;
    };

    if (inSameSonet(firstIndex, nextIndex)){
        return false;
    };

    return true;
}

function getAllOccurancesOfNumberAsIndexes(array, value){
    var returnedArray = [];
    array.map((item, index)=>{
        if (item === value){
            returnedArray.push(index);
        }
    });

    return returnedArray;
}

function testArray(array, returnInvalidIndexes=false){
    var arrayValid = true;
    var invalidIndexes = [];
    if (array.length !== 81){
        return false;
    }

    for (var i = 0; i < 81; i++){
        var targetvalue = array[i];
        var indexArray = getAllOccurancesOfNumberAsIndexes(array, targetvalue);
        indexArray.map((item, index) => {
            if (item !== i){
                if (!isValid(i, item)){
                    arrayValid = false;
                    invalidIndexes.push(i);
                }
            }
        });
    }

    return returnInvalidIndexes ?
        {
            arrayValid,
            invalidIndexes
        }
          : arrayValid;
}


// called with testArray(stringOfSudoku);
//   => Will return true or false
// called with testArray(stringOfSudoku, true);
//  => Will return true or false and array of invalid indexes
