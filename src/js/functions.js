import { authorization } from "./api/auth.js"
import { getOrders } from "./api/client.js"
import { getUsers } from "./api/client.js"

const tableBody = document.querySelector('.tbody')
const table = document.querySelector('.table')
const infoButtonsBlock = document.querySelector('.buttons-wrapper')
const addLineBlock = document.querySelector('.addline-wrapper')
const statisticsTable = document.querySelector('.statistics-table')
const monthOptionAll = document.querySelector('.dates-select--all')

export function addRow(quantity) {
    for (let i = 0; i < quantity; i++) {
        const tableBodyStroke = document.querySelector('.tbody-stroke--first').cloneNode(true)
        const currentMonth = document.querySelector('.dates-select--months').value
        const currentYear = document.querySelector('.dates-select--years').value
        tableBodyStroke.classList.remove('tbody-stroke--first')
        tableBodyStroke.querySelector('.date-input').value = `${currentYear}-${currentMonth}-01`
        tableBody.appendChild(tableBodyStroke)
    }
}

export function editRow(editButton, row) {

    if (editButton.classList.contains('edit-button--save')) {
        editButton.classList.remove('edit-button--save')
        editButton.classList.add('edit-button--edit')

        row.querySelectorAll('input').forEach(input => {
            input.disabled = true
        })

        row.querySelectorAll('select').forEach(select => {
            select.disabled = true
        })

        return 
    }

    if (editButton.classList.contains('edit-button--edit')) {
        editButton.classList.add('edit-button--save')
        editButton.classList.remove('edit-button--edit')

        row.querySelectorAll('input').forEach(input => {
            input.disabled = false
        })

        row.querySelectorAll('select').forEach(select => {
            select.disabled = false
        })

        return 
    }
}

export const removeRow = (row) => row.remove()

export function fillInTable () {
    const currentMonth = document.querySelector('.dates-select--months').value
    const currentYear = document.querySelector('.dates-select--years').value

    getOrders(
        `http://109.73.205.115:3000/api/orders/?byUserId=true&year=${currentYear}&month=${currentMonth}`
    )
            
    .then(orders => {
        optimizeTable(orders)
        fillInRows(orders)
    })
}

function optimizeTable (currentOrders, currentYear, currentMonth) {
    let row = table.querySelectorAll('.tbody-stroke')
    let rowLength = row.length - 1

    if (currentOrders.length === 0) {
        addRow(1)
    }

    if (currentOrders.length === rowLength) return 

    if (currentOrders.length > rowLength) {
        addRow(currentOrders.length - rowLength)
    }

    if (currentOrders.length < rowLength) {
        for (let i = 0; i < rowLength - currentOrders.length; i++) {
            removeRow(row[rowLength - i])
        }
    }
}

function fillInRows (orders) {
    orders.forEach((order, index) => {
        const row = table.querySelectorAll('.tbody-stroke')[index + 1]
        const orderDate = `${order.date.year}-${order.date.month}-${order.date.day}`
        row.querySelector('.date-input').value = orderDate
        row.querySelector('.number-input--order').value = order.orderNumber
        row.querySelector('.select--product-name').value = order.product.name
        row.querySelector('.select--product-size').value = order.product.size
        row.querySelector('.number-input--price').value = order.price
        row.querySelector('.select--location').value = order.place
        row.id = order['_id']

        const editButton = row.querySelector('.edit-button')

        if (order.disabled) {
            editButton.classList.remove('edit-button--save')
            editButton.classList.add('edit-button--edit')

            row.querySelectorAll('input').forEach(input => {
                input.disabled = true
            })
    
            row.querySelectorAll('select').forEach(select => {
                select.disabled = true
            })

            return 
        }

        if (order.disabled === false) {
            editButton.classList.add('edit-button--save')
            editButton.classList.remove('edit-button--edit')

            row.querySelectorAll('input').forEach(input => {
                input.disabled = false
            })
    
            row.querySelectorAll('select').forEach(select => {
                select.disabled = false
            })
        }
    })
}



const passwordBlocks = document.querySelectorAll('.accounts-password')
const accountName = document.querySelector('.account-name')
const accountPosition = document.querySelector('.account-position')

export async function autorizate (passwordBlock, accountItem, authPopup) {
        const input = passwordBlock.querySelector('input')
        const username = accountItem.querySelector('.accounts-name').textContent
        const position = accountItem.querySelector('.accounts-position').textContent
        const password = input.value
        const requestBody = {
                username: username,
                password: password
        }

        await authorization(requestBody)
        .then(res => {
                input.style.borderColor = 'black'
                accountName.textContent = username
                accountPosition.textContent = position
                passwordBlocks.forEach(block => block.style.display = 'none')
                authPopup.style.display = 'none'
                
                
                if (position === 'Администратор') {
                    monthOptionAll.style.display = 'block'
                    table.style.display = 'none'
                    infoButtonsBlock.style.display = 'none'
                    addLineBlock.style.display = 'none'
                    statisticsTable.style.display = 'block'
                    setCurrentDate()
                    fillInStatisticsTable()
                    return 
                }
    
                setCurrentDate()
                monthOptionAll.style.display = 'none'
                table.style.display = 'block'
                infoButtonsBlock.style.display = 'block'
                addLineBlock.style.display = 'flex'
                statisticsTable.style.display = 'none'
                fillInTable()
        })
        .catch(err => {
                input.style.borderColor = 'red'
                console.log(err)
        })
}

