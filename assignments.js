//User assignments for users so they can see what they have been assigned for curent month.

if (Meteor.isClient) {
    //Meteor.subscribe('userAssignment');
    //Session.set('userAssignment',[]);
    //
    //Template.assignment.helpers({
    //    'userAssignment':function(){
    //        Meteor.call('getAssignment',Meteor.userId(),MyApp.currentMonth(), function(error,result){
    //            Session.set('userAssignment',result);
    //        });
    //        return Session.get('userAssignment');
    //    },
    //});

}

if (Meteor.isServer) {
    //Meteor.publish('userAssignment',function(){
    //    return PrzydzialyCollection.find({});
    //
    //});
    //
    //Meteor.methods({
    //    'getAssignment':function(user,monthNum){
    //        var a = new Object;
    //        a.month = monthNum;
    //        a.userId = user
    //        return  PrzydzialyCollection.findOne(a);
    //    }
    //});

}