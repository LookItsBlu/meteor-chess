import './user.html'
import './user.styl'

import { ReactiveVar } from 'meteor/reactive-var'

let isFriend = new ReactiveVar(false)

function getFriendList() {
    isFriend.set(
        Users.findOne({ '_id' : JSON.parse(localStorage.getItem('Session')).user }).friends.includes(
            Users.findOne({ 'name' : FlowRouter.getParam('username') })._id
        )
    )
}

Template.user.onCreated(()=>{
    getFriendList()
})

Template.user.helpers({
    'getUser': (info) => Users.findOne({ 'name' : FlowRouter.getParam('username') })[info],
    'anotherUser': () => (
        Users.findOne({ 'name' : FlowRouter.getParam('username') })._id !== JSON.parse(localStorage.getItem('Session')).user
    ),
    'isFriend'() { return isFriend.get() }
})

Template.user.events({
    'click .add-friend'(evt) {
        evt.preventDefault()
        Meteor.call('addFriend',
            JSON.parse(localStorage.getItem('Session')).user,
            Users.findOne({ 'name' : FlowRouter.getParam('username') })._id,
            (err, result) => {
                getFriendList()
                alert('Friend Added')
            }
        )
    },
    'click .remove-friend'(evt) {
        evt.preventDefault()
        Meteor.call('removeFriend',
            JSON.parse(localStorage.getItem('Session')).user,
            [Users.findOne({ 'name' : FlowRouter.getParam('username') })._id],
            (err, result) => {
                getFriendList()
                alert('Friend Removed')
            }
        )
    }
})
