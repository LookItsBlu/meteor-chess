import './login.html'
import './login.styl'

import { Session } from 'meteor/session'

Template.login.helpers({

})

Template.login.events({
    'submit form'(evt) {
        evt.preventDefault()
        Meteor.call('login', evt.target.username.value, evt.target.password.value, (err, result) => {
            if(err) console.log(err.details)
            else {
                localStorage.setItem('Session', JSON.stringify(result))
                Session.set('isLoggedIn', true)
                FlowRouter.redirect('/')
            }
        })
    }
})
