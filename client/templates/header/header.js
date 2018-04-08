import './header.html'
import './header.styl'

Template.header.helpers({
    'isLoggedIn': () => Session.get('isLoggedIn'),
    'username': () => Users.findOne({ '_id' : JSON.parse(localStorage.getItem('Session')).user }).name
})

Template.header.events({

})
