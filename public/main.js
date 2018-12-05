function getDays() {
    const resultArray = [];

    $('h3').each(function () {
        resultArray.push($(this).text());
    })
    return resultArray
};

function displayTimeEntries(days, data) {
    days.forEach(function (e) {
        data.forEach(function (x) {
            x.days.forEach(function (y) {
                if (e === y) {
                    $(`#${e}`).append(renderResult(x));
                };
            });
        });
    });
};

function renderResult(result) {
    return `
        <li class="time-entry">
        ${result.title} ${result.startTime} - ${result.endTime}<br>
        </li>
    `;
};

$(function () {
    displayTimeEntries(getDays(), MOCK_TIME_ENTRIES);
});