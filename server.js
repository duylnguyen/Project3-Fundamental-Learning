const express = require('express')
const app = express()
const { problemRouter } = require('./controllers/problem.js')
const { commentRouter } = require('./controllers/comment.js')

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(express.static(`${__dirname}/client/build`))
app.use('/api/problem', problemRouter)
app.use('/api/problem/:problemId/comment', commentRouter)

app.get('/*', (req, res) => {
    res.sendFile(`${__dirname}/client/build/index.html`)
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`App is listening on PORT ${PORT}`)
})
