AboutController = RouteController.extend({
    template: 'about',
    onBeforeAction: function() {
        if (!Meteor.userId()) {
        this.render('home');
        } else {
        this.next();
        }
    }
});
