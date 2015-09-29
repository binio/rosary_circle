if (Meteor.isClient) {

    Template.tajemnice.helpers({
        'tajemnica':function(){
            var tajemnica = new Object;
            tajemnica.currentMonth = moment().add(1, 'months').endOf('month').format('MMMM');
            return tajemnica;
        }
    });

    Template.tajemnice.events({
        'click .join':function(){
            $('.btn').hide();
            $('.join-info').removeClass('alert-danger');
            $('.join-info').addClass('alert-success');
            $('.alert a').text('Gratulacje!');
        }
    });
}

if(Meteor.isServer){}
