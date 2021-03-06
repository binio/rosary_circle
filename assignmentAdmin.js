//User assignments for users so they can see what they have been assigned for curent month.

if (Meteor.isClient) {
    Meteor.subscribe('userAssignment');
    Meteor.subscribe('intentions');
    Session.set('userAssignment',[]);

    Template.assignmentList.helpers({
        'currentMonthName' : function(){
            return MyApp.currentMonthName();
        },
        'usersByCurrentMonth':function(){
            var currentMonth = MyApp.currentMonth();
            var distinctEntries = _.uniq(PrzydzialyCollection.find({month:currentMonth}, {
                sort: {username: 1}, fields: {username: true, userId:true, part:true, month:true}
            }).fetch().map(function(x) {
                return x;
            }), true);
            return distinctEntries;
        },
        'usersByNextMonth':function(){
            var currentMonth = MyApp.nextMonth();
            var distinctEntries = _.uniq(PrzydzialyCollection.find({month:currentMonth}, {
                sort: {username: 1}, fields: {username: true, userId:true, part:true, month:true}
            }).fetch().map(function(x) {
                return x;
            }), true);
            return distinctEntries;
        },
        'getPartName':function(id){
            var parts = MyApp.getPartsArray();
            return parts[id];
        }
    });

    Template.partSelect.helpers({
        'getPartName':function(id){
            var parts = MyApp.getPartsArray();
            return parts[id];
        }
    });

    Template.userSelect.helpers({
        'allUsers':function(id){
            return UsersCollection.find({});
        },
        'allUsersByMonth':function(month){
            var yearNexMonth = moment().add(1, 'month').endOf('month').year();
            return PrzydzialyCollection.find({month:month, year:yearNexMonth},{username:1,part:1,year:1});
        }
    });
    Template.assignmentAdmin.events({

        'click .partSelect':function(event){
            Meteor.call('updateAssignmet',this.userId,this.month,event.target.id);
        },
        'click .reset':function(event){
            Meteor.call('resetAssignment',this.userId,this.month);
        }
    });

    Template.rosaryParts.events({
        'click .userSelect':function(event){
            Meteor.call('updateAssignmet',event.target.id, this.month, this.userId.toString());
        }
    });

    Template.whichPerson.events({
        'click .removeUser':function(event){
            Meteor.call('pullFromAssignmet',this.userId, this.month, event.target.id);
        }
    });
    Template.whichPerson.helpers({
        'whichUser':function(tj,month){
            var tj = tj.toString();
            return PrzydzialyCollection.find(
                {part:{$in:[tj]},month:month,year:2019},{username:1,_id:0 }
            );
        }
    });

}

if (Meteor.isServer) {

    Meteor.publish('intentions',function(){
        //var currentMonth = moment().endOf('month').month();
        //var nextMonth = moment().add(1, 'months').endOf('month').month();
        return PrzydzialyCollection.find({});

    });

    Meteor.methods({
        'updateAssignmet':function(userId,month,part){
            PrzydzialyCollection.update(
                {userId:userId, month:month},{$push:{part:part}},{upsert:true}
            );
        },

        'pullFromAssignmet':function(userId,month,part){
            PrzydzialyCollection.update(
                {userId:userId, month:month},{$pull:{part:part}},{upsert:true}
            );
        },

        'resetAssignment':function(userId,month){
            PrzydzialyCollection.update(
                {userId:userId, month:month},{$set:{part:[]}},{upsert:true}
            );
        },

    });
}