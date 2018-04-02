import { Meteor } from 'meteor/meteor'

import { Chessboards, Users } from '../db/collections.js'

import chess from './server_chess.js'
import users from './server_users.js'

Meteor.startup(() => {
    Meteor.methods({
		...chess,
		...users
	})
})
