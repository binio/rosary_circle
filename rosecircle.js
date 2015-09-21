IntencjeCollection = new Mongo.Collection("intencje");

if (Meteor.isClient) {
  // counter starts at 0
    Template.intentionList.helpers({
        'intentionList':function(){
        return IntencjeCollection.find();
        },

        'currentMonth':function(){
            return "September";
        },
        'nextMonth':function(){
            return "October";
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
        IntencjeCollection.insert({name:intentionName,month:monthNum(),year:2015});
            event.target.intentionName.value = '';
        
        }
    });
    
    Template.intentionList.events({
        'click .currentMonth':function(){
            $('.currentMonthPanel').show();
            $('a.nextMonth').parent().removeClass('active');
            $('a.currentMonth').parent().addClass('active');
            console.log("Current Month");
        },
        'click .nextMonth':function(){
            $('.currentMonthPanel').hide();
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
    IntencjeCollection.insert({name:"Moja pierwsza intencja", month:9, year:2015});
    IntencjeCollection.insert({name:"Moja druga intencja", month:9, year:2015});
    IntencjeCollection.insert({name:"Moja trzecia intencja", month:9, year:2015});
  });
}
