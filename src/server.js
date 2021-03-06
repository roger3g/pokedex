require('dotenv').config()

const express = require('express')
const server = express()
const router = express.Router()

const nunjucks = require('nunjucks')
const { join } = require('path')

const PORT = process.env.PORT || 8080

nunjucks.configure(join(__dirname, '/../public/pages'), {
  express: server,
  noCache: true
})

server.use(express.urlencoded({extended: true}))
server.use(express.static(join(__dirname, '/../public/')))
server.use(router)

router.get('/', (req, res) => {
  return res.render('index.html')
})

router.get('*', (req, res) => {
  return res.send('Not found')
})

server.listen(PORT, error => {
  const message = error 
  ? 'Error when running the server' 
  : `Server running on http://localhost:${PORT}`
  
  return console.log(message)
})