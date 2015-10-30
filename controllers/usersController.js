UsersController = RouteController.extend({
    template: 'users',
    onBeforeAction: function() {
        if (!Meteor.userId()) {
        this.render('home');
        } else {
        this.next();
        }
    }
});
