import { Mongo } from 'meteor/mongo'

Chessboards = new Mongo.Collection('Chessboards')
Users = new Mongo.Collection('Users')
Sessions = new Mongo.Collection('Sessions')

export { Chessboards, Users, Sessions }
