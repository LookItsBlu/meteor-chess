import { Mongo } from 'meteor/mongo'

const Chessboards = new Mongo.Collection('Chessboards')
const Users = new Mongo.Collection('Users')
const Sessions = new Mongo.Collection('Sessions')

export { Chessboards, Users, Sessions }
