UsersCollection = Meteor.users;

if (Meteor.isClient) {

    //Meteor.subscribe('users',{username:Meteor.user().username});
    Tracker.autorun(function(computation){
        Meteor.subscribe('users', {
            username: Meteor.user().username
        });
    });

     Template.me.helpers({
         'allUsers':function(){
            return UsersCollection.find({});
         }
     });
}

if (Meteor.isServer) {

    Meteor.publish('users', function(options){
        if(options.username == 'tomasz-tomasz'){
            return Meteor.users.find({});
        }
        else {
            return {};
        }
        });

}
