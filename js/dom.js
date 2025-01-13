
class ChangeWindows {
    constructor() {
        this.objectWindows = {
            windowTime: document.querySelector('.window__time'),
            windowStopwatcth: document.querySelector('.window__stopwatch'),
            windowCountdown: document.querySelector('.window__countdown'),
        }
    }

    hiddenWindows() {
        for (const key in this.objectWindows) {
            this.objectWindows[key].style.display = 'none';
        }
    }
}

export {ChangeWindows}