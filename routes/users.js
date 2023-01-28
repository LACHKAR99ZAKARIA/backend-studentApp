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

function updateUser(req,res){
    console.log("update User");
    console.log(req.body);
    users.findByIdAndUpdate(req.body._id,req.body,{new:true},(err,users)=>{
        if(err){
            res.send(err);
        }else{
            res.json({message:'updated'})
        }
    })
}

function deleteUser(req,res){
    users.findByIdAndRemove(req.params.id,(err,users)=>{
            if(err){
                res.send(err);
            }else{
                res.json({message:'deleted'})
            }
        })
    }

    
    


module.exports = {  getUsers,getUser,postUser,updateUser,deleteUser};