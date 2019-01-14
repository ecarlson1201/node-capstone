/* handles time coversions from 24hrs down to minutes, calculations of used minutes
out of whole day, and conversions back to 12hr time*/

function convertTime24to12(time) {
    var ts = time;
    var H = +ts.substr(0, 2);
    var h = (H % 12) || 12;
    h = (h < 10) ? ("0" + h) : h;
    var ampm = H < 12 ? " AM" : " PM";
    ts = h + ts.substr(2, 3) + ampm;
    return ts;
};

function convertTime12to24(time12h) {
    const [time, modifier] = time12h.split(' ');

    let [hours, minutes] = time.split(':');

    if (hours === '12') {
        hours = '00';
    };

    if (modifier === 'PM') {
        hours = parseInt(hours, 10) + 12;
    };

    return hours + ':' + minutes;
};

function convertTotalMinutes(time24h) {
      let [hours, minutes] = time24h.split(':');
       return Number(hours * 60) + Number(minutes);
};

function calcNonProdTime(prodMin) {
    return 1440 - prodMin;
};

function convertMinutesToHrMin(totalMin) {
    const hours = Math.floor(totalMin / 60);
    const minutes = totalMin % 60;

    return hours + " hrs" + " " + minutes + " min";
};