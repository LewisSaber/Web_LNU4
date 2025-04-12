const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const { mongoUri } = require('./config')

const app = express()
app.use(bodyParser.json())

mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })

const commentSchema = new mongoose.Schema({
    text: String,
    createdAt: { type: Date, default: Date.now }
})

const postSchema = new mongoose.Schema({
    title: String,
    content: String,
    comments: [commentSchema],
    createdAt: { type: Date, default: Date.now }
})

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    posts: [postSchema],
    createdAt: { type: Date, default: Date.now }
})

const User = mongoose.model('User', userSchema)

app.post('/users', async (req, res) => {
    const user = new User(req.body)
    await user.save()
    res.json(user)
})

app.get('/users', async (req, res) => {
    const { page = 1, limit = 10, sortBy = 'createdAt' } = req.query
    const users = await User.find()
        .sort({ [sortBy]: -1 })
        .skip((page - 1) * limit)
        .limit(parseInt(limit))
    res.json(users)
})

app.get('/users/:id', async (req, res) => {
    const user = await User.findById(req.params.id)
    res.json(user)
})

app.put('/users/:id', async (req, res) => {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json(user)
})

app.delete('/users/:id', async (req, res) => {
    await User.findByIdAndDelete(req.params.id)
    res.sendStatus(204)
})

app.listen(3000)
