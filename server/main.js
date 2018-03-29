import { Meteor } from 'meteor/meteor'

import { Chessboards } from '../db/collections.js'

Meteor.startup(() => {
    Meteor.methods({
        'movePiece': (chess_id, row_init, row_final, col_init, col_final)=>{
            var current_board = Chessboards.find(
                { chessid: parseInt(chess_id) }
            ).fetch()[0].board

            var new_board = JSON.parse(JSON.stringify(current_board))
            new_board[row_init][col_init] = ''
            new_board[row_final][col_final] = current_board[row_init][col_init]

            Chessboards.update(
                { chessid: parseInt(chess_id) },
                { $set: { board: new_board } }
            )
        },
        'resetBoard': (chess_id) => {
            Chessboards.remove({chessid: parseInt(chess_id)})
            Chessboards.insert({
                chessid: parseInt(chess_id),
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
})
