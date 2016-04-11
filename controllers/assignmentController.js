AssignmentController = RouteController.extend({
    template: 'assignmentAdmin',
    onBeforeAction: function() {
        if (!Meteor.userId() || !Roles.userIsInRole(Meteor.user(),['admin'], 'group-1')) {
            this.render('home');
        } else {
            this.next();
        }
    }
});