import { fillInTable, getCurrentData } from "./functions.js"

const accountBlock = document.querySelector('.account')
const authPopup = document.querySelector('.authentication')
const accountName = document.querySelector('.account-name')
const accountPosition = document.querySelector('.account-position')

export let currentUser = 'Артём'

authPopup.addEventListener('click', function(event) {
    if (event.target.classList.contains('accounts-item')) {
        let name = event.target.querySelector('.accounts-name').textContent
        let position = event.target.querySelector('.accounts-position').textContent
        currentUser = name
        accountName.textContent = name
        accountPosition.textContent = position
        authPopup.style.display = 'none'
        fillInTable(getCurrentData())
    }
})

accountBlock.addEventListener('click', function() {
    authPopup.style.display = 'flex'
})


