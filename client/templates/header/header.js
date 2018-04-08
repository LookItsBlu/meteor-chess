import './header.html'
import './header.styl'

let username = new ReactiveVar('')

Template.header.onCreated(()=>{
    if(localStorage.getItem('Session')) {
        Meteor.call('getUserById', JSON.parse(localStorage.getItem('Session')).user, (err, result) => {
            username.set(result.name)
        })
    }
})

Template.header.helpers({
    'isLoggedIn'() { return Session.get('isLoggedIn') },
    'username': () => (username.get())
})

Template.header.events({

})
