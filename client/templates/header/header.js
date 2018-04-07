import './header.html'
import './header.styl'

Template.header.helpers({
    'isLoggedIn'() { return Session.get('isLoggedIn') },
    'username': () => (JSON.parse(localStorage.getItem('Session')).username)
})

Template.header.events({

})
