IntencjeCollection = new Mongo.Collection("intencje");
PrzydzialyCollection = new Mongo.Collection("przydzialy");

if (Meteor.isClient) {
  Accounts.ui.config({
passwordSignupFields: 'USERNAME_AND_EMAIL'
});
  moment.locale('pl');
  accountsUIBootstrap3.setLanguage('pl'); // for Spanish
  // counter starts at 0

        Tracker.autorun(function(){
            if(Meteor.userId()){
            //do your stuff
                if(Meteor.user()){
                    var user = Meteor.user();
                    Session.set('currentUser', user.username);
                }
            }
        });
    Session.set('userRoles',[]);
    Session.set('currentMonthBlessing','');
    Session.set('nextMonthBlessing','');

    Meteor.subscribe('intentionListTwoMonths');
    Template.intentionList.helpers({

        'intentionListCurrentMonth':function(){
            var currentMonth = moment().endOf('month').month();
            return IntencjeCollection.find({month:currentMonth,user:Meteor.userId()});
        },

        'intentionListNextMonth':function(){
            var nextMonth = moment().add(1, 'months').endOf('month').month();
            var yearForNextMonth = moment().subtract(0, 'years').endOf('month').format("YYYY");
            return IntencjeCollection.find({month:nextMonth,user:Meteor.userId(),year:yearForNextMonth});
        },

        'usersByMonth':function(month){
            var currentMonth = month;
            var yearForNextMonth = moment().subtract(0, 'years').endOf('month').format("YYYY");
            var distinctEntries = _.uniq(IntencjeCollection.find({month:currentMonth,year:yearForNextMonth}, {
            sort: {username: 1}, fields: {username: true}
            }).fetch().map(function(x) {
                return x.username;
                }), true);
            return distinctEntries;
        },

        'intentionByUser':function(userName, month){
            var yearForNextMonth = moment().subtract(0, 'years').endOf('month').format("YYYY");
            return IntencjeCollection.find({username:userName,month:month,year:yearForNextMonth});
        },

        'currentMonth':function(){
            return moment().endOf('month').format('MMMM');
        },

        'nextMonth':function(){
            return moment().add(1, 'months').endOf('month').format('MMMM');
        },

        'currentMonthNum':function(){
            return moment().endOf('month').month();
        },

        'nextMonthNum':function(){
            return moment().add(1, 'months').endOf('month').month();
        },
        'currentMonthBlessing':function(){
            Meteor.call('getBlessing',MyApp.currentMonth(),moment().format("YYYY"), function(error,result){
                        Session.set('currentMonthBlessing',result);
                        });
            return Session.get('currentMonthBlessing');
        },
        'nextMonthBlessing':function(){
            Meteor.call('getBlessing',MyApp.nextMonth(),MyApp.yearNextMonth(), function(error,result){
                        Session.set('nextMonthBlessing',result);
                        });
            return Session.get('nextMonthBlessing');
        },
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


    Template.intentionList.events({
        'click .deleteIntention':function(){
            Meteor.call('deleteIntention',this);
            console.log(this._id);
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
        Meteor.call('addIntention',{
            name:intentionName,
            month:monthNum(),
            year:yearStr,
            user:Meteor.userId(),
            username:Meteor.user().username}
        );
            event.target.intentionName.value = '';
        
        }
    });

    var deactivate = function(className){
        Session.set('menu',className);
        };

    Template.header.events({
        'click .tajemnice':function(){
            //console.log('tajemnice');
            deactivate('.tajemnice');
        },
        'click .intencje':function(){
            //console.log('intencje');
            deactivate('.intencje');
        },
        'click .wiadomosci':function(){
            //console.log('wiadomosci');
            deactivate('.wiadomosci');
        },
        'click .account':function(){
            //console.log('wiadomosci');
            deactivate('.account');
        },
    });
    
    Template.registerHelper('nextMonth', function() {
        return moment().add(1, 'months').endOf('month').format('MMMM');
    });
    Template.registerHelper('currentMonth', function() {
        return moment().endOf('month').format('MMMM');
    });
    Template.registerHelper('nextMonthNum', function() {
        return moment().add(1, 'months').endOf('month').month();
    });
    Template.registerHelper('currentMonthNum', function() {
        return moment().endOf('month').month();
    });

    Template.intentionList.events({
        'click .currentMonth':function(){
            $('.currentMonthPanel').show();
            $('.nextMonthPanel').hide();
            $('.allByUserPanel').hide();
            $('a.allByUser').parent().removeClass('active');
            $('a.nextMonth').parent().removeClass('active');
            $('a.currentMonth').parent().addClass('active');
            //console.log("Current Month");
        },
        'click .nextMonth':function(){
            $('.currentMonthPanel').hide();
            $('.allByUserPanel').hide();
            $('.nextMonthPanel').show();
            $('.nextMonthPanel').removeClass('hidden');
            $('a.allByUser').parent().removeClass('active');
            $('a.nextMonth').parent().addClass('active');
            $('a.currentMonth').parent().removeClass('active');
            //console.log("Next Month");
        },

        'click .allByUser':function(){
            $('.allByUserPanel').show();
            $('.currentMonthPanel').hide();
            $('.nextMonthPanel').hide();
            $('.allByUserPanel').removeClass('hidden');
            $('a.nextMonth').parent().removeClass('active');
            $('a.allByUser').parent().addClass('active');
            //console.log("All By User");
        },
        
        'click .copyIntentions':function(){
            console.log('copy intentions');
            console.log('userId: ', Meteor.userId());
            console.log('userName: ', Meteor.user().username);
            console.log('monthNum: ', MyApp.currentMonth());
            console.log('yearNum: ', MyApp.yearThisMonth());
            
            Meteor.call('copyIntentions', Meteor.user().username, 3, 2016);
    
        }
    });

    Meteor.methods({
        'deleteIntention':function(intention){
            IntencjeCollection.remove(intention._id);
        },
        'addIntention':function(data){
            check(data, {
                name: String,
                user: String,
                username: String,
                month: Number,
                year: String
            });

            if(!this.userId){
                throw new Meteor.Error('You have to login');
            }

                IntencjeCollection.insert(data);

        }
    });

}

if (Meteor.isServer) {

    Meteor.publish('intentionListTwoMonths',function(){
            var currentMonth = moment().endOf('month').month();
            var nextMonth = moment().add(1, 'months').endOf('month').month();
            return IntencjeCollection.find({$or: [ { month: currentMonth }, { month: nextMonth }]});

        });
var users = ["brandeisbluesky",
"bialoglowa",
"derayes",
"corolla",
"maria-magdalena",
"jasminowa",
"skala",
"mindmonkey",
"ja",
"bergamotka",
"maly-ksiaze",
"metanoja",
"sahcim",
"agrafon",
"zuska",
"marianna",
"rozyczka",
"kolor",
"castorian",
"katolickamama",
"agniecha"];


  Meteor.startup(function () {
      if(Meteor.users.find().count()==1) {
          for(i = 0; i < users.length; i++){
            var options ={
            email: users[i]+'@example.com',
            username:users[i],
            password: 'pass'}
                
          }
          
      }
    Meteor.methods({
        'deleteIntention':function(intention){
            IntencjeCollection.remove(intention._id);
        },
        'addIntention':function(data){
            check(data, {
                name: String,
                user: String,
                username: String,
                month: Number,
                year: String
            });

            if(!this.userId){
                throw new Meteor.Error('You have to login');
            }

                IntencjeCollection.insert(data);

        },
        'copyIntentions':function(username, monthNum, yearNum){
            var intencje = IntencjeCollection.find({
                "username":username
            },{"name":1});
            console.log(intencje.count());
            for(i = 0; i < intencje.length; i++){
                console.log(intencje[i]);
            }
            
        }
    });
    // code to run on server at startup
//    IntencjeCollection.remove({});
//    IntencjeCollection.insert({name:"Moja pierwsza intencja", month:9, year:2015,user:'LpwPAk5YqxR7nPD8F'});
//    IntencjeCollection.insert({name:"Moja druga intencja", month:9, year:2015,user:'LpwPAk5YqxR7nPD8F'});
//    IntencjeCollection.insert({name:"Moja trzecia intencja", month:9, year:2015,user:'LpwPAk5YqxR7nPD8F'});
//    IntencjeCollection.insert({name:"Moja trzecia intencja 8", month:8, year:2015,user:'LpwPAk5YqxR7nPD8F'});
  });
}
