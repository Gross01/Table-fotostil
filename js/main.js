import { PATTERN } from "./tableData.js"
import { addRow, editRow, removeRow, getCurrentData, fillInTable } from "./functions.js"

const addLineButton = document.querySelector('.addline-button')
const addLineInput = document.querySelector('.addline-input')
export const table = document.querySelector('.table')
export const monthSelect = document.querySelector('.dates-select--months')
export const yearSelect = document.querySelector('.dates-select--years')

addLineButton.addEventListener('click', function() {
    let quantity = addLineInput.value
    addRow(quantity)

    for (let i = 0; i < addLineInput.value; i++) {
        PATTERN.date = getCurrentData()[0].date
        let newPattern = {...PATTERN}
        getCurrentData().push(newPattern)
    }

    fillInTable(getCurrentData())
}) 

table.addEventListener('click', function (event) {

    let rows = Array.from(table.querySelectorAll('.tbody-stroke'))

    if (event.target.classList.contains('edit-button')) {
        let editButton = event.target
        let row = editButton.closest('tr')
        editRow(editButton, row, getCurrentData())
    }

    if (event.target.classList.contains('remove-button')) {
        let removeButton = event.target
        let row = removeButton.closest('tr')
        getCurrentData().splice((rows.indexOf(row) - 1), 1)
        removeRow(row)  
    }

    if (event.target.classList.contains('date-input')) {
        event.target.addEventListener('change', function () {
            let dateInput = event.target
            let row = dateInput.closest('tr')
            getCurrentData()[rows.indexOf(row) - 1].date = dateInput.value
        }) 
    }

    if (event.target.classList.contains('number-input--order')) {
        event.target.addEventListener('input', function () {
            let orderInput = event.target
            let row = orderInput.closest('tr')
            getCurrentData()[rows.indexOf(row) - 1].order = orderInput.value
        }) 
    }

    if (event.target.classList.contains('select--product')) {
        event.target.addEventListener('change', function () {
            let productInput = event.target
            let row = productInput.closest('tr')
            getCurrentData()[rows.indexOf(row) - 1].product = productInput.value
        }) 
    }

    if (event.target.classList.contains('number-input--price')) {
        event.target.addEventListener('input', function () {
            let priceInput = event.target
            let row = priceInput.closest('tr')
            getCurrentData()[rows.indexOf(row) - 1].price = priceInput.value
        }) 
    }

    if (event.target.classList.contains('select--location')) {
        event.target.addEventListener('change', function () {
            let locationInput = event.target
            let row = locationInput.closest('tr')
            getCurrentData()[rows.indexOf(row) - 1].location = locationInput.value
        }) 
    }
})

fillInTable(getCurrentData())

monthSelect.addEventListener('change', function () {
    fillInTable(getCurrentData())
})

yearSelect.addEventListener('change', function () {
    fillInTable(getCurrentData())
})








