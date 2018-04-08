import './previewBoard.html'
import './previewBoard.styl'

Template.previewBoard.helpers({
    codeToPiece(code) {
        let translation = {
            'r': 'rook', 'b': 'bishop', 'k': 'knight',
            'Q': 'queen', 'K': 'king', 'p': 'pawn'
        }
        let black_white = code.indexOf('2')>=0 ? 'black' : 'white'

        return translation[code[0]] + '-' + black_white
    }
})

Template.previewBoard.events({

})
