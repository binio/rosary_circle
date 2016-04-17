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
            'Radosna - Zwiastowanie Najświętszej Marii Pannie',
            'Radosna - Nawiedzenie Elżbiety',
            'Radosna - Narodziny Pana Jezusa',
            'Radosna - Ofiarowanie Pana Jezusa',
            'Radosna - Odnalezienie Pana Jezusa w Świątyni',
            'Bolesna - Modlitwa w Ogrójcu',
            'Bolesna - Biczowanie Pana Jezusa',
            'Bolesna - Cierniem ukoronowanie',
            'Bolesna - Dźwiganie krzyża przez Pana Jezusa',
            'Bolesna - Śmierć Pana Jezusa na krzyżu',
            'Chwalebna - Zmartwychwstanie Pana Jezusa',
            'Chwalebna - Wniebowstąpienie Pana Jezusa',
            'Chwalebna - Wniebowstąpienie Najświętszej Marii Panny',
            'Chwalebna - Ukoronowanie Marii na Królową nieba i Ziemi',
            'Chwalebna - Zesłanie Ducha Świętego',
            'Światła - Chrzest Pana Jezusa w Jordanie',
            'Światła - Pierwszy cud w Kanie Galilejskiej',
            'Światła - Głoszenie nauk o Królestwie Bożym',
            'Światła - Przemienienie na górze Tabor',
            'Światła - Ustanowienie Eucharystii'];
    }

    return api;
}());
