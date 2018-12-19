function displayAddEntry() {
    ADD.removeClass('hidden');
    daySelect();
    addEntrySubmit();
    cancelEditSchedule();
};

function cancelAddEntry() {
    ADD.addClass('hidden');
    DAYSELECT.attr('hidden', false);
};

function addEntrySubmit() {
    ADD_FORM.submit(function (event) {
        event.preventDefault();
        let dayArray = []

        $.each($("input[name='day']:checked"), function () {
                let that = $(this).val()
                dayArray.push(that)
        })
        postEntriesToApi(JSON.stringify(newEntry(dayArray)));
        cancelAddEntry();
    });
};

function newEntry(days) {
    return {
        "title": ADD_TITLE.val(),
        "startTime": timeConversion(ADD_START.val()),
        "endTime": timeConversion(ADD_END.val()),
        "category": ADD_CATEGORY.val(),
        "day": days
    };
};

function daySelect() {
    DAYSELECT.click(function () {
        $(this).prop('checked', function (val) {
        });
    });
};

function daySelectAll() {
    DAYSELECT.prop('checked', true);
};

function displayEditSchedule() {
    $('.js-checkbox').removeClass('hidden');
    EDIT_BUTTONS.removeClass('hidden');
    cancelAddEntry();
};

function clearSchedule() {
    $('.js-checkbox').prop('checked', true);
};

function cancelEditSchedule() {
    EDIT_BUTTONS.addClass('hidden');
    $('.js-checkbox').prop('checked', false);
    $('.js-checkbox').addClass('hidden');
};

function cancelUpdateEntry() {
    UPDATE.addClass('hidden');
};

function timeConversion(time) {
    var ts = time;
    var H = +ts.substr(0, 2);
    var h = (H % 12) || 12;
    h = (h < 10) ? ("0" + h) : h;
    var ampm = H < 12 ? " AM" : " PM";
    ts = h + ts.substr(2, 3) + ampm;
    return ts;
};
