import {Functional} from "./logic.js";


class ChangeWindows {
    constructor() {
        this.objectWindows = {
            windowTime: document.querySelector('.window__time'),
            windowStopwatcth: document.querySelector('.window__stopwatch'),
            windowCountdown: document.querySelector('.window__countdown'),
        }

        this.logic = new Functional();
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

    init() {
        this.showSelectedWindow();
        this.changeCurrentDate();
    }

}

export {ChangeWindows}