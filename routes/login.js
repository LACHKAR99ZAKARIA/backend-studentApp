var express = require('express');
let users = require('../model/users');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { compare } = require('bcryptjs');
const passport = require('passport');



router.post('/login', async (req, res) => {
      const user = await users.findOne({ email: req.body.email })
    if (!user) {
      return res.json(false)
    }
  
    // Vérification du mot de passe
    if(req.body.password==user.password){
        req.session.user=user;
        return res.json(true)
    }else{
        return res.json(false)
    }

    
  })

  router.get('/logout',(req,res)=>{
    if (req.session.user) {
      req.session.destroy();
      return res.send(true);
    }
  })

  router.get('/islogin',(req, res) => {
    if (req.session.user) {
      s=req.session.user;
      return res.send(true);
    }
    else{
      return res.send(false);
    }
  })

module.exports = router;