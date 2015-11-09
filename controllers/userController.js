UserController = RouteController.extend({
    template: 'user',
    onBeforeAction: function() {
        if (!Meteor.userId()) {
        this.render('home');
        } else {
        this.next();
        }
    }
});
