FlowRouter.route('/', {
    action(params, queries) {
        //BlazeLayout.render('componentLayout');
        console.log('hi!')
    }
})

FlowRouter.route('/user/:name', {
    action(params, queries) {
        console.log(params.name)
    }
})
