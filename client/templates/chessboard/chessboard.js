import './chessboard.html'
import './chessboard.styl'

import { ReactiveVar } from 'meteor/reactive-var'

Chessboard = new Mongo.Collection('Chessboard')

// variables
let board = new ReactiveVar([])

var chess_id, row_init, row_final, col_init, col_final
var first_cell = null
var curr_player = 1
var max_players = 2

// functions
function getBoard() {
    Meteor.call('getBoardById', FlowRouter.getParam('gameid'), (err, result) => {
        board.set(result)
    })
}

// template
Template.chessboard.onCreated(() => {
    getBoard()
})

Template.chessboard.helpers({
    'codeToPiece'(code) {
        let translation = {
            'r': 'rook', 'b': 'bishop', 'k': 'knight',
            'Q': 'queen', 'K': 'king', 'p': 'pawn'
        }
        let black_white = code.indexOf('2')>=0 ? 'black' : 'white'

        return translation[code[0]] + '-' + black_white
    },
    'getRows'() { return board.get().board }
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

                Meteor.call('movePiece', board.get()._id, row_init, row_final, col_init, col_final)
                getBoard()
                first_cell = null

                // change player
                if(++curr_player > max_players) curr_player = 1
            }
        }
    },
    'click .reset': evt => {
        evt.preventDefault()
        Meteor.call('resetBoard', board.get()._id)
    }
})
