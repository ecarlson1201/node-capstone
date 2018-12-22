function cancelUpdateEntry() {
    UPDATE.addClass('hidden');
};

function handleUpdateClick() {
    $('.js-update-entry-button').click(function () {
        UPDATE.removeClass('hidden');
        cancelAddEntry();
        cancelEditSchedule();
        UPDATE_ID = $(this).closest('li').attr("id");
    });
};

function updateEntry() {
    return {
        "_id": UPDATE_ID,
        "title": UPDATE_TITLE.val(),
        "startTime": convertTime24to12(UPDATE_START.val()),
        "endTime": convertTime24to12(UPDATE_END.val()),
        "category": ADD_CATEGORY.val(),
    };
};

UPDATE.submit(function (event) {
    event.preventDefault();
     putEntriesApi(JSON.stringify(updateEntry()));
    cancelUpdateEntry();
});