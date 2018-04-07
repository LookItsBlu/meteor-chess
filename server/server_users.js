import bcrypt from 'bcrypt'
import validator from 'validator'
import { Users } from '/db/collections'

export default {
    'signup': (username, email, pass, pass_confirm) => {
        // Check inputs
        if(!username || !email || !pass || !pass_confirm)
            throw new Meteor.Error(10, 'Empty fields', 'One or more fields are empty!')
        else if(!validator.isEmail(email))
            throw new Meteor.Error(11, 'Invalid Mail', 'The given mail address is invalid!')
        else if(pass !== pass_confirm)
            throw new Meteor.Error(12, 'Different passwords', 'The given passwords do not match!')
        else if(Users.findOne({ 'name': username }) !== undefined)
            throw new Meteor.Error(13, 'Username in use', 'This username is already being used!')
        else if(Users.findOne({ 'mail': email }) !== undefined)
            throw new Meteor.Error(14, 'Address in use', 'This address is already being used!')

        // Add user to the database
        bcrypt.hash(pass, 10, Meteor.bindEnvironment(function(err, hash) {
            Users.insert({
                'name': username,
                'mail': email,
                'pass': hash
            })
        }))
    },
    'login': (username, pass) => {
        const user = Users.findOne({ 'name': username })
        if(user === undefined)
            throw new Meteor.Error(15, 'No account found', 'No account matching this username were found!')
        else {
            return bcrypt.compare(pass, user.pass).then(result=> {
                if(result) {
                    return {
                        'id' : Meteor.call('createSession', user._id),
                        'username' : username
                     }
                } else
                    throw new Meteor.Error(14, 'Incorrect password', 'The password entered is incorrect!')
            })
        }
    },
    'removeUser': (email) => { Users.remove({'mail': email}) },
    'getUser': (username) => ( Users.findOne({ 'name': username }) )
}
