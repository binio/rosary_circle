PrayersCollection = new Mongo.Collection('prayers');

if (Meteor.isClient) {
    Meteor.subscribe('prayers');
    Session.setDefault('joined',false);


    Meteor.setInterval(function(){
    Session.set('timer',new Date())}, 10000)
    Template.joinBridge.helpers({

        'makeVisible':function(){
            var isoDate = Session.get('timer');
            if(!Session.get('joined') &&
               moment(Session.get('timer')).hour() >=20 &&
               moment(Session.get('timer')).hour()<23){
                return true;
            } else
            {
                return false;
            }
        },

        'allPrayers':function(){
            return PrayersCollection.find({});
        },

        'formatTime':function(isoDate){
            return moment(isoDate).format('HH:mm');
        }
    });

    Template.joinBridge.events({
        'click .joinPrayer':function(){
            Session.set('joined',true);
            Meteor.call('joinRosaryNow',{
                user : Meteor.userId(),
                username : Meteor.user().username,
                joined : new Date()
            });
        }
    });
}

if (Meteor.isServer) {

    Meteor.methods({
        'joinRosaryNow':function(data){

            if(!this.userId){
                throw new Meteor.Error('You have to login');
            }
            PrayersCollection.insert(data);
        }
    });

    Meteor.publish('prayers',function(){
        return PrayersCollection.find();
    });
}
