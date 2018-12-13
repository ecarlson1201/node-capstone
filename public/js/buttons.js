function displayAddEntry() {
    ADD.removeClass('checked');
    daySelect();
    addEntrySubmit();
};

function cancelAddEntry() {
    ADD.addClass('checked');
    DAYSELECT.attr('checked', false);
};

function addEntrySubmit() {
    ADD_FORM.submit(function (event) {
        event.preventDefault();
        $.each($("input[name='day']:checked"), function () {
            MOCK_TIME_ENTRIES[$(this).val()].push(newEntry());
        });
        displayTimeEntries(getDays(), MOCK_TIME_ENTRIES);
        cancelAddEntry();
    });
};

function newEntry() {
    return {
        "title": ADD_TITLE.val(),
        "startTime": timeConversion(ADD_START.val()),
        "endTime": timeConversion(ADD_END.val()),
    };
};

function daySelect() {
    DAYSELECT.click(function () {
        $(this).attr('checked', function (val) {
            return !val;
        });
    });
};

function daySelectAll() {
    DAYSELECT.attr('checked', true);
};

function displayEditSchedule() {
    $('.js-checkbox').removeClass('checked');
    EDIT_BUTTONS.removeClass('checked');
};

function clearSchedule() {
    $('.js-checkbox').prop('checked', true);
};

function cancelEditSchedule() {
    EDIT_BUTTONS.addClass('checked');
    $('.js-checkbox').prop('checked', false);
    $('.js-checkbox').addClass('checked');
};

//work in progress
function saveSchedule() {
    $.each($("input[class='js-checkbox']:checked"), function () {
        console.log($(this).parent().text());
    });
    displayTimeEntries(getDays(), MOCK_TIME_ENTRIES);
};

function cancelUpdateEntry() {
    UPDATE.addClass('checked');
};

//work in progress
TIME_ENTRY.click(function (e) {

});

function timeConversion (time) {
    var ts = time;
    var H = +ts.substr(0, 2);
    var h = (H % 12) || 12;
    h = (h < 10)?("0"+h):h;
    var ampm = H < 12 ? " AM" : " PM";
    ts = h + ts.substr(2, 3) + ampm;
    return ts;
  };
  