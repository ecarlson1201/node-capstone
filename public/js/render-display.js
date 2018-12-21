function getDays(dataObj) {
    $('.js-day').html('');
    $('#js-user').html('');
    let data = dataObj.data
    
    for (let day in data) {
        if (day !== "_id") {
            DAY = day
            getTimeEntries(data[day]);
        };
    };
};

function getTimeEntries(dayArray) {
    dayArray.forEach(function (e) {
        $(`#${DAY}`).append(`${renderResult(e)}`)
    });
};

function renderResult(entryObj) {
    return `
        <li class="time-entry">
        ${entryObj.title} ${entryObj.startTime} - ${entryObj.endTime}
        <input type="checkbox" class="js-checkbox hidden">
        </li><br>
    `;
};

/*$(function () {
    getEntriesFromApi({"user": `"${USER_ID}"`}, getDays);
});*/