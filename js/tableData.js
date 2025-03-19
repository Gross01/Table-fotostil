import { createTableData } from "./functions.js"

export const PATTERN = {date: '2025-01-01', order: '0000', product: 'Ф.Х 20х30', price: '0000', location: 'Online', disabled: false}

export const tableData = {}

let yearsArray = [2025, 2026, 2027, 2028]

createTableData(yearsArray)

const users = [
    {name: 'Артём', position: 'Разработчик'},
    {name: 'Света', position: 'Мастер'},
    {name: 'Андрей', position: 'Мастер'},
    {name: 'Артур', position: 'Администратор'},
]

export const usersData = {}

for (let i = 0; i < users.length; i++) {
    let newTableData = JSON.parse(JSON.stringify(tableData))
    usersData[users[i].name] = newTableData
}





