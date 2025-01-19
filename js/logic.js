
class Functional {
    constructor() {
        this.stopwatchParams = {
            sec: 0,
            min: 0,
            hour: 0,
        },

        this.countdownParams = {
        }
    }

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

    startStopwatch(widget, state) {

        const updateSecond = () => {
            if(this.stopwatchParams.sec < 59) {
                this.stopwatchParams.sec += 1;
            } else {
                this.stopwatchParams.min += 1;
                this.stopwatchParams.sec = 0;
            }

            if(this.stopwatchParams.min > 59) {
                this.stopwatchParams.hour += 1;
                this.stopwatchParams.min = 0;
            }

            widget.textContent = `${this.stopwatchParams.hour < 10 ? '0' + this.stopwatchParams.hour: this.stopwatchParams.hour}:
            ${this.stopwatchParams.min < 10 ? '0' + this.stopwatchParams.min: this.stopwatchParams.min}:
            ${this.stopwatchParams.sec < 10 ? '0' + this.stopwatchParams.sec: this.stopwatchParams.sec}`.replace(/\:\n(\s+)/gm, ':');
            
            this.stopwatchParams.timer = setTimeout(updateSecond, 1000);
            

          }

          if(state) {
            updateSecond();
          }
    }

    stopwatch(state) {
        if(!state) {
            clearTimeout(this.stopwatchParams.timer);
        }
    }

    resetStopwatch() {
        if(this.stopwatchParams.timer) {
            this.stopwatchParams.sec = 0;
            this.stopwatchParams.min = 0;
            this.stopwatchParams.hour = 0;
            clearTimeout(this.stopwatchParams.timer);
        }
    }

    startCountdown(widget, state, values) {

        if(!Object.keys(this.countdownParams).length) {
            this.countdownParams.hour = +values[0];
            this.countdownParams.min = +values[1];
            this.countdownParams.sec = +values[2];
        }

        const updateCountdown = () => {

            if(this.countdownParams.min == 0 && this.countdownParams.hour > 0) {
                this.countdownParams.min = 60;
                this.countdownParams.hour -= 1;
            }

            if(this.countdownParams.sec == 0 && this.countdownParams.min > 0) {
                this.countdownParams.sec = 60;
                this.countdownParams.min -= 1;
            }

            if(this.countdownParams.sec <= 60 && this.countdownParams.sec > 0) {
                this.countdownParams.sec -= 1;
            }

            widget.textContent = `${this.countdownParams.hour < 10 ? '0' + this.countdownParams.hour: this.countdownParams.hour}:
            ${this.countdownParams.min < 10 ? '0' + this.countdownParams.min: this.countdownParams.min}:
            ${this.countdownParams.sec < 10 ? '0' + this.countdownParams.sec: this.countdownParams.sec}`.replace(/\:\n(\s+)/gm, ':');


            this.countdownParams.timer = setTimeout(updateCountdown, 1000);
          }

          if(state) {
            updateCountdown();
          }
    }

    stopCountdown(state) {
        if(!state) {
            clearTimeout(this.countdownParams.timer);
        }
    }

    resetCountdown() {
        if(this.countdownParams.timer) {
            clearTimeout(this.countdownParams.timer);
            this.countdownParams = {};
        }
    }

}

export {Functional}