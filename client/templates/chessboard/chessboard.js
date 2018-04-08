import './chessboard.html'
import './chessboard.styl'

var chess_id, row_init, row_final, col_init, col_final
var first_cell = null
var curr_player = 1
var max_players = 2

Template.chessboard.helpers({
    'codeToPiece'(code) {
        let translation = {
            'r': 'rook', 'b': 'bishop', 'k': 'knight',
            'Q': 'queen', 'K': 'king', 'p': 'pawn'
        }
        let black_white = code.indexOf('2')>=0 ? 'black' : 'white'

        return translation[code[0]] + '-' + black_white
    },
    'getRows'() { return Chessboards.findOne({ '_id' : FlowRouter.getParam('gameid') }).board }
})

Template.chessboard.events({
    'click .chess-cell': e => {
        // if the first cell hasn't been set, initialize the move
        if(first_cell == null && e.target.className.indexOf('chess-piece') > -1) {
            first_cell = e.currentTarget
            row_init = first_cell.getAttribute('data-row')
            col_init = first_cell.getAttribute('data-col')
            first_cell.classList.add('cell-selected')
        } else {
            // if the second cell is the same as the first one, cancel the move
            if(e.currentTarget === first_cell || e.target.className.indexOf('chess-piece') > -1) {
                first_cell.classList.remove('cell-selected')
                first_cell = null
            } else {
                // execute the move
                first_cell.classList.remove('cell-selected')
                row_final = e.currentTarget.getAttribute('data-row')
                col_final = e.currentTarget.getAttribute('data-col')

                Meteor.call('movePiece', FlowRouter.getParam('gameid'), row_init, row_final, col_init, col_final)
                getBoard()
                first_cell = null

                // change player
                if(++curr_player > max_players) curr_player = 1
            }
        }
    },
    'click .reset': evt => {
        evt.preventDefault()
        Meteor.call('resetBoard', FlowRouter.getParam('gameid'))
    }
})
