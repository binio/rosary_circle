BlessCollection = new Mongo.Collection("bless");

if (Meteor.isClient) {
    Meteor.subscribe('blessings');
    Template.blessForm.helpers({

    });
    Template.blessForm.events({
        'submit form': function(event) {
            event.preventDefault();
            console.log(event.target.blessingText.value);
            var blessing = event.target.blessingText.value;
            var month = MyApp.nextMonth();
            var year = MyApp.yearNextMonth();
            var group = 'group-1';
            Meteor.call('addBlessing',blessing, month, year, group);
        }
    });
}
if (Meteor.isServer) {
    Meteor.methods({
        'addBlessing':function(blessing, month, year, group){
            var user = Meteor.user();
            var blessingObj = new Object;
            blessingObj.text = blessing;
            blessingObj.month = month;
            blessingObj.year = year;
            blessingObj.group = group;
            blessingObj.user = user._id;
            BlessCollection.remove({month:month, year:year, user:user._id});
            BlessCollection.insert(blessingObj);
        },
        'getBlessing':function(monthNum, yearStr){
            var blessing = new Object;
            blessing.month = monthNum;
            blessing.year = yearStr;
            return  BlessCollection.findOne(blessing);

        }
    });

    Meteor.publish('blessings',function(){
        return BlessCollection.find({});
    });
}
