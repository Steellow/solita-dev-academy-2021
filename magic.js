var names;

$(document).ready(function() {
    $.getJSON('names.json').then(function(data) {
        names = data.names
        printNames()
        calculateTotal()
    })
});

function printNames() {
    $("tbody").html("")

    names.forEach(person => {
        $("tbody").after('<tr><td>' + person.name + '</td><td>' + person.amount + '</td></tr>')
    });
}

function calculateTotal() {
    let total = 0
    names.forEach(person => {
        total += person.amount
    });

    $("#total").html(total)
}