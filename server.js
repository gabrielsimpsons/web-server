const express = require('express')
const hbs = require('hbs')
const fs = require('fs')

// const APP_PORT = process.env.UDEMY_PORT || 3000
const APP_PORT = process.env.UDEMY_PORT || 3000
var app = express()

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs')

app.use((req, res, next) => {
  let now = new Date().toString()
  let log = `${now}: ${req.method} ${req.url}`
  console.log(log)
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('unable to append to server.log')
    }
  })
  next()
})

app.use((req, res, next) => {
  res.render('maintenance.hbs', {
    pageTitle: 'Site under maintenance',
    currentYear: new Date().getFullYear(),
    welcomeMessage: 'We will be back soon!'
  })
})

app.use(express.static(__dirname + '/public'))

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
})

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase()
})

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home',
    welcome: 'Welcome to my home page',
    currentYear: new Date().getFullYear()
  })
})

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About page',
    currentYear: new Date().getFullYear()
  })
})


app.get('/bad', (req, res) => {
  res.send({
    error: 101,
    messageMessage: 'Unable to handle request'
  })
})

app.listen(APP_PORT, () => {
  console.log(`Server started on port: ${APP_PORT}`)
})
