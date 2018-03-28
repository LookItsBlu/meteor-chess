import { Template } from 'meteor/templating'
import { ReactiveVar } from 'meteor/reactive-var'

import { Chessboards } from '../../db/collections.js'

Template.chessboard.helpers({

})

Template.chessboard.events({
    resetBoard() {
        Chessboards.remove({})
        Chessboards.insert({
            chessid: 1,
            board: [
                ['r', 'b', 'k', 'Q', 'K', 'k', 'b', 'r'],
                ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['p2', 'p2', 'p2', 'p2', 'p2', 'p2', 'p2', 'p2'],
                ['r2', 'b2', 'k2', 'Q2', 'K2', 'k2', 'b2', 'r2']
            ]
        })
    }
})
