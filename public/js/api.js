function getEntriesFromApi() {
    const url = '//localhost:8080/api/days'
    $.ajax({
        type: "GET", //rest Type
        dataType: 'jsonp', //mispelled
        url: url,
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (msg) {
            console.log(msg);                
        }
});
};
