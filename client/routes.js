// Check user session on route change
FlowRouter.triggers.enter(() => {
    if( localStorage.getItem('Session') )
        Meteor.call('checkSession', JSON.parse(localStorage.getItem('Session')).id, (err, result) => {
            if( result && Session.get('isLoggedIn') != true )
                Session.set('isLoggedIn', true)
        })
})

// Main Route
FlowRouter.route('/', {
    action(params, queries) {
        BlazeLayout.render( 'app', { main: 'index' } );
    }
})

// Account Routes
let account = FlowRouter.group({ prefix: '/user' })
account.route('/login', {
    action(params, queries) {
        BlazeLayout.render( 'app', { main: 'login' } );
    }
})
account.route('/signup', {
    action(params, queries) {
        BlazeLayout.render( 'app', { main: 'signup' } );
    }
})
account.route('/logout', {
    triggersEnter() {
        Meteor.call('killSession', JSON.parse(localStorage.getItem('Session')).id, ()=>{
            localStorage.removeItem('Session')
            Session.set('isLoggedIn', false)
            FlowRouter.redirect('/')
        })
    }
})
account.route('/:name', {
    action(params, queries) {
        BlazeLayout.render( 'app', { main: 'user' } );
    }
})

// Game Routes
FlowRouter.route('/boards', {
    action(params, queries) {
        BlazeLayout.render( 'app', { main: 'boardList' } );
    }
})


// 404 Route
FlowRouter.notFound = {
    action(params, queries) {
        BlazeLayout.render( 'app', { main: 'index' } );
    }
}
