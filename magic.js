var names;

$(document).ready(function() {
    $.getJSON('names.json').then(function(data) {
        names = data.names
    })
});