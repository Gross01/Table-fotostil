import { autorizate } from "./functions.js"
import { logout } from "./api/auth.js"

const accountBlock = document.querySelector('.account')
const authPopup = document.querySelector('.authentication')
const authItem = document.querySelectorAll('.accounts-item')

authItem.forEach(accountItem => {
    const logInButton = accountItem.querySelector('.accounts-login')
    const passwordBlock = accountItem.querySelector('.accounts-password')
    const passwordButton = passwordBlock.querySelector('button')

    logInButton.addEventListener('click', function () {
        passwordBlock.style.display = 'flex'
    })
    
    passwordButton.addEventListener('click', function () {
        autorizate(passwordBlock, accountItem, authPopup);
    })
})


accountBlock.addEventListener('click', function() {
    authPopup.style.display = 'flex'
    logout()
        .then(res => console.log(res))
        .catch(err => console.log(err.message))
})
