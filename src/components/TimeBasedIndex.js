export function timebasedindex() {
    let date = new Date();
    let millisec = date.getMilliseconds();
    if (millisec < 10) {
        millisec = '00' + String(millisec);
    }
    if (millisec < 100) {
        millisec = '0' + String(millisec);
    }
    let sec = date.getSeconds();
    if (sec < 10) {
        sec = '0' + String(sec);
    }
    let min = date.getMinutes();
    if (min < 10) {
        min = '0' + String(min);
    }
    let hour = date.getHours();
    if (hour < 10) {
        hour = '0' + String(hour);
    }
    let dateoftheday = date.getUTCDate();
    let monthoftheday = date.getUTCMonth();
    let yearoftheday = date.getUTCFullYear();
    return (+(String(yearoftheday) + monthoftheday + dateoftheday + hour + min + sec + millisec));
}