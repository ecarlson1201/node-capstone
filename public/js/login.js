function handleLogin() {
    LOGIN_FORM.removeClass('hidden');
    LOGIN_CANCEL.removeClass('hidden');
    LOGIN_BUTTON.addClass('hidden');
    SIGNUP_BUTTON.addClass('hidden');

    LOGIN_FORM.submit(function (event) {
        event.preventDefault();

        const jsonData = LOGIN_FORM.serializeObject()
        data = JSON.stringify(jsonData);
        authLogin(data)
    });
};

function handleSignup() {
    LOGIN_BUTTON.addClass('hidden');
    SIGNUP_BUTTON.addClass('hidden');
    LOGIN_CANCEL.removeClass('hidden');
    SIGNUP_FORM.removeClass('hidden');

    SIGNUP_FORM.submit(function (event) {
        event.preventDefault();

        const jsonData = SIGNUP_FORM.serializeObject()
        data = JSON.stringify(jsonData);
        signUpUser(data)
    });
};

function handleCancelLogin() {
    LOGIN_CANCEL.addClass('hidden');
    LOGIN_BUTTON.removeClass('hidden');
    SIGNUP_BUTTON.removeClass('hidden');
    LOGIN_FORM.addClass('hidden');
    SIGNUP_FORM.addClass('hidden');

};

function handleDeleteUser() {

};

$.fn.serializeObject = function () {
    const jsonObj = {};
    const input = this.serializeArray();
    $.each(input, function () {
        if (jsonObj[this.name] !== undefined) {
            if (!jsonObj[this.name].push) {
                jsonObj[this.name] = [jsonObj[this.name]];
            }
            jsonObj[this.name].push(this.value || '');
        } else {
            jsonObj[this.name] = this.value || '';
        }
    });
    return jsonObj;
};
