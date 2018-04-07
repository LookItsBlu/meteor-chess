import './signup.html'
import './signup.styl'

Template.signup.helpers({

})

Template.signup.events({
    'submit form'(evt) {
        evt.preventDefault()

        Meteor.call('signup',
            evt.target.username.value,
            evt.target.email.value,
            evt.target.password.value,
            evt.target.password_confirm.value,
            (err, result) => {
                if(err) {
                    console.log(err.details)
                }
            }
        )
    }
})
