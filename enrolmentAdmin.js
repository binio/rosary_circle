/**
 * Created by thomas on 18/04/16.
 */

if (Meteor.isClient) {


    Tracker.autorun(function(computation){
        Meteor.subscribe('users', {
            username: Session.get('currentUser')
        });
    });

    Template.enrollmentAdmin.helpers({
        'getCurrentMonth':function(){
            return MyApp.currentMonth();
        },
        'getNextMonth':function(){
            return MyApp.nextMonth();
        },
    });

    Template.usersSelect.helpers({
        'users':function(){
            return {users:UsersCollection.find({})};
        }
    });

    Template.usersByMonth.helpers({
        'getUsersByMonth':function(month){
            return PrzydzialyCollection.find({month:month});
        }
    });

    Template.enrollmentAdmin.events({
        'click .userSelect':function(event){
            var object = new Object();
                object.username = event.target.text;
                object.userId = event.target.id;
                object.month = this.month;
                object.part= [];
                object.year = moment().add(1, 'months').endOf('month').year();

            Meteor.call('enroll', object);
            console.log(event.target.id, this.month);
        }
    });
}

if (Meteor.isServer) {

    Meteor.publish('users', function(options){
        if(options.username == 'tomasz-tomasz' || options.username == 'malgosia'){
            return Meteor.users.find({$query:{}, $orderby:{username:1}});
        }
        else {
            return Meteor.users.find({username:"xxxx"});
        }
    });
    Meteor.methods({
        'getAllUsers':function(){
            return UsersCollection.find({});
        },
        'enroll':function(object){
            PrzydzialyCollection.insert(object);
        }
    });
}