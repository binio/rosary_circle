//User assignments for users so they can see what they have been assigned for curent month.

if (Meteor.isClient) {
    Meteor.subscribe('userAssignment');
    Meteor.subscribe('intentions');
    Session.set('userAssignment',[]);

    Template.assignmentList.helpers({
        'usersByMonth':function(month){
            var currentMonth = month;
            var distinctEntries = _.uniq(IntencjeCollection.find({month:currentMonth}, {
                sort: {username: 1}, fields: {username: true}
            }).fetch().map(function(x) {
                return x.username;
            }), true);
            console.log(IntencjeCollection.find({}));
            return distinctEntries;
        },
    });

}

if (Meteor.isServer) {

    Meteor.publish('intentions',function(){
        var currentMonth = moment().endOf('month').month();
        var nextMonth = moment().add(1, 'months').endOf('month').month();
        return IntencjeCollection.find({});

    });
}