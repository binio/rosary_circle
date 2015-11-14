BlessController = RouteController.extend({
    template: 'bless',
    onBeforeAction: function() {
        if (!Meteor.userId() || !Roles.userIsInRole(Meteor.user(),['priest'], 'group-1')) {
        this.render('home');
        } else {
        this.next();
        }
    }
});
