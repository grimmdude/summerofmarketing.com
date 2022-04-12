/**
 * Adds days to a date.
 * @day {Number} Number of days to add.
 * @return {Date} Date + @Day
*/
Date.prototype.addDays = function (num) {
    var value = this.valueOf();
    value += 86400000 * num;
    return new Date(value);
}

/**
 * Returns the next date with the specified day. 
 * @day {Number} 0 - 6 (Sunday - Saturday)
 
 * @return {Date} Next date with specified day
*/
Date.prototype.getNextDay = function (day) {
    for (i = 0; i < 7; i++) {
        var testDate = new Date().addDays(i + 1);

        if (testDate.getDay() === day) return testDate
    }
}

function clearLocalStorage() {
    localStorage.clear(); //Clears the untilDate record.
    document.location = document.location;
}


$(document).ready(function () {
    if (supports_html5_storage()) {
        if (typeof localStorage.getItem('untilDate') !== 'undefined') {
            if (localStorage.getItem('untilDate') === null || new Date(localStorage.getItem('untilDate')) < new Date()) {
                var nextDate = new Date().getNextDay(1);
                nextDate.setUTCHours(6,0,0,0)

                localStorage.setItem('untilDate', nextDate.toUTCString());
            }

            $('.countdownBox').countdown({
                until: new Date(localStorage.getItem('untilDate')), format: 'dHMS', onExpiry: startResetCounter
            });
        }
    }

    /**
     * Determines whether or not the browser supports localStorage.
     * @return {Bool} Whether or not browser supports localStorage.
    */
    function supports_html5_storage() {
        try {
            return 'localStorage' in window && window['localStorage'] !== null;
        } catch (e) {
            return false;
        }
    }

    /**
     * Callback function for countdown. Resets until date. 
     * @return {Void}
    */
    function startResetCounter() {
        $('.countdownBox').countdown('destroy');
        localStorage.setItem('untilDate', new Date().addDays(7))

        $('.countdownBox').countdown({
            until: new Date(localStorage.getItem('untilDate')), format: 'dHMS', onExpiry: startResetCounter
        })
    }
});