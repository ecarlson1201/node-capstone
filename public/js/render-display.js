function getDays(dataObj) {
    $('.js-day').html('');
    let data = dataObj.data

    for (let day in data) {
        if (day !== "_id") {
            DAY = day
            PRODUCTIVE_TIME[DAY] = 0;
            getTimeEntries(data[day]);
            handleTimeDisplay(data[day]);
        };
    };
};

function handleTimeDisplay(dayArray) {
    dayArray.forEach(function (event) {
        handleTimeCalc(event);
        $(`#js-time-${DAY}`).text(`${convertMinutesToHrMin(calcNonProdTime(PRODUCTIVE_TIME[DAY]))}`);
    });
};

function handleLogout(){
    $('.js-day').html('');
    $('.js-user-schedule').addClass('hidden');
    $('.js-schedule').addClass('hidden');
    handleCancelLogin();
    LOGIN.removeClass('hidden');
    $('nav').addClass('hidden');
    sessionStorage.clear();
};

function handleTimeCalc(entryObj) {
    if (entryObj.category !== "leisure") {
        const totalStartMin = convertTotalMinutes(convertTime12to24(entryObj.startTime));
        const totalEndMin = convertTotalMinutes(convertTime12to24(entryObj.endTime));

        if (totalEndMin - totalStartMin < 0) {
            PRODUCTIVE_TIME[`${DAY}`] += (1440 + (totalEndMin - totalStartMin));
        }
        else {
            PRODUCTIVE_TIME[`${DAY}`] += (totalEndMin - totalStartMin);
        };
    };
};

function getTimeEntries(dayArray) {
    dayArray.forEach(function (e) {
        $(`#${DAY}`).append(`${renderResult(e)}`);
    });
};

function renderResult(entryObj) {
    return `
    <li class="js-time-entry" id=${entryObj._id} >
    <button class="js-update-entry-button hidden">Edit</button>
    ${entryObj.title} <span class="entry-time-display">${entryObj.startTime} - ${entryObj.endTime}</span>
    <input type="checkbox" name="edit-checkbox" class="js-checkbox hidden checkbox">
        </li><br>
    `;
};