let names;

// Keeps track whether table should be sorted ascending or descending, when clicking header
let sortedWithName = false
let sortedWithAmount = false

$(document).ready(() => {
    $.getJSON('names.json').then((data) => {
        names = data.names
        printNames()
        printTotal()
    })
});

$("#name").click(() => {
    sortedWithAmount = false

    if (sortedWithName) {
        sortNameDesc()
    } else {
        sortNameAsc()
    }

    printNames()
})

$("#amount").click(() => {
    sortedWithName = false

    if (sortedWithAmount) {
        sortAmountDesc()
    } else {
        sortAmountAsc()
    }

    printNames()
})

$("input").on("keyup", printNames);

function printNames() {
    $("tbody").html("")

    getFilteredNames().forEach(person => {
        $("tbody").append('<tr><td>' + person.name + '</td><td>' + person.amount + '</td></tr>')
    });

    printTotal()
}

function printTotal() {
    let total = 0
    getFilteredNames().forEach(person => {
        total += person.amount
    });

    $("#total").html(total)
}

function sortNameAsc() {
    names.sort((a, b) => {
        if (a.name < b.name) return -1
        if (a.name > b.name) return 1
        return 0
    })
    sortedWithName = true
}

function sortNameDesc() {
    names.sort((a, b) => {
        if (a.name < b.name) return 1
        if (a.name > b.name) return -1
        return 0
    })
    sortedWithName = false
}

function sortAmountAsc() {
    names.sort((a, b) => {
        if (a.amount < b.amount) return -1
        if (a.amount > b.amount) return 1
        return 0
    })

    sortedWithAmount = true
}

function sortAmountDesc() {
    names.sort((a, b) => {
        if (a.amount < b.amount) return 1
        if (a.amount > b.amount) return -1
        return 0
    })

    sortedWithAmount = false
}

function getFilteredNames() {
    const search = $("input").val().toLowerCase();

    if (search === "") {
        return names
    }

    return names.filter((person) => {
        return person.name.toLowerCase().includes(search)
    })
}