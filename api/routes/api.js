const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const _ = require('lodash');
const {canAccess, routeWrapper} = require('./apiutils');

module.exports = function() {
  router.get('/genapikey',function(req,res){    
    console.log(process.env.JWTSECRET);
    res.send(bcrypt.hashSync(process.env.JWTSECRET, 8));
  });
  router.get('/genpwd/:pwd',function(req,res){    
    res.send(bcrypt.hashSync(req.params.pwd, 8));
  });
  router.get('/', (req,res,next) => {
    if(canAccess(req)){
      res.send("Welcome to API");
    }else{
      res.send("Invalid Access");
    }
  })
  return router;
}