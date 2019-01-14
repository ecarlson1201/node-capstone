function getEntriesFromApi(callback) {
    $.ajax({
        type: "GET",
        url: SITE_URL + `/api/schedules/${sessionStorage.getItem('userId')}`,
        success: callback,
        dataType: "json",
        contentType: "application/json"
    });
};

function postEntriesToApi(data) {
    $.ajax({
        type: "POST",
        url: SITE_URL + `/api/schedules/${sessionStorage.getItem('userId')}`,
        data: data,
        success: function () {
            getEntriesFromApi(getDays);
        },
        dataType: "json",
        contentType: "application/json"
    });
};

function deleteEntriesApi(data) {
    $.ajax({
        type: "DELETE",
        url: SITE_URL + `/api/schedules/${sessionStorage.getItem('userId')}`,
        data: data,
        success: function () {
            getEntriesFromApi(getDays);
        },
        dataType: "json",
        contentType: "application/json"
    });
};

function putEntriesApi(data) {
    $.ajax({
        type: "PUT",
        url: SITE_URL + `/api/schedules/${sessionStorage.getItem('userId')}`,
        data: data,
        success: function () {
            getEntriesFromApi(getDays)
        },
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
            sessionStorage.setItem('authToken', data.authToken);
            sessionStorage.setItem('userId', data.userId)
            getEntriesFromApi(getDays);

            SCHEDULE.removeClass('hidden');
            LOGIN.addClass('hidden');
            $('nav').removeClass('hidden');
            $('.js-user-schedule').removeClass('hidden');

        },
        error: function(){
            alert('Create an account to begin!')
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
        error: function (obj) {
            if (obj.responseJSON.code === 422) {
                alert(obj.responseJSON.message)
            };
        },
        dataType: "json",
        contentType: "application/json"
    });
};