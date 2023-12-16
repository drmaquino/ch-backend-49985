const form = document.querySelector('form')

form?.addEventListener('submit', event => {
    event.preventDefault()

    //@ts-ignore
    const data = new URLSearchParams(new FormData(form))

    fetch('/api/cookie', {
        method: 'POST',
        body: data,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
        .then(response => response.json())
        .then(data => alert(JSON.stringify(data)))
})

const button = document.querySelector('#btnGetCookie')
button?.addEventListener('click', event => {
    alert(JSON.stringify(document.cookie))
})
