import { Meteor } from 'meteor/meteor'

// functions related to the chess games
import chess from './server_chess.js'
// functions related to the users
import users from './server_users.js'
// functions related to the user sessions
import sessions from './server_sessions.js'

Meteor.startup(() => {
    Meteor.methods({
		...chess,
		...users,
        ...sessions
	})
})
