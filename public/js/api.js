function getEntriesFromApi(callback) {
    $.getJSON("http://localhost:8080/api/time-entries", callback)
};
