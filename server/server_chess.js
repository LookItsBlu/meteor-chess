import { Chessboards, Users } from '/db/collections.js'

const BOARD_TEMPLATE = [
    ['r', 'b', 'k', 'Q', 'K', 'k', 'b', 'r'],
    ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['p2', 'p2', 'p2', 'p2', 'p2', 'p2', 'p2', 'p2'],
    ['r2', 'b2', 'k2', 'Q2', 'K2', 'k2', 'b2', 'r2']
]

export default {
    'createGame': (gamename, userid) => {
        return Chessboards.insert({
            'name' : gamename,
            'board' : BOARD_TEMPLATE,
            'creator' : Users.findOne({ '_id' : userid }).name,
            'players' : [userid]
        }, (err, result) => result)
    },
    'joinGame': (userid) => {
        Chessboards.update({ '_id' : chess_id}, { $push : { 'players' : userid } })
    },

    'movePiece': (chess_id, row_init, row_final, col_init, col_final)=>{
        var current_board = Chessboards.findOne(
            { '_id' : chess_id }
        ).board

        var new_board = JSON.parse(JSON.stringify(current_board))
        new_board[row_init][col_init] = ''
        new_board[row_final][col_final] = current_board[row_init][col_init]

        Chessboards.update(
            { '_id' : chess_id },
            { $set : { 'board' : new_board } }
        )
    },

    'getBoards': () => ( Chessboards.find().fetch() ),
    'getBoardById': (boardid) => ( Chessboards.findOne({ '_id' : boardid }) ),

    'resetBoard': (chess_id) => { Chessboards.update({ '_id' : chess_id}, { $set : { 'board' : BOARD_TEMPLATE } }) }
}
