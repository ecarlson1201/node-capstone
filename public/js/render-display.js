function getDays(dataObj) {
    $('.js-day').html('');
    $('#js-user').append(`Welcome ${dataObj[0].user}`);
    dataObj[0].data.forEach(function (result) {
        getTimeEntries(result);
    });
};

function getTimeEntries(dayObj) {
    dayObj.entries.forEach(function (e) {
        $(`#${dayObj.day}`).append(`${renderResult(e)}`)
    });  
};

function renderResult(entryObj) {
    return `
        <li class="time-entry">
        ${entryObj.title} ${entryObj.startTime} - ${entryObj.endTime}
        <input type="checkbox" class="js-checkbox checked">
        </li><br>
    `;
};

$(function () {
    getEntriesFromApi(getDays);
});