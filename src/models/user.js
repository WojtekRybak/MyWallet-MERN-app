const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Transaction = require('./transaction')



const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        unique : true,
        required : true,
        trim : true,
        lowercase : true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Invalid Email')
            }
        }
    },
    password : {
        type : String,
        required : true,
        trim : true,

    },
    tokens: [{
        token: {
            type: String,
            // required: true
        }
    }]

},{
    timestamps : true
})



userSchema.virtual('transactions', {
    ref: 'Transaction',
    localField : '_id',
    foreignField : 'createdBy'
})

userSchema.methods.generateAuthToken = async function(){
    const user  = this
    const token = jwt.sign({ _id : user._id.toString() }, process.env.ACCESS_TOKEN_SECRET)     //expiresIn
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token  
}

userSchema.statics.findByCredentials = async (email, password) =>{
    const user = await User.findOne({email})
    if(!user) return res.status(404).json({message : "No such user"})
    const isMatch = await bcrypt.compare(password, user.password) 
    if(!isMatch) return res.status(400).json({message : "Invalid credentials"})
    return user
}


userSchema.pre('save', async function(next){
    const user = this
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})
userSchema.pre('delete', async function(next){
    const user = this
    await Transaction.deleteMany({createdBy : user._id})            //_id : req.user._id
    next()
})

const User = mongoose.model('User', userSchema)
module.exports = User