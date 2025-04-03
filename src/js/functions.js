import { tableData, PATTERN, usersData } from "./tableData.js"
import { yearSelect, monthSelect } from "./main.js"
import { currentUser } from "./authentication.js"

const tableBody = document.querySelector('.tbody')
const table = document.querySelector('.table')

export function createTableData (yearsArray) {

    yearsArray.forEach(year => {
        for (let i = 1; i <= 12; i++) {
            if (i <= 9) {
                PATTERN.date = `${year}-0${i}-01`
                let newPattern = {...PATTERN}
                tableData[`${year}-0${i}`] = [newPattern]
            } else {
                PATTERN.date = `${year}-${i}-01`
                let newPattern = {...PATTERN}
                tableData[`${year}-${i}`] = [newPattern]
            }
        }
    })
}

export function addRow(quantity) {
    for (let i = 0; i < quantity; i++) {
        const tableBodyStroke = document.querySelector('.tbody-stroke--first').cloneNode(true)
        tableBodyStroke.classList.remove('tbody-stroke--first')
        tableBody.appendChild(tableBodyStroke)
        console.log(usersData)
    }
}

export function editRow(editButton, row, currentData) {
        if (editButton.classList.contains('edit-button--save')) {

            editButton.classList.remove('edit-button--save')
            editButton.classList.add('edit-button--edit')

            if (row.querySelectorAll('input')) {

                let rows = Array.from(table.querySelectorAll('.tbody-stroke'))
                currentData[rows.indexOf(row) - 1].disabled = true

                row.querySelectorAll('input').forEach(input => {
                    input.disabled = true
                })

                row.querySelectorAll('select').forEach(select => {
                    select.disabled = true
                })
            }
 
            return
        }

        if (editButton.classList.contains('edit-button--edit')) {
            editButton.classList.remove('edit-button--edit')
            editButton.classList.add('edit-button--save')

            if (row.querySelectorAll('input')) {

                let rows = Array.from(table.querySelectorAll('.tbody-stroke'))
                currentData[rows.indexOf(row) - 1].disabled = false

                row.querySelectorAll('input').forEach(input => {
                    input.disabled = false
                })

                 row.querySelectorAll('select').forEach(select => {
                    select.disabled = false
                })
            }
               
            return
        }
}

export const removeRow = (row) => row.remove()

export function getCurrentData() {
    return usersData[currentUser][`${yearSelect.value}-${monthSelect.value}`]
}

export function fillInTable (currentData) {

    optimizeTable(currentData)

    table.querySelectorAll('.tbody-stroke').forEach((row, index) => {
        if (row.classList.contains('tbody-stroke--first')) {
            return
        }

        row.querySelector('.date-input').value = currentData[index - 1].date
        row.querySelector('.number-input--order').value = currentData[index - 1].order
        row.querySelector('.select--product').value = currentData[index - 1].product
        row.querySelector('.number-input--price').value = currentData[index - 1].price
        row.querySelector('.select--location').value = currentData[index - 1].location

        let editButton = row.querySelector('.edit-button')

        if (currentData[index - 1].disabled === false) {
            editButton.classList.remove('edit-button--edit')
            editButton.classList.add('edit-button--save')

            row.querySelectorAll('input').forEach(input => {
                input.disabled = false
            })

            row.querySelectorAll('select').forEach(select => {
                select.disabled = false
            })
        }

        if (currentData[index - 1].disabled === true) {
            editButton.classList.remove('edit-button--save')
            editButton.classList.add('edit-button--edit')

            row.querySelectorAll('input').forEach(input => {
                input.disabled = true
            })

            row.querySelectorAll('select').forEach(select => {
                select.disabled = true
            })
        }
    })
}

export function optimizeTable (currentData) {
    let row = table.querySelectorAll('.tbody-stroke')
    let rowLength = row.length - 1

    if (currentData.length === rowLength) return 

    if (currentData.length > rowLength) {
        addRow(currentData.length - rowLength)
    }

    if (currentData.length < rowLength) {
        for (let i = 0; i < rowLength - currentData.length; i++) {
            removeRow(row[rowLength - i])
        }
    }
}