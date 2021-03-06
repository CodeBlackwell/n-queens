// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        //console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        //console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;','color: blue;', 'color: black;', 'color: grey;');
        //console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;','color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict


    // gameBoard = [[0, 0, 0, 0],
    //              [1, 1, 0, 0],
    //              [0, 0, 0, 0],
    //              [0, 0, 0, 0]]

    hasRowConflictAt: function(rowIndex) {
     var gameBoard = this.rows();
     //loop through the rows of the gameBoard
     for(var i = 0 ; i < gameBoard.length ; i++){
      var total = 0;
      for(var j = 0; j < gameBoard[i].length ; j++){
        if(gameBoard[i][j] === 1){
          total++;
          if(total > 1){
            return true;
          }
        }
      } 
     }
     return false;
    
    },


    hasAnyRowConflicts: function() {
      for(var i = 0 ; i < this.rows().length ; i++){
       if(this.hasRowConflictAt(i)){
        return true;
       }  
      }

      return false;
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict


    //gameBoard = [1, 0, 0, 0],
    //            [0, 0, 0, 0],
    //            [1, 0, 0, 0],
    //            [0, 0, 0, 0]
    hasColConflictAt: function(columnIndex) {



     function getColumn(matrix, col){
      var column = [];
      for(var i = 0 ; i < matrix.length ; i++){
        column.push(matrix[i][col]);
      }
      return column;
      }

     function theSum(array){
      var total = 0;
      for(var i = 0 ; i < array.length ; i++){
        total += array[i];
      }
      return total;
     }



      var gameBoard = this.rows();
      var results = getColumn(gameBoard, columnIndex);
      //if the sum of the elements of the results array is > 1, return true
      if(theSum(results) > 1){
        return true
      }
    
      

      



      return false; // fixme
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
        for(var i = 0 ; i < this.rows().length ; i++){
        if(this.hasColConflictAt(i)){
          return true;
      }
    }

      return false; // fixme
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict

    // gameBoard = [];
    hasMajorDiagonalConflictAt: function(columnIndexAtFirstRow) {
      var gameBoard = this.rows();
        var sizeOfGameBoard = this.attributes.n
        var rowNum = 0;
        var total = 0;
      for(i = columnIndexAtFirstRow; i < sizeOfGameBoard; i++){
        console.log("value of gameBoard[i] in MAJDIAGCONAT", gameBoard[i]);
       if(gameBoard[i][columnIndexAtFirstRow + i]){
          total++;
        console.log("value of gameBoard[i][columnIndexAtFirstRow]", gameBoard[i][columnIndexAtFirstRow + i], "the total of current column", total, 'columnIndexAtFirstRow', columnIndexAtFirstRow);
        
        }
        
        
        if(total > 1){
          return true;
        }
      }

         
      return false; 
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      //console.log('the gameBoard within hasAnyMajorDiagonalConflicts', this.rows());
      //create a gameBoard to work with
      var gameBoard = this.attributes;
      console.log("value of this.attributes", gameBoard)
      console.log("value of this everywhere", this)
      // var size = gameBoard.length;     
      // //start at -n for the column index

      // //call hasMajorDiagonalConflictAt on all columns, if any return true, return true.
      // console.log( 'the gameBoard within hasAnyMajorDiagonalConflicts', this.rows())
      
      //   for(var i = -size; i <  size; i++){
      //     if(this.hasMajorDiagonalConflictAt(i)){
      //       return true;
      //     }
      //   }

      var size = gameBoard.length;


      for(var i = -size ; i < gameBoard.length ; i++){
          //console.log("value of this.hasMajorDiagonalConflictAt(i)",this.hasMajorDiagonalConflictAt(i));
        if( this.hasMajorDiagonalConflictAt(i) ){

          return true;
        }
      }
      return false;
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      return false; // fixme
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      return false; // fixme
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
