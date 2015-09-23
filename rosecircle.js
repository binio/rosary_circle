IntencjeCollection = new Mongo.Collection("intencje");

if (Meteor.isClient) {
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

        'currentMonth':function(){

            return moment().endOf('month').format('MMMM');
        },
        'nextMonth':function(){

            return moment().add(1, 'months').endOf('month').format('MMMM');
        }
    });
    
    Template.addIntentionForm.events({
        'submit form': function(event) {
        event.preventDefault();

        var intentionName = event.target.intentionName.value;
        var monthNum = function(){
            var date = new Date();
            var nextMonth = date.getMonth();

            if(nextMonth + 1 == 12){
                return 0;
            }
            return nextMonth+1;
        };
        IntencjeCollection.insert({name:intentionName,month:monthNum(),year:2015,user:Meteor.userId()});
            event.target.intentionName.value = '';
        
        }
    });
    
    Template.intentionList.events({
        'click .currentMonth':function(){
            $('.currentMonthPanel').show();
            $('.nextMonthPanel').hide();
            $('a.nextMonth').parent().removeClass('active');
            $('a.currentMonth').parent().addClass('active');
            console.log("Current Month");
        },
        'click .nextMonth':function(){
            $('.currentMonthPanel').hide();
            $('.nextMonthPanel').show();
            $('.nextMonthPanel').removeClass('hidden');
            $('a.nextMonth').parent().addClass('active');
            $('a.currentMonth').parent().removeClass('active');
            console.log("Next Month");
        },
    });

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
    IntencjeCollection.remove({});  
    IntencjeCollection.insert({name:"Moja pierwsza intencja", month:9, year:2015,user:'LpwPAk5YqxR7nPD8F'});
    IntencjeCollection.insert({name:"Moja druga intencja", month:9, year:2015,user:'LpwPAk5YqxR7nPD8F'});
    IntencjeCollection.insert({name:"Moja trzecia intencja", month:9, year:2015,user:'LpwPAk5YqxR7nPD8F'});
    IntencjeCollection.insert({name:"Moja trzecia intencja 8", month:8, year:2015,user:'LpwPAk5YqxR7nPD8F'});
  });
}
