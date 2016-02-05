describe("Board", function() {

  var capitalize = function(word) {
    return word[0].toUpperCase() + word.slice(1);
  };


  var verifyConflictTypes = function(expectedConflicts, matrix){
    // The Board() constructor will accept a matrix and build that into a (Backbone) Board object (as defined in Board.js)
    var board = new Board(matrix);
    _.map('row col rooks majorDiagonal minorDiagonal queens'.split(' '), function(conflictType){
      var conflictDetected = board['hasAny' + capitalize(conflictType) + 'Conflicts']();
      var conflictExpected = _(expectedConflicts).contains(conflictType);
      var message = conflictExpected ? 'should' : 'should not';

      it(message + " find a " + conflictType + " conflict", function() {
        expect(conflictDetected).to.be.equal(conflictExpected);
      });
    });
  };

  xdescribe("Empty board", function() {
    console.log('Empty Board test');
    verifyConflictTypes([''], [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ]);
  });

  xdescribe("Board with row conflicts", function() {
    console.log("Board with row conflicts test")
    verifyConflictTypes(['row', 'rooks', 'queens'], [
      [0, 0, 0, 0],
      [1, 1, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ]);
  });

  xdescribe("Board with col conflicts", function() {
    console.log("board with column conflicts")
    verifyConflictTypes(['col', 'rooks', 'queens'], [
      [1, 0, 0, 0],
      [0, 0, 0, 0],
      [1, 0, 0, 0],
      [0, 0, 0, 0]
    ]);
  });

  xdescribe("Board with easy major diagonal conflict", function() {
    verifyConflictTypes(['majorDiagonal', 'queens'], [
      [0, 1, 0, 0],
      [0, 0, 1, 0],
      [0, 0, 0, 1],
      [0, 0, 0, 0]
    ]);
  });

  describe("Board with hard major diagonal conflict", function() {
    console.log("Beginning hard major Diag con test", "^^^^^^^^^^^^^^^^^^^")
    verifyConflictTypes(['majorDiagonal', 'queens'], [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [1, 0, 0, 0],
      [0, 1, 0, 0]
    ]);
  });

  xdescribe("Board with easy minor diagonal conflict", function() {
    verifyConflictTypes(['minorDiagonal', 'queens'], [
      [0, 0, 1, 0],
      [0, 1, 0, 0],
      [1, 0, 0, 0],
      [0, 0, 0, 0]
    ]);
  });

  xdescribe("Board with hard minor diagonal conflict", function() {
    verifyConflictTypes(['minorDiagonal', 'queens'], [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 1],
      [0, 0, 1, 0]
    ]);
  });
});
