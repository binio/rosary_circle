IntencjeCollection = new Mongo.Collection("intencje");
PrzydzialyCollection = new Mongo.Collection("przydzialy");

if (Meteor.isClient) {
  Accounts.ui.config({
passwordSignupFields: 'USERNAME_ONLY'
});
  moment.locale('pl');
  accountsUIBootstrap3.setLanguage('pl'); // for Spanish
  // counter starts at 0
    Template.intentionList.helpers({

        'intentionListCurrentMonth':function(){
            var currentMonth = moment().endOf('month').month();
            return IntencjeCollection.find({month:currentMonth,user:Meteor.userId()});
        },

        'intentionListNextMonth':function(){
            var nextMonth = moment().add(1, 'months').endOf('month').month();
            return IntencjeCollection.find({month:nextMonth,user:Meteor.userId()});
        },

        'usersByMonth':function(){
            var currentMonth = moment().endOf('month').month();
            var distinctEntries = _.uniq(IntencjeCollection.find({month:currentMonth}, {
            sort: {username: 1}, fields: {username: true}
            }).fetch().map(function(x) {
                return x.username;
                }), true);
            return distinctEntries;
        },

        'intentionByUser':function(userName){
            var currentMonth = moment().endOf('month').month();
            return IntencjeCollection.find({username:userName,month:currentMonth});
        },

        'currentMonth':function(){
            return moment().endOf('month').format('MMMM');
        },

        'nextMonth':function(){
            return moment().add(1, 'months').endOf('month').format('MMMM');
        }
    });
    
    Template.header.helpers({
        'getActive':function(l){
            console.log(l);
            var menu = Session.get('menu');
            if(menu == l){
                return 'active';
            }
            return;
        }
    });



    Template.addIntentionForm.events({
        'submit form': function(event) {
        event.preventDefault();

        var intentionName = event.target.intentionName.value;
        var monthNum = function(){

            return Number(moment().add(1, 'months').endOf('month').month());
        };
        var yearStr = moment().format("YYYY");
        IntencjeCollection.insert({name:intentionName,month:monthNum(),year:yearStr,user:Meteor.userId(),username:Meteor.user().username});
            event.target.intentionName.value = '';
        
        }
    });

    var deactivate = function(className){
        Session.set('menu',className);
        };

    Template.header.events({
        'click .tajemnice':function(){
            console.log('tajemnice');
            deactivate('.tajemnice');
        },
        'click .intencje':function(){
            console.log('intencje');
            deactivate('.intencje');
        },
        'click .wiadomosci':function(){
            console.log('wiadomosci');
            deactivate('.wiadomosci');
        },
    });
    
    Template.registerHelper('nextMonth', function() {
        return moment().add(1, 'months').endOf('month').format('MMMM');
    });

    Template.intentionList.events({
        'click .currentMonth':function(){
            $('.currentMonthPanel').show();
            $('.nextMonthPanel').hide();
            $('.allByUserPanel').hide();
            $('a.allByUser').parent().removeClass('active');
            $('a.nextMonth').parent().removeClass('active');
            $('a.currentMonth').parent().addClass('active');
            console.log("Current Month");
        },
        'click .nextMonth':function(){
            $('.currentMonthPanel').hide();
            $('.allByUserPanel').hide();
            $('.nextMonthPanel').show();
            $('.nextMonthPanel').removeClass('hidden');
            $('a.allByUser').parent().removeClass('active');
            $('a.nextMonth').parent().addClass('active');
            $('a.currentMonth').parent().removeClass('active');
            console.log("Next Month");
        },

        'click .allByUser':function(){
            $('.allByUserPanel').show();
            $('.currentMonthPanel').hide();
            $('.nextMonthPanel').hide();
            $('.allByUserPanel').removeClass('hidden');
            $('a.nextMonth').parent().removeClass('active');
            $('a.allByUser').parent().addClass('active');
            console.log("All By User");
        },
    });

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
//    IntencjeCollection.remove({});
//    IntencjeCollection.insert({name:"Moja pierwsza intencja", month:9, year:2015,user:'LpwPAk5YqxR7nPD8F'});
//    IntencjeCollection.insert({name:"Moja druga intencja", month:9, year:2015,user:'LpwPAk5YqxR7nPD8F'});
//    IntencjeCollection.insert({name:"Moja trzecia intencja", month:9, year:2015,user:'LpwPAk5YqxR7nPD8F'});
//    IntencjeCollection.insert({name:"Moja trzecia intencja 8", month:8, year:2015,user:'LpwPAk5YqxR7nPD8F'});
  });
}
