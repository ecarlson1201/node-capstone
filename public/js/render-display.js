function getDays(dataObj) {
    $('.js-day').html('');
    $('#js-user').html('');
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
    dayArray.forEach(function (e) {
        handleTimeCalc(e);
        $(`#js-time-${DAY}`).text(`${convertMinutesToHrMin(calcNonProdTime(PRODUCTIVE_TIME[DAY]))}`);
    });
};

function handleTimeCalc(entryObj){
    if (entryObj.category !== "leisure") {
        const totalStartMin = convertTotalMinutes(convertTime12to24(entryObj.startTime));
        const totalEndMin = convertTotalMinutes(convertTime12to24(entryObj.endTime));
        PRODUCTIVE_TIME[`${DAY}`] += (totalEndMin - totalStartMin);
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
    ${entryObj.title} ${entryObj.startTime} - ${entryObj.endTime}
    <input type="checkbox" name="edit-checkbox" class="js-checkbox hidden">
        </li><br>
    `;
};