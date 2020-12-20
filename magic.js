var names;

// Keeps track whether table should be sorted ascending or descending, when clicking header
var sortedWithName = false
var sortedWithAmount = false

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
    sortedWithAmount = false

    if (sortedWithName) {
        sortNameDesc()
    } else {
        sortNameAsc()
    }

    printNames()
})

$("#amount").click(function() {
    sortedWithName = false

    if (sortedWithAmount) {
        sortAmountDesc()
    } else {
        sortAmountAsc()
    }

    printNames()
})

function sortNameAsc() {
    names.sort(function(a, b) {
        if (a.name < b.name) return -1
        if (a.name > b.name) return 1
        return 0
    })
    sortedWithName = true
}

function sortNameDesc() {
    names.sort(function(a, b) {
        if (a.name < b.name) return 1
        if (a.name > b.name) return -1
        return 0
    })
    sortedWithName = false
}

function sortAmountAsc() {
    names.sort(function(a, b) {
        if (a.amount < b.amount) return -1
        if (a.amount > b.amount) return 1
        return 0
    })

    sortedWithAmount = true
}

function sortAmountDesc() {
    names.sort(function(a, b) {
        if (a.amount < b.amount) return 1
        if (a.amount > b.amount) return -1
        return 0
    })

    sortedWithAmount = false
}