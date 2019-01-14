// uses data from server response and injects each entry into appropriate day in schedule
function getDays(dataObj) {
    $('.js-day').html('');
    $('.js-total-time').text('');
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

//displays unproductive time for each day
function handleTimeDisplay(dayArray) {
    dayArray.forEach(function (event) {
        handleTimeCalc(event);
        $(`#js-time-${DAY}`).text(`${convertMinutesToHrMin(calcNonProdTime(PRODUCTIVE_TIME[DAY]))}`);
    });
};

// handles display changes and clearing storage on logout
function handleLogout(){
    $('.js-day').html('');
    $('.js-user-schedule').addClass('hidden');
    $('.js-schedule').addClass('hidden');
    handleCancelLogin();
    LOGIN.removeClass('hidden');
    $('nav').addClass('hidden');
    $('.js-total-time').text('');
    sessionStorage.clear();
};

// handles the calculations for unproductive time
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

//displays time entries for each day
function getTimeEntries(dayArray) {
    dayArray.forEach(function (e) {
        $(`#${DAY}`).append(`${renderResult(e)}`);
    });
};

//renders results from server response
function renderResult(entryObj) {
    return `
    <li class=${entryObj._id} >
        <button class="js-update-entry-button hidden">Edit</button>
            ${entryObj.title} <span class="entry-time-display">${entryObj.startTime} - ${entryObj.endTime}</span><span class='js-time-entry-delete hidden'>Delete 
        <input type="checkbox" name="edit-checkbox" class="js-checkbox hidden"</span>
    </li>
    `;
};