AssignmentsCollection = new Mongo.Collection("assignments");

if (Meteor.isClient) {
    Meteor.subscribe('userAssignment');
    Session.set('userAssignment',[]);

    Template.assignment.helpers({
        'userAssignment':function(){
            Meteor.call('getAssignment',Meteor.userId(),MyApp.currentMonth(), function(error,result){
                Session.set('userAssignment',result);
            });
            console.log('USER ID'+Meteor.userId());
            console.log(Session.get('userAssignment'));
            return Session.get('userAssignment');
        },
    });

}

if (Meteor.isServer) {
    Meteor.publish('userAssignment',function(){
        return AssignmentsCollection.find({});

    });

    Meteor.methods({
        'getAssignment':function(user,monthNum){
            var a = new Object;
            //a.month = monthNum;
            a.userId = user
            return  AssignmentsCollection.findOne(a);
        }
    });

}