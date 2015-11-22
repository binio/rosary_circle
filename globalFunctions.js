MyApp = (function(){
    var api = {};

   api.nextMonth = function(){
        return moment().add(1, 'months').endOf('month').month();
    };

    api.currentMonth = function(){
        return moment().endOf('month').month();
    };

    api.yearNextMonth = function(){
        return moment().add(1, 'months').endOf('month').format("YYYY");
    };

    return api;
}());
