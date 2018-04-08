import './boardList.html'
import './boardList.styl'

Template.boardList.helpers({
    'getBoards'() {
        return Chessboards.find().fetch().filter(board => board.players.length < 2)
    }
})

Template.boardList.events({

})
