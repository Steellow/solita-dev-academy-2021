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
        $("tbody").append('<tr><td>' + person.name + '</td><td>' + person.amount + '</td></tr>')
    });
}

function calculateTotal() {
    let total = 0
    names.forEach(person => {
        total += person.amount
    });

    $("#total").html(total)
}

$("#name").click(function() {
    sortAlphabetical()
    printNames()
})

$("#amount").click(function() {
    sortAmount()
    printNames()
})

function sortAlphabetical() {
    names.sort(function(a, b) {
        if (a.name < b.name) return -1
        if (a.name > b.name) return 1
        return 0
    })
}

function sortReverseAlphabetical() {
    names.sort(function(a, b) {
        if (a.name < b.name) return 1
        if (a.name > b.name) return -1
        return 0
    })
}

function sortAmount() {
    names.sort(function(a, b) {
        if (a.amount < b.amount) return -1
        if (a.amount > b.amount) return 1
        return 0
    })
}

function sortReverseAmount() {
    names.sort(function(a, b) {
        if (a.amount < b.amount) return 1
        if (a.amount > b.amount) return -1
        return 0
    })
}