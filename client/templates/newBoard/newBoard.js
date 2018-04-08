import './newBoard.html'
import './newBoard.styl'

Template.newBoard.helpers({

})

Template.newBoard.events({
    'submit form'(evt) {
        evt.preventDefault()

        Meteor.call('createGame',
            evt.target.gamename.value,
            JSON.parse(localStorage.getItem('Session')).user,
            (err, result) => {
                FlowRouter.redirect('/play/'+result)
            }
        )
    }
})
