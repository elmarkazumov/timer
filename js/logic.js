
class Functional {

    getCurrentDate(date) {
        const dateOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        };

        return date.toLocaleDateString(undefined, dateOptions);
    }

    getCurrentWeekday(date) {
        return date.toLocaleDateString(undefined, {weekday: 'long'});
    }

    getCurrentTime(date) {
        return date.toLocaleTimeString();
    }

}

export {Functional}