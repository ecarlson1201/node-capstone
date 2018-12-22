function displayAddEntry() {
    ADD.removeClass('hidden');
    cancelEditSchedule();
    cancelUpdateEntry();
};

function cancelAddEntry() {
    ADD.addClass('hidden');
    DAYSELECT.attr('hidden', false);
    ADD_TITLE.val('');
    ADD_START.val('');
    ADD_END.val('');
    ADD_CATEGORY.val('');
    $.each($("input[name='day']"), function () {
        $(this).prop('checked', false);
    });
};

ADD_FORM.submit(function (event) {
    event.preventDefault();
    let addDayArray = []

    $.each($("input[name='day']:checked"), function () {
        let that = $(this).val()
        addDayArray.push(that)
    })
    postEntriesToApi(JSON.stringify(newEntry(addDayArray)));
    cancelAddEntry();
});


function newEntry(days) {
    return {
        "title": ADD_TITLE.val(),
        "startTime": convertTime24to12(ADD_START.val()),
        "endTime": convertTime24to12(ADD_END.val()),
        "category": ADD_CATEGORY.val(),
        "day": days
    };
};