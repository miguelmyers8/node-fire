// link to express
const express = require('express');
// create app
const app = express();
// port to listen on
const port = 3000;

app.use(require('./config/routes'))

// use embeded js in html
app.set('view engine', 'ejs')

// static files css, images and other. put them in a folder called views
app.use(express.static('views'))
app.set('views', __dirname + '/views')

// server
app.listen(port, function() {
  console.log('App running on port ' + port)
})
