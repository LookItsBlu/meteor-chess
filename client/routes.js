// Check user session on route change
FlowRouter.triggers.enter([() => {
    if( localStorage.getItem('Session') ) {
        Meteor.call('checkSession', JSON.parse(localStorage.getItem('Session')).session, (err, result) => {
            if( result && Session.get('isLoggedIn') != true ) Session.set('isLoggedIn', true)
        })
    }
}])

// Main Route
FlowRouter.route('/', {
    action(params, queries) {
        BlazeLayout.render( 'app', { main: 'index' } );
    }
})

// connection links
FlowRouter.route('/login', {
    action(params, queries) {
        BlazeLayout.render( 'app', { main: 'login' } );
    }
})
FlowRouter.route('/signup', {
    action(params, queries) {
        BlazeLayout.render( 'app', { main: 'signup' } );
    }
})
FlowRouter.route('/logout', {
    triggersEnter() {
        Meteor.call('killSession', JSON.parse(localStorage.getItem('Session')).id, ()=>{
            localStorage.removeItem('Session')
            Session.set('isLoggedIn', false)
            FlowRouter.redirect('/')
        })
    }
})

// Account Routes
FlowRouter.route('/user/:username', {
    action(params, queries) {
        BlazeLayout.render( 'app', { main: 'user' } );
    }
})

// User List Route
FlowRouter.route('/userlist', {
    action(params, queries) {
        BlazeLayout.render( 'app', { main: 'userList' } );
    }
})

// Game Settings Routes
let game = FlowRouter.group({ prefix: '/game' })
game.route('/join', {
    action(params, queries) {
        BlazeLayout.render( 'app', { main: 'boardList' } );
    }
})
game.route('/create', {
    action(params, queries) {
        BlazeLayout.render( 'app', { main: 'newBoard' } );
    }
})

// Game Route
FlowRouter.route('/play/:gameid', {
    action(params, queries) {
        BlazeLayout.render( 'app', { main: 'chessboard' } );
    }
})

// 404 Route
FlowRouter.notFound = {
    action(params, queries) {
        BlazeLayout.render( 'app', { main: 'notFound' } );
    }
}
