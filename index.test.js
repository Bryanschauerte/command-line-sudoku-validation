const index = require('./index');
const solutions = require('./solutions');

describe('Helper functions', () => {
    describe('inSameRow', () => {
        it('returns true when in same row', ()=>{
            expect(index.inSameRow(0, 2)).toBe(true);
        });

        it('returns false when not in the same row', ()=>{
            expect(index.inSameRow(0, 10)).toBeFalsy();
        });
    });

    describe('inSameColumn', function(){
        it('returns true when in same column', ()=>{
            expect(index.inSameColumn(0, 2)).toBe(false);
        });

        it('returns false when not in the same column', ()=>{
            expect(index.inSameColumn(0, 9)).toBe(true);
        });
    });

    describe('inSameSonet', function(){
        it('returns true when in same sonet', ()=>{
            expect(index.inSameSonet(0, 2)).toBe(true);
        });

        it('returns false when not in the same sonet', ()=>{
            expect(index.inSameSonet(0, 80)).toBe(false);
        });
    });

    describe('getAllOccurancesOfNumberAsIndexes', function(){
        it('returns all indexes of a chosen number from array', ()=>{
            var testArray = [1, 2, 1, 3, 1, 2, 3];
            expect(index.getAllOccurancesOfNumberAsIndexes(testArray, 2).length).toBe(2);
        });
    });
    describe('testArray', function(){
        it("returns 'True' for a valid sudoku array", ()=>{
            expect(index.testArray(solutions.validSolution)).toBe('True');
        });
        it("returns 'False' for an invalid sudoku array", ()=>{
            expect(index.testArray(solutions.inValidSolution)).toBe('False');
        });
    });
});
