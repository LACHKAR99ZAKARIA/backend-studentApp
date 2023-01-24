let users = require('../model/users');

function getUsers(req ,res){
    users.find((err,users)=>{
        if(err){
            console.log(err);
        }
        res.send(users);
    });
}

function getUser(req ,res){
    let userId = req.params.id;
    users.findOne({id: userId},(err,users)=>{
        if(err){
            res.send(err);
        }
        res.json(users)
    });
}

function postUser(req ,res){
    let user = new users(req.body);
    user.save((err,user)=>{
        if(err){
            res.send(err);
        }
        res.json(user);
})
}


module.exports = {  getUsers,getUser,postUser};