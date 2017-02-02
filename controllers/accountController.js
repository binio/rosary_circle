AccountController = RouteController.extend({
    template: 'account',
    onBeforeAction: function() {
        if (!Meteor.userId()) {
        this.render('home');
        } else {
        this.next();
        }
    }
});
