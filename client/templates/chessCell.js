import { Template } from 'meteor/templating'
import { ReactiveVar } from 'meteor/reactive-var'

Template.chessCell.helpers({
    codeToPiece(code) {
        let translation = {
            'r': 'rook', 'b': 'bishop', 'k': 'knight',
            'Q': 'queen', 'K': 'king', 'p': 'pawn'
        }
        let black_white = code.indexOf('2')>=0 ? 'black' : 'white'

        return translation[code[0]] + '-' + black_white
    }
})

Template.chessCell.events({

})
