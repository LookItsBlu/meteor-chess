import { Sessions } from '/db/collections'

export default {
    'createSession': (userid) => {
        // first, remove the sessions already opened for this user
        Sessions.remove({ 'userid' : userid })

        return Sessions.insert({
            'userid' : userid,
            'expiration' : Date.now()+(48*3600000)
        }, (err, inserted) => {
            return inserted._id
        })
    },
    'checkSession': (SessionID) => {
        if(Sessions.findOne({ '_id' : SessionID }).expiration < Date.now()) {
            Meteor.call('killSession', SessionID)
            return false
        } else
            return true
    },
    'killSession': (SessionID) => {
        Sessions.remove({ '_id' : SessionID })
    }
}
