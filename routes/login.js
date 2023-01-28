var express = require('express');
let users = require('../model/users');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { compare } = require('bcryptjs');
const passport = require('passport');



router.post('/login', async (req, res) => {
    const user = await users.findOne({ email: req.body.email })
    if (!user) {
      return res.status(401).json({ message: 'Utilisateur non trouvé' })
    }
  
    // Vérification du mot de passe
    if(req.body.password==user.password){
        passport.authenticate("local")(req,res,(err,user)=>{
            if(err){
                req.flash('error',err.message);
                return res.json({"login":false});
            }
            return res.json({"login":true});
        })
    }else{
        return res.status(401).json({ message: 'Mot de passe incorrect' })
    }
  })

  router.get('/logout',(req,res)=>{
    passport.authenticate("local")(req,res,(err,user)=>{
    req.logout();
    })
    res.json({"logout":true});
  })

module.exports = router;