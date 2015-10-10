if (Meteor.isClient) {
    Meteor.subscribe('tajemniceTwoMonths');

    Template.tajemnice.helpers({
        'tajemnica':function(){
            var tajemnica = new Object;
            if(Meteor.userId()){
                var monthNum = moment().add(1, 'months').endOf('month').month();
                var yearNum = moment().add(1, 'months').endOf('month').year();
                var currMonthNum = moment().endOf('month').month();
                var currYearNum = moment().endOf('month').year();

                tajemnica.joinNextMonth = PrzydzialyCollection.find({
                    username:Meteor.user().username,
                    month:monthNum
                }).count();

                if(tajemnica.joinNextMonth != 0){
                    tajemnica.joinNextMonth = false;
                }else{
                    tajemnica.joinNextMonth = true;
                }

                tajemnica.currentMonth = moment().add(1, 'months').endOf('month').format('MMMM');
                tajemnica.nextMonth = moment().endOf('month').format('MMMM');
                tajemnica.registeredNextMonth = PrzydzialyCollection.find({month:monthNum,year:yearNum});
                tajemnica.registeredCurrentMonth = PrzydzialyCollection.find({month:currMonthNum,year:currYearNum});
            }
            return tajemnica;
        }
    });

    Template.tajemnice.events({
        'click .join':function(){
            var monthNum = moment().add(1, 'months').endOf('month').month();
            var yearNum = moment().add(1, 'months').endOf('month').year();
            Meteor.call('joinMonth',{
                username:Meteor.user().username,
                month:monthNum,
                year:yearNum
            });
        }
    });
}

if(Meteor.isServer){
    Meteor.publish('tajemniceTwoMonths', function(){
        var currentMonth = moment().endOf('month').month();
        var nextMonth = moment().add(1, 'months').endOf('month').month();
        return PrzydzialyCollection.find({$or: [ { month: { $eq: currentMonth } }, { month: { $eq: nextMonth } }]});
    });

    Meteor.methods({
        'joinMonth':function(data){
            if(!this.userId){
                throw new Meteor.Error('You have to login');
            }
            PrzydzialyCollection.insert(data);
        }
    });
}
