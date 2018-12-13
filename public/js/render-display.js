function getDays(dataObj) {
    $('.js-day').html('');
    dataObj.data.forEach(function (result) {
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

function renderUser(dataObj) {
    $('#js-user').append(`Welcome ${dataObj.user}`);
};

$(function () {
    getDays(MOCK_TIME_ENTRIES);
    renderUser(MOCK_TIME_ENTRIES);
});