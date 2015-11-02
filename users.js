UsersCollection = Meteor.users;

if (Meteor.isClient) {

    Meteor.subscribe('users');

     Template.me.helpers({
         'allUsers':function(){
            return UsersCollection.find({});
         }
     });
}

if (Meteor.isServer) {

    Meteor.publish('users', function(){
            return Meteor.users.find({});
        });

}
