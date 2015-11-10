if (Meteor.isClient) {
    Template.userDetail.events({
        'click .admin':function(){
            //@TODO First check if current user is admin
            //Meteor.call('addAdmin',this._id);
            console.log(this._id);
            if(Roles.userIsInRole(this._id, ['admin','user'], 'group-1')){
            console.log('has admin');
            }
        }
    });
}
if (Meteor.isServer) {
    Meteor.methods({
            'addAdmin':function(id){
                var loggedInUser = Meteor.user();
                if (!loggedInUser || !Roles.userIsInRole(loggedInUser, ['admin', 'user'], 'group-1')) {
      throw new Meteor.Error(403, "Access denied")
    }
                Roles.addUsersToRoles(id, ['user','admin'], 'group-1');
            }
    });
}
