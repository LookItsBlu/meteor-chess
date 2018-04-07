import { Template } from 'meteor/templating'
import { ReactiveVar } from 'meteor/reactive-var'

import { Chessboards } from '../../../db/collections.js'

Template.boardList.helpers({
    chessboards: () => (
        Chessboards.find({})
    )
})

Template.boardList.events({

})
