var maskedIds = {}

var dateModalElem
var descriptionInput
var dateModal
var yearInput
var monthInput
var dayInput
var hourInput
var minuteInput
var secondInput

async function show() {
    let response = await fetch("/todos")
    let entries = await response.json()

    let html = ""

    for (let entry of entries) {
        if (entry.id in maskedIds) {
            continue
        }

        let additionalLiCLasses = ""
        let additionalEcheanceCLasses = "text-secondary"
        if (entry.statut == "EN_RETARD") {
            additionalLiCLasses = "bg-danger text-white"
            additionalEcheanceCLasses = ""
        }

        html += "<li class=\"list-group-item d-flex " + additionalLiCLasses + "\">";
        html += "<span class=\"flex-grow-1 align-self-center\">" + entry.description + "</span>"
        html += "<span class=\"align-self-center " + additionalEcheanceCLasses + "\" style=\"margin-right: 10px\">" + entry.date_echeance + "</span>"
        html += "<button type=\"button\" class=\"btn btn-light\" onclick=\"remove_todo(" + entry.id + ")\"><span class=\"bi-search\"></span>X</button>"
        html += "</li>"
        console.log(entry)
    }

    document.getElementById("list").innerHTML = html
}

async function init() {
    descriptionInput = document.getElementById("description-input")
    echeanceInput = document.getElementById("echeance-input")
    dateModalElem = document.getElementById("date-modal")
    yearInput = document.getElementById("year-input")
    monthInput = document.getElementById("month-input")
    dayInput = document.getElementById("day-input")
    hourInput = document.getElementById("hour-input")
    minuteInput = document.getElementById("minute-input")
    secondInput = document.getElementById("second-input")

    dateModal = new bootstrap.Modal(dateModalElem)

    await show()
    setInterval(show, 5000)

    document.getElementById("add-todo-button").addEventListener("click", show_dialog)
    document.getElementById("confirm-button").addEventListener("click", add_todo)
}

async function show_dialog() {
    const now = new Date()
    yearInput.value = now.getFullYear()
    monthInput.value = now.getMonth() + 1
    dayInput.value = now.getDate()
    hourInput.value = now.getHours()
    minuteInput.value = now.getMinutes()
    secondInput.value = now.getSeconds()

    dateModal.show()
}

async function add_todo() {
    let date = new Date()
    date.setTime(0)
    date.setFullYear(parseInt(yearInput.value))
    date.setMonth(parseInt(monthInput.value) - 1)
    date.setDate(parseInt(dayInput.value))
    date.setHours(parseInt(hourInput.value))
    date.setMinutes(parseInt(minuteInput.value))
    date.setSeconds(parseInt(secondInput.value))

    dateModal.hide()

    const description = descriptionInput.value
    const echeance = date.toISOString()

    const request = {
        method: "POST",
        body: JSON.stringify({
            description: description,
            date_echeance: echeance,
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    }

    descriptionInput.value = ""

    await fetch("/todos", request)

    await show()
}

async function remove_todo(id) {
    maskedIds[id] = null
    await show()

    const request = {
        method: "DELETE"
    }

    await fetch("/todos/" + id, request)

    await show()
}