const http = require('http')

function postUser(user) {
    const data = JSON.stringify(user)

    const options = {
        hostname: 'localhost',
        port: 3000,
        path: '/users',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': data.length
        }
    }

    const req = http.request(options, res => {
        let body = ''
        res.on('data', chunk => (body += chunk))
        res.on('end', () => {
            console.log(`Seeded: ${JSON.parse(body).name}`)
        })
    })

    req.on('error', err => {
        console.error('Error seeding user:', err.message)
    })

    req.write(data)
    req.end()
}

function seedDatabase() {
    for (let i = 1; i <= 10; i++) {
        const posts = []
        for (let j = 1; j <= 3; j++) {
            const comments = []
            for (let k = 1; k <= 2; k++) {
                comments.push({ text: `Comment ${k} on Post ${j} of User ${i}` })
            }
            posts.push({
                title: `Post ${j} by User ${i}`,
                content: `Content for post ${j} by user ${i}`,
                comments
            })
        }

        const user = {
            name: `User ${i}`,
            email: `user${i}@example.com`,
            posts
        }

        postUser(user)
    }
}

seedDatabase()
