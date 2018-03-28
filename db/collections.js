import { Mongo } from 'meteor/mongo'

const Chessboards = new Mongo.Collection('Chessboards')
const Users = new Mongo.Collection('Users')

export { Chessboards, Users }
