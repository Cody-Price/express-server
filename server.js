const express = require('express')
const { jsonData } = require('./json.js')
const app = express()

const urlLogger = (request, response, next) => {
  console.log('Request URL:', request.url)
  next()
}

const timeLogger = (request, response, next) => {
  console.log('Datetime:', new Date(Date.now()).toString())
  next()
}

app.use(urlLogger, timeLogger)
app.use(express.static('public'))


app.get('/', (request, response) => {
  response.send('hello pal')
})

app.get('/json', urlLogger, timeLogger, (request, response) => {
  response.status(200).json(jsonData)
})
    
app.listen(3000, () => {
  console.log('Express intro running on localhost:3000')
})

app.use((request, response, next) => {
  response.status(404).send('404, page not found')
})
