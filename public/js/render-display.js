function getDays() {
    const resultArray = [];

    $('h3').each(function () {
        resultArray.push($(this).text());
    });
    
    return resultArray
};

function getTimeEntries(days, key) {
    $(`#${key}`).html("");
    days.forEach(function (e) {
        $(`#${key}`).append(renderResult(e));
    });
};

function displayTimeEntries(daysArray, dataObj) {
    daysArray.forEach(function (dayIndex) {
        getTimeEntries(dataObj[dayIndex], dayIndex);
    });
};

function renderResult(result) {
    return `
        <li class="time-entry">
        ${result.title} ${result.startTime} - ${result.endTime}
        <input type="checkbox" class="js-checkbox checked">
        </li><br>
    `;
};

$(function () {
    displayTimeEntries(getDays(), MOCK_TIME_ENTRIES);
});