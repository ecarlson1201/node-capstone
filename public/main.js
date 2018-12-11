function getDays() {
    const resultArray = [];

    $('h3').each(function () {
        resultArray.push($(this).text());
    });
    return resultArray
};

function getTimeEntries(days, key) {
    days.forEach(function(e){
        $(`#${key}`).html("");
    });
    days.forEach(function (e) {
        $(`#${key}`).append(renderResult(e));
    });
};

function displayTimeEntries(daysArray, dataObj) {
    daysArray.forEach(function (dayIndex) {
        for (const dayKey in dataObj) {
            let value = dataObj[dayKey];
            if(dayIndex === dayKey){
                getTimeEntries(value, dayKey);
            };
        };
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