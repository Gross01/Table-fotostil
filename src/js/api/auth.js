export async function authorization (data, url='https://api.bsoffice.ru/auth') {
    const response = await fetch (url, {
        method: 'POST',
        credentials: "include", 
        mode: 'cors',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })


    if (!response.ok) {
        throw new Error('Неверный пароль')
    }

    return await response.json()
}

export async function logout (url='https://api.bsoffice.ru/auth/logout') {
    const response = await fetch(url, {
        method: 'POST',
        credentials: "include", 
        mode: 'cors',
    })

    if (!response.ok) {
        throw new Error('Не получилось выйти из аккаунта')
    }

    return response
}
