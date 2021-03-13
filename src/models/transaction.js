const mongoose = require('mongoose')

// const Transaction = mongoose.model('Transaction', {
//     name : {
//         type : String,
//         required : true
//     },
//     amount : {
//         type : Number,
//         required : true,
//     },
//     date : {
//         type : Date,
        
//     },
//     text : {
//         type : String,
//         trim : true

//     }
//     ,
//     createdBy : {
//         type : mongoose.Schema.Types.ObjectId,
//         required : true,
//         ref : 'User'
//     } 
// })
const transactionSchema = new mongoose.Schema({
    note : {
        type : String,
        required : true,
    },
    amount : {
        type : Number,
        required : true,
    },
    date : {
        type : Date,
        required : true,
        
    },
    category : {
        type : String,
        required : true,
    },
    subCategory : {
        type : String,
        required : true,
    }
    ,
    createdBy : {                   
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : 'User'
    },   
},{
    timestamps : true
}
)

const Transaction = mongoose.model('Transaction', transactionSchema)
module.exports = Transaction