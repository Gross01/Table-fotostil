import { addRow, editRow, removeRow, fillInTable, fillInStatisticsTable } from "./functions.js"
import { sendOrdersArray } from "./api/client.js"
import {deleteOrder} from './api/client.js'


const addLineButton = document.querySelector('.addline-button')
const addLineInput = document.querySelector('.addline-input')
export const table = document.querySelector('.table')
const monthSelect = document.querySelector('.dates-select--months')
const yearSelect = document.querySelector('.dates-select--years')
const saveButton = document.querySelector('.info-button--save')
const infoButtonsBlock = document.querySelector('.buttons-wrapper')
const monthOptionAll = document.querySelector('.dates-select--all')

addLineButton.addEventListener('click', function() {
    let quantity = addLineInput.value
    addRow(quantity)
}) 

table.addEventListener('click', function (event) {
    if (event.target.classList.contains('edit-button')) {
        let editButton = event.target
        let row = editButton.closest('tr')
        editRow(editButton, row)
    }

    if (event.target.classList.contains('remove-button')) {
        let removeButton = event.target
        let row = removeButton.closest('tr')
        removeRow(row)  
        if (!row.id) return 
        deleteOrder(row.id)
            .then(res => console.log(res))
            .catch(err => console.log(err.message))
    }
})

monthSelect.addEventListener('change', function () {
    if (!Boolean(monthOptionAll.style.display === 'none')) {
        fillInStatisticsTable()
        return 
    }

    fillInTable()
})

yearSelect.addEventListener('change', function () {
    if (!Boolean(monthOptionAll.style.display === 'none')) {
        fillInStatisticsTable()
        return 
    }

    fillInTable()
})

saveButton.addEventListener('click', function () {
    const data = []

    let order

    table.querySelectorAll('.tbody-stroke').forEach((row, i, arr) => {
        if (row.classList.contains('tbody-stroke--first')) return 
        
        if (row.id ) return 



        const dateArr = row.querySelector('.date-input').value.split('-')
        const year = dateArr[0]
        const month = dateArr[1]
        const day = dateArr[2]

        const orderNumber = row.querySelector('.number-input--order').value
        const productName = row.querySelector('.select--product-name').value
        const productSize = row.querySelector('.select--product-size').value
        const place = row.querySelector('.select--location').value
        const price = row.querySelector('.number-input--price').value

        order = {
            date: {
                year: year,
                month: month,
                day: day
            },
            price: price,
            product: {
                name: productName,
                size: productSize
            },
            place: place,
            orderNumber: orderNumber,
        }

        data.push(order)
    })

    sendOrdersArray(data)
        .then(res => {
            console.log(res)
            const message = document.createElement('p')
            message.classList.add('buttons-wrapper_success')
            message.innerHTML = `Заказы сохранены`
            infoButtonsBlock.appendChild(message)
            setTimeout(() => {
                message.remove()
            }, 1500)
        })
        .catch(err => {
            const message = document.createElement('p')
            message.classList.add('buttons-wrapper_error')
            message.innerHTML = `Заполните таблицу`
            infoButtonsBlock.appendChild(message)
            setTimeout(() => {
                message.remove()
            }, 3000)
        })
})