const mongoose = require('mongoose')
const {Schema} = mongoose


const userSchema = new Schema({
    name:String,
    email:{
        type:String,
        unique : true
    },
    password: String,

    picture:String
    
})

// const UserModel = mongoose.model('user',userSchema)
module.exports = mongoose.model('user',userSchema)

// module.exports = {
//     UserModel
// }