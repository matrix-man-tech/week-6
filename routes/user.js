var express = require('express');
const req = require('express/lib/request');
const res = require('express/lib/response');
const { response } = require('../app');
var router = express.Router();
var productHelpers=require('../helpers/product-helpers')
var userHelpers=require('../helpers/user-helpers')


/* GET home page. */
router.get('/', function(req, res, next) {
  let user=req.session.user
  console.log(user);

  productHelpers.getAllproducts().then((products)=>{

    res.render('user/view-products',{products,user})
  })

  
}
);
router.get('/login',(req,res)=>{
  if(req.session.user){
    res.redirect('/')
  }else{
    res.render('user/login',{"loginErr":req.session.userLoginErr})
    req.session.userLoginErr=false
  }
  
})
router.get('/signup',(req,res)=>{
  res.render('user/signup')
})
router.post('/signup',(req,res)=>{
  userHelpers.doSignup(req.body).then((response)=>{
    console.log(response);
    req.session.user=response.user
      req.session.userloggedIn=true
      res.redirect('/')
  })

})
router.post('/login',(req,res)=>{
  userHelpers.doLogin(req.body).then((response)=>{
    if(response.status){
      
      req.session.user=response.user
      req.session.user.loggedIn=true
      res.redirect('/')
    }else{
      req.session.userLoginErr=true 
      res.redirect('/login')
    }
  })

})

router.get('/logout',(req,res)=>{
  req.session.user=null
  req.session.userLoggedIn=false

  res.redirect('/')
})


module.exports = router;
