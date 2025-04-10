export async function getOrders (url='https://api.bsoffice.ru/orders') {
    const response = await fetch(url, {
        method: 'GET', 
        mode: 'cors',
        credentials: 'include',
        headers: {
            "Content-Type": "application/json"
        },
    })

    if (!response.ok) throw new Error('Заказы не найдены')

    return await response.json()
}

export async function sendOrder (data, url='https://api.bsoffice.ru/orders') {
    const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })

    if (!response.ok) throw new Error('Заказы не отправлены')

    return response
}

export async function deleteOrder (id) {
    const response = await fetch(`https://api.bsoffice.ru/orders/${id}`, {
        method: 'DELETE',
        mode: 'cors',
        credentials: 'include',
        headers: {
            "Content-Type": "application/json"
        },
    })

    if (!response.ok) throw new Error('Не получилось удалить')

    return response
}

export async function sendOrdersArray (data, url='https://api.bsoffice.ru/orders/array') {
    const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })

    if (!response.ok) throw new Error('Заказы не отправлены')

    return response
}

export async function getUsers (url='https://api.bsoffice.ru/users') {
    
    const response = await fetch(url, {
        method: 'GET', 
        mode: 'cors',
        headers: {
            "Content-Type": "application/json"
        },
    })

    if (!response.ok) throw new Error('Пользователи не найдены')

    return await response.json()
}