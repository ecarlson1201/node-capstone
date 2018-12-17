function getEntriesFromApi(data, callback) {
    $.ajax({
        type: "GET",
        url: SITE_URL + '/api/time-entries',
        data: data,
        success: callback,
        dataType: "json",
        contentType: "application/json"
    });
};

function authLogin(data) {
    $.ajax({
        type: "POST",
        url: SITE_URL + '/api/auth/login',
        data: data,
        success: function (data) {
            SESSION_TOKEN = data
            USER_ID = $('#js-user-login').val()
            getEntriesFromApi(USER_QUERY(USER_ID), getDays);
            SCHEDULE.removeClass('hidden');
            LOGIN.addClass('hidden');
            $('nav').removeClass('hidden');

        },
        dataType: "json",
        contentType: "application/json"
    });
};

function signUpUser(data) {
    $.ajax({
        type: "POST",
        url: SITE_URL + '/api/users',
        data: data,
        success: function () {
            alert('Success! User created.')
            SIGNUP_FORM.addClass('hidden');
            LOGIN_FORM.removeClass('hidden');
        },
        dataType: "json",
        contentType: "application/json"
    });
};

function deleteUser(data) {
    $.ajax({
        type: "DELETE",
        url: SITE_URL + "api/users/delete/:id",
        data: data,
        success: function () {
            alert("Success! User deleted.");
            handleCancelLogin();
        },
        dataType: "json",
        contentType: 'application/json'
    });
};