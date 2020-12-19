var names;

$(document).ready(function() {
    $.getJSON('names.json').then(function(data) {
        names = data.names
        printNames()
    })
});

function printNames() {
    $("tbody").html("")

    names.forEach(person => {
        $("tbody").after('<tr><td>' + person.name + '</td><td>' + person.amount + '</td></tr>')
    });
}