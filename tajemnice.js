if (Meteor.isClient) {

    Template.tajemnice.helpers({
        'tajemnica':function(){
            var tajemnica = new Object;
            if(Meteor.userId()){
                var monthNum = moment().add(1, 'months').endOf('month').month();
                var yearNum = moment().add(1, 'months').endOf('month').year();
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
                tajemnica.registeredNextMonth = PrzydzialyCollection.find({month:monthNum,year:yearNum});
            }
            return tajemnica;
        }
    });

    Template.tajemnice.events({
        'click .join':function(){
            var monthNum = moment().add(1, 'months').endOf('month').month();
            var yearNum = moment().add(1, 'months').endOf('month').year();
            PrzydzialyCollection.insert({
                username:Meteor.user().username,
                month:monthNum,
                year:yearNum
            });
        }
    });
}

if(Meteor.isServer){}