function setCurrentDate () {
    const now = new Date()
    const month = now.getMonth(); 
    const year = now.getFullYear();
    console.log(month)
    document.querySelector('.dates-select--months').value = '0' + month
    document.querySelector('.dates-select--years').value = year
}


function createStatisticsRow () { 
    const row = document.createElement('tr')
    for (let i = 0; i < 10; i++) {
        let td = document.createElement('td')
        row.appendChild(td)
    }

    return row
}

function fillRowWithOrderData(row, user, ordersInfo) {

    let currentRow = row

    const currentMonth = document.querySelector('.dates-select--months').value
    const currentYear = document.querySelector('.dates-select--years').value

    const ordersStatistic = {
        canvas: { price: 0, quantity: 0 },
        foamBoard: { price: 0, quantity: 0 },
        photoBook: { price: 0, quantity: 0 },
        baget: { price: 0, quantity: 0 },
        transporant: { price: 0, quantity: 0 },
        lamination: { price: 0, quantity: 0 },
        allPriceQuantity: 0,
        ordersQuantity: 0,
        daysQuantity: 0,
    }

    const days = []

    ordersInfo.forEach(order => {

        if (currentMonth !== 'all') {
            if (currentMonth != order.date.month) return 
        }

        if (currentYear !== order.date.year) return

        const productName = order.product.name
        switch (productName) {
            case 'Холст': ordersStatistic.canvas.quantity++; ordersStatistic.canvas.price += +order.price; break;
            case 'Пенокартон': ordersStatistic.foamBoard.quantity++; ordersStatistic.foamBoard.price += +order.price; break;
            case 'Фотокнига': ordersStatistic.photoBook.quantity++; ordersStatistic.photoBook.price += +order.price; break;
            case 'Багет': ordersStatistic.baget.quantity++; ordersStatistic.baget.price += +order.price; break;
            case 'Транспорант': ordersStatistic.transporant.quantity++; ordersStatistic.transporant.price += +order.price; break;
            case 'Ламинация': ordersStatistic.lamination.quantity++; ordersStatistic.lamination.price += +order.price; break;
        }

        ordersStatistic.allPriceQuantity += +order.price
        ordersStatistic.ordersQuantity++

        return currentMonth === 'all' 
            ? days.push(`${order.date.day}-${order.date.month}`)
            : days.push(order.date.day)
    })

    const filteredDays = [...new Set(days)]

    console.log(user.username, filteredDays, filteredDays.length)

    const rowElements = currentRow.querySelectorAll('td')

    const giveWriteStroke = (quantity, price) => {
        return `<span>${quantity} шт</span>  <span>${price} ₽</span>`
    }
    
    rowElements[0].innerHTML = user.username
    rowElements[1].innerHTML = giveWriteStroke(ordersStatistic.canvas.quantity, ordersStatistic.canvas.price)
    rowElements[2].innerHTML = giveWriteStroke(ordersStatistic.foamBoard.quantity, ordersStatistic.foamBoard.price)
    rowElements[3].innerHTML = giveWriteStroke(ordersStatistic.photoBook.quantity, ordersStatistic.photoBook.price)
    rowElements[4].innerHTML = giveWriteStroke(ordersStatistic.baget.quantity, ordersStatistic.baget.price)
    rowElements[5].innerHTML = giveWriteStroke(ordersStatistic.transporant.quantity, ordersStatistic.transporant.price)
    rowElements[6].innerHTML = giveWriteStroke(ordersStatistic.lamination.quantity, ordersStatistic.lamination.price)
    rowElements[7].innerHTML = ordersStatistic.ordersQuantity
    rowElements[8].innerHTML = `${ordersStatistic.allPriceQuantity} ₽`
    rowElements[9].innerHTML = filteredDays.length

    return currentRow
}

export async function fillInStatisticsTable() {
    const statisticsTableBody = statisticsTable.querySelector('tbody')
    const allRows = statisticsTableBody.querySelectorAll('tr')
    if (allRows.length > 0) {
        allRows.forEach(tr => tr.remove())
    }

    try {
        const users = await getUsers()
        const allOrders = await getOrders()

        for (const user of users) {
            if (user.position === 'Администратор') continue;
        
            const userOrders = allOrders.filter(order => order.userId === user._id)
            const row = createStatisticsRow()
            const filledRow = fillRowWithOrderData(row, user, userOrders)
            statisticsTableBody.appendChild(filledRow)
        }

    } catch (err) {
        console.error('Ошибка при загрузке пользователей или заказов:', err)
    }
}


