require('dotenv').config()

const express = require('express');
const router = express.Router();
const logger = require('morgan');
const bodyParser = require('body-parser')


const fKey = process.env.APIKEY
const fAuthDom = process.env.AUTHDOMAIN
const fDatabUrl = new URL(process.env.DATABASEURL)
const fProjId = process.env.PROJECTID
const fStoreBuck = process.env.STORAGEBUCKET
const fMessageSenId = process.env.MESSAGINGSENDERID


router.use(bodyParser.json())
router.use(bodyParser.urlencoded({extended:false}))
router.use(logger('dev'))

//Middle ware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

// get the route page
router.get('/',function(request, response) {

  response.render('home.ejs',{f_key:fKey,
                              f_auth_dom:fAuthDom,
                              f_data_b_url:fDatabUrl,
                              f_porj_id:fProjId,
                              f_store_bucket:fStoreBuck,
                              f_message_sen_id:fMessageSenId
                            })
})

router.get('/singup',function(request, response) {
  response.render('singup.ejs')
})

router.get('/form',function(request, response) {
  response.render('form.ejs')
})

router.post('/form', function(request, response) {
  // send back a page with data
  getdata = request.body.inputdata
  response.render('results.ejs', {data:getdata})
})

module.exports = router;
