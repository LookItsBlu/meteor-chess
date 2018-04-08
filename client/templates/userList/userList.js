import './userList.html'
import './userList.styl'

import { ReactiveVar } from 'meteor/reactive-var'

let userList = new ReactiveVar([])
let friendsList = new ReactiveVar([])

Template.userList.onCreated(()=>{
    Meteor.call('getUserById', JSON.parse(localStorage.getItem('Session')).user, (err, result) => {
        friendsList.set(result.friends)
    })

    Meteor.call('getOtherUsers', JSON.parse(localStorage.getItem('Session')).user, (err, result) => {
        userList.set(result)
    })
})

Template.userList.helpers({
    'getUsers'() { return userList.get() },
    'isFriend'(user) { return friendsList.get().includes(user._id) }
})

Template.userList.events({

})
