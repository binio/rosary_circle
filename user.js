if (Meteor.isClient) {

    Template.userDetail.events({
        'click .admin':function(){
            //@TODO First check if current user is admin
            //Meteor.call('addRole',this._id, ['admin'], 'group-1');
            if(Roles.userIsInRole(this._id, ['admin'], 'group-1')){
            console.log('has admin');
            }
        },
        'click .user':function(){
            //Meteor.call('addRole',this._id, ['user'], 'group-1');
            if(Roles.userIsInRole(this._id, ['user'], 'group-1')){
            console.log('has user');
            }
        },
        'click .priest':function(){
            //Meteor.call('addRole',this._id, ['priest'], 'group-1');
            if(Roles.userIsInRole(this._id, ['priest'], 'group-1')){
            console.log('has priest');
            }
        }
    });

    Template.blurp.helpers({
        'userroles':function(){
            var userroles = [];
           Meteor.call('getRoles',this._id, function(error,result){
            if(error){
                console.log(error.reason);
                return;
            }else{
               console.log(result);
               Session.set('userRoles',result);
            }
           });
            return Session.get('userRoles');

        }
    });

    Template.adminForm.helpers({
        'checks':function(){
            var roles = Session.get('userRoles');
            console.log(roles);
            var checks = new Object;

            if(roles.indexOf('admin')>=0){
                checks.adminCheck = 'checked';
            }
            if(roles.indexOf('user')>=0){
                checks.userCheck = 'checked';
            }
            if(roles.indexOf('priest')>=0){
                checks.priestCheck = 'checked';
            }
            return checks;
        }
    });

    Template.adminForm.events({
        'submit form': function(event) {
            event.preventDefault();
            var roles = [];
            if(event.target.admin.checked){
                roles.push('admin');
            }
            if(event.target.user.checked){
                roles.push('user');
            }
            if(event.target.priest.checked){
                roles.push('priest');
            }
            Meteor.call('setRoles',this._id,roles,'group-1');
        }
    });

}
if (Meteor.isServer) {
    Meteor.methods({
     'addRole':function(id, roles, group){
        var loggedInUser = Meteor.user();
            if (!loggedInUser || !Roles.userIsInRole(loggedInUser, ['admin'], 'group-1')) {
                throw new Meteor.Error(403, "Access denied")
            }
            Roles.addUsersToRoles(id, roles, group);
     },
     'getRoles':function(id){
         var roles = [];
         if(Roles.userIsInRole(id, ['admin'], 'group-1')){
            roles.push("admin");
         }
         if(Roles.userIsInRole(id, ['user'], 'group-1')){
            roles.push("user");
         }
         if(Roles.userIsInRole(id, ['priest'], 'group-1')){
            roles.push("priest");
         }
         return roles;
     },

    'setRoles':function(id,roles, group){
        var loggedInUser = Meteor.user();
        if (!loggedInUser || !Roles.userIsInRole(loggedInUser, ['admin'], 'group-1')) {
                throw new Meteor.Error(403, "Access denied")
            }
        Roles.setUserRoles(id, roles, group)
    }
    });

}
