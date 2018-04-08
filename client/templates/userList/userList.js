import './userList.html'
import './userList.styl'

Template.userList.helpers({
    'getUsers': () => Users.find({ '_id' : { $ne : JSON.parse(localStorage.getItem('Session')).user }}),
    'isFriend': (user) => (
        Users.findOne({
            '_id' : JSON.parse(localStorage.getItem('Session')).user
        }).friends.includes(user._id)
    )
})

Template.userList.events({

})
