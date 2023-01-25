let mongoose = require("mongoose");
var aggregatePaginate = require("mongoose-aggregate-paginate-v2");
let Schema = mongoose.Schema;

let users = Schema({
    id:Number,
    name:String,
    email:String,
    password:String,
    roll:String,
    dateExpiration:Date,
});

users.plugin(aggregatePaginate);

module.exports = mongoose.model("users",users);