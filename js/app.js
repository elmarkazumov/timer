import {ChangeWindows} from './dom.js';

const changeWindows = new ChangeWindows();

changeWindows.init();

function timeout() {
    setTimeout(function () {
        changeWindows.changeCurrentDate();
        timeout();
    }, 1000);
}