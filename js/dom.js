import {Functional} from "./logic.js";
import { RequestToApi } from "./api.js";


class ChangeWindows {
    constructor() {
        this.objectWindows = {
            windowTime: document.querySelector('.window__time'),
            windowStopwatcth: document.querySelector('.window__stopwatch'),
            windowCountdown: document.querySelector('.window__countdown'),
        }

        this.logic = new Functional();
        this.api = new RequestToApi();
    }

    hiddenWindows() {
        for(const key in this.objectWindows) {
            this.objectWindows[key].style.display = 'none';
        }
    }

    showSelectedWindow() {
        const buttons = document.querySelectorAll('.header__buttons > li');

        buttons.forEach(button => {
            button.addEventListener('click', (event) => {
                this.hiddenWindows();
                this.objectWindows[event.target.getAttribute('data-button')].style.display = 'flex';
            });
        })
    }    

    changeCurrentDate() {
        const localTime = this.objectWindows.windowTime.querySelector('#local_time');
        const localDate = this.objectWindows.windowTime.querySelector('#local_date');
        const localWeekDay = this.objectWindows.windowTime.querySelector('#local_day');

        const updateDate = () => {
            localTime.textContent = this.logic.getCurrentTime(new Date());

            localDate.textContent = this.logic.getCurrentDate(new Date());
            localWeekDay.textContent = this.logic.getCurrentWeekday(new Date());
            setTimeout(updateDate, 1000);
          }
          
          updateDate();

    }

    selectLocation(){
        const formSearchLocation = this.objectWindows.windowTime.querySelector('.window__search');
        const location = formSearchLocation.querySelector('#search_zone');

        formSearchLocation.addEventListener('submit', async (event) => {
            event.preventDefault();
            let searchedLocation = location.value;

            const changeSelectedDate = async () => {
                const response = await this.api.getDate(searchedLocation);
                this.createWindowSelectedLocation(response.date_time, response.timezone);
            
                setTimeout(changeSelectedDate, 10000);
            }
            
            changeSelectedDate();

            location.value = '';
        })
    }

    createWindowSelectedLocation(date, location) {
        const selectedTime = this.objectWindows.windowTime.querySelector('#selected_time');
        const selectedDate = this.objectWindows.windowTime.querySelector('#selected_date');
        const selectedWeekDay = this.objectWindows.windowTime.querySelector('#selected_day');
        const selectedLocation = this.objectWindows.windowTime.querySelector('#selected_location');
        const selectedLocationWindow = this.objectWindows.windowTime.querySelector('.selected_location_window');
        selectedLocationWindow.style.display = 'flex';

        selectedTime.textContent = this.logic.getMinutesHours(new Date(date));

        selectedDate.textContent = this.logic.getCurrentDate(new Date(date));

        selectedWeekDay.textContent = this.logic.getCurrentWeekday(new Date(date));

        selectedLocation.textContent = location;

    }

    controlStopwatch() {
        const stopwatchIndicator = this.objectWindows.windowStopwatcth.querySelector('#stopwatch_indicator');
        const startStopButton = this.objectWindows.windowStopwatcth.querySelector('#stopwatch_start_stop');
        const resetButton = this.objectWindows.windowStopwatcth.querySelector('#stopwatch_reset');
        let state = false;

        this.objectWindows.windowStopwatcth.addEventListener('click', (event) => {
            if(event.target == startStopButton) {
                state = state == false ? true: false;
                
                if(state) {
                    this.logic.startStopwatch(stopwatchIndicator, state);
                } else {
                    this.logic.stopwatch(state);
                }

            }

            if(event.target == resetButton) {
                this.logic.resetStopwatch();
                state = false;
                stopwatchIndicator.textContent = '00:00:00';
            }
        })
    }

    controlCountdown() {
        const countdownIndicator = this.objectWindows.windowCountdown.querySelector('#countdown_indicator');
        const startStopButton = this.objectWindows.windowCountdown.querySelector('#countdown_start_stop');
        const resetButton = this.objectWindows.windowCountdown.querySelector('#countdown_reset');
        let state = false;

        const countdownHour = this.objectWindows.windowCountdown.querySelector('#countdown_hour');
        const countdownMin = this.objectWindows.windowCountdown.querySelector('#countdown_min');
        const countdownSec = this.objectWindows.windowCountdown.querySelector('#countdown_sec');

        this.objectWindows.windowCountdown.addEventListener('click', (event) => {
            if(event.target == startStopButton) {
                state = state == false ? true: false;
                
                if(state) {
                    this.logic.startCountdown(countdownIndicator, state, [countdownHour.value, countdownMin.value, countdownSec.value]);
                } else {
                    this.logic.stopCountdown(state);
                }
            }

            if(event.target == resetButton) {
                this.logic.resetCountdown();
                state = false;
                countdownIndicator.textContent = '00:00:00';
            }
        })
    }

    init() {
        this.showSelectedWindow();
        this.changeCurrentDate();
        this.controlStopwatch();
        this.controlCountdown();
        this.selectLocation();
    }

}

export {ChangeWindows}