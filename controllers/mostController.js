MostController = RouteController.extend({
    template: 'most',
    onBeforeAction: function() {
        if (!Meteor.userId()) {
        this.render('home');
        } else {
        this.next();
        }
    }
});
