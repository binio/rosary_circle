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

    api.currentMonthName = function(){
        return moment().endOf('month').format('MMMM');
    };

    api.nextMonthName = function(){
        return moment().add(1, 'months').endOf('month').format('MMMM');
    };
    api.getPartsArray = function(){
        return [
            'Radosna - Zwiastowanie NMP + wstęp',
            'Radosna - Nawiedzenie świętej Elżbiety',
            'Radosna - Narodziny Pana Jezusa',
            'Radosna - Ofiarowanie Jezusa w świątyni',
            'Radosna - Odnalezienie Jezusa w świątyni',
            'Światła - Chrzest Jezusa w Jordanie',
            'Światła - Objawienie się Jezusa w Kanie Galilejskiej',
            'Światła - Głoszenie królestwa i wzywanie do nawrócenia',
            'Światła - Przemienienie Pańskie na górze Tabor',
            'Światła - Ustanowienie Eucharystii',
            'Bolesna - Modlitwa w Ogrójcu',
            'Bolesna - Biczowanie Pana Jezusa',
            'Bolesna - Cierniem ukoronowanie Pana Jezusa',
            'Bolesna - Dźwiganie krzyża na Kalwarię',
            'Bolesna - Ukrzyżowanie i śmierć Pana Jezusa',
            'Chwalebna - Zmartwychwstanie Jezusa Chrystusa',
            'Chwalebna - Wniebowstąpienie Pana Jezusa',
            'Chwalebna - Zesłanie Ducha Świętego',
            'Chwalebna - Wniebowzięcie Najświętszej Maryi Panny',
            'Chwalebna - Ukoronowanie Maryi na Królową nieba i ziemi + Pod Twoją obronę'
        ];
    }

    return api;
}());
