function displayEditSchedule() {
    $('.js-checkbox').removeClass('hidden');
    EDIT_BUTTONS.removeClass('hidden');
    $('.js-update-entry-button').removeClass('hidden');
    cancelAddEntry();
    cancelUpdateEntry();
    handleUpdateClick();
};

function cancelEditSchedule() {
    EDIT_BUTTONS.addClass('hidden');
    $('.js-checkbox').prop('checked', false);
    $('.js-checkbox').addClass('hidden');
    $('.js-update-entry-button').addClass('hidden');
};

function clearSchedule() {
    $('.js-checkbox').prop('checked', true);
};

function daySelectAll() {
    DAYSELECT.prop('checked', true);
};

function editFormSubmit() {
    let editDayArray = [];

    $.each($("input[class='js-checkbox']:checked"), function () {
        let that = $(this).closest('li').attr("id")
        editDayArray.push(that)
    })
    deleteEntriesApi(JSON.stringify(editDayArray));
    cancelEditSchedule();
};

DAYSELECT.click(function () {
    $(this).prop('checked', function (val) {
    })
});