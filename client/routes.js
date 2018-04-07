FlowRouter.route('/', {
    action(params, queries) {
        BlazeLayout.render( 'app', { main: 'index' } );
    }
})

FlowRouter.route('/login', {
    action(params, queries) {
        BlazeLayout.render( 'app', { main: 'login' } );
    }
})

FlowRouter.route('/boards', {
    action(params, queries) {
        BlazeLayout.render( 'app', { main: 'boardList' } );
    }
})

FlowRouter.route('/user/:name', {
    action(params, queries) {
        BlazeLayout.render( 'app', { main: 'user' } );
    }
})
