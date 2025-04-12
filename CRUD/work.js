const http = require('http')

function sendRequest(method, path, data = null, callback) {
    const options = {
        hostname: 'localhost',
        port: 3000,
        path,
        method,
        headers: {
            'Content-Type': 'application/json',
        }
    }

    const req = http.request(options, res => {
        let body = ''
        res.on('data', chunk => (body += chunk))
        res.on('end', () => {
            callback(res.statusCode, body ? JSON.parse(body) : null)
        })
    })

    req.on('error', err => {
        console.error(`${method} request failed:`, err.message)
    })

    if (data) {
        const json = JSON.stringify(data)
        options.headers['Content-Length'] = json.length
        req.write(json)
    }

    req.end()
}

// GET all users
sendRequest('GET', '/users', null, (status, users) => {
    console.log(`Found ${users.length} users`)

    const firstUserId = users[0]._id
    const lastUserId = users[users.length - 1]._id

    sendRequest('GET', `/users/${firstUserId}`, null, (status, user) => {
        console.log('Read user:', user.name)

        sendRequest('PUT', `/users/${firstUserId}`, { name: user.name + ' Updated' }, (status, updated) => {
            console.log('Updated user name to:', updated.name)
        })
    })


    sendRequest('DELETE', `/users/${lastUserId}`, null, (status) => {
        console.log(`Deleted user ${lastUserId}, status:`, status)
    })
})
