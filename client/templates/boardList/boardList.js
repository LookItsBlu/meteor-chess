import './boardList.html'
import './boardList.styl'

import { ReactiveVar } from 'meteor/reactive-var'

let boardsList = new ReactiveVar([])

Template.boardList.onCreated(()=>{
    Meteor.call('getBoards', (err, boards) => { boardsList.set(boards) })
})

Template.boardList.helpers({
    'getBoards'() {
        return boardsList.get().filter(board => board.players.length < 2)
    }
})

Template.boardList.events({

})
