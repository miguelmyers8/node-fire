require('dotenv').config()
// link to express
const express = require('express');
// store information about whats happening in the app and display it in CL
const logger = require('morgan');
//body-parser
const bodyParser = require('body-parser')
// create app
const app = express();
// port to listen on
const port = 3000;


// use embeded js in html
app.set('view engine', 'ejs')
// static files css, images and other. put them in a folder called views
app.use(express.static('views'))
app.set('views', __dirname + '/views')
//parse data
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
//useing logger - development
app.use(logger('dev'))

// get the route page
app.get('/',function(request, response) {

  fKey = process.env.APIKEY
  fAuthDom = process.env.AUTHDOMAIN
  fDatabUrl = process.env.DATABASEURL
  fProjId = process.env.PROJECTID
  fStoreBuck = process.env.STORAGEBUCKET
  fMessageSenId = process.env.MESSAGINGSENDERID

  console.log(process.env.APIKEY)
  response.render('home.ejs',{f_key:fKey,
                              f_auth_dom:fAuthDom,
                              f_data_b_url:fDatabUrl,
                              f_porj_id:fProjId,
                              f_store_bucket:fStoreBuck,
                              f_message_sen_id:fMessageSenId
                            })
})


app.get('/form',function(request, response) {
  response.render('form.ejs')
})

app.post('/form', function(request, response) {
  // send back a page with data
  getdata = request.body.inputdata
  response.render('results.ejs', {data:getdata})
})
// server
app.listen(port, function() {
  console.log('App running on port ' + port)
})
