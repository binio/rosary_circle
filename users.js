UsersCollection = Meteor.users;

if (Meteor.isClient) {

    //Meteor.subscribe('users',{username:Meteor.user().username});
    Tracker.autorun(function(computation){
        Meteor.subscribe('users', {
            username: Session.get('currentUser')
        });
    });

     Template.me.helpers({
         'allUsers':function(){
            return UsersCollection.find({});
         }
     });
}

if (Meteor.isServer) {


}
