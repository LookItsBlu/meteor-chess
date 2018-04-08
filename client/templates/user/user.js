import './user.html'
import './user.styl'

import { ReactiveVar } from 'meteor/reactive-var'

let userObj = new ReactiveVar({})
let friendsList = new ReactiveVar([])
let isFriend = new ReactiveVar(false)

function getFriendList() {
    Meteor.call('getUserById', JSON.parse(localStorage.getItem('Session')).user, (err, result) => {
        friendsList.set(result.friends)
        isFriend.set(result.friends.includes(userObj.get()['_id']))
    })
}

Template.user.onCreated(()=>{
    Meteor.call('getUserByName', FlowRouter.getParam('username'), (err, result) => {
        userObj.set(result)
    })
    getFriendList()
})

Template.user.helpers({
    'getUser'(info) { return userObj.get()[info] || '' },
    'anotherUser'() {
        return userObj.get()._id !== JSON.parse(localStorage.getItem('Session')).user
    },
    'isFriend'() { return isFriend.get() }
})

Template.user.events({
    'click .add-friend'(evt) {
        evt.preventDefault()
        Meteor.call('addFriend',
            JSON.parse(localStorage.getItem('Session')).user, userObj.get()['_id'],
            (err, result) => {
                getFriendList()
                alert('Friend Added')
            }
        )
    },
    'click .remove-friend'(evt) {
        evt.preventDefault()
        Meteor.call('removeFriend',
            JSON.parse(localStorage.getItem('Session')).user, [userObj.get()['_id']],
            (err, result) => {
                getFriendList()
                alert('Friend Removed')
            }
        )
    }
})
