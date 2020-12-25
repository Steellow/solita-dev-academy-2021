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
        $("tbody").append('<tr><td>' + person.name + '</td><td>' + person.amount + '</td></tr>') //! Potential XSS vulnerability
    });

    printTotal()
}

function printTotal() {
    let total = 0
    getFilteredNames().forEach(person => {
        total += person.amount
    });

    $("#total").text(total)
}

function sortNameAsc() {
    names.sort((a, b) => {
        return a.name.localeCompare(b.name)
    })
    sortedWithName = true
}

function sortNameDesc() {
    names.sort((a, b) => {
        return b.name.localeCompare(a.name)
    })
    sortedWithName = false
}


function sortAmountAsc() {
    // For future-me wondering how this works, read this: https://mdn.io/array-prototype-sort
    names.sort((a, b) => {
        return a.amount - b.amount
    })

    sortedWithAmount = true
}

function sortAmountDesc() {
    names.sort((a, b) => {
        return b.amount - a.amount
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