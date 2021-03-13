
const express = require('express')
const Transaction = require('../models/transaction');
const auth = require('../middleware/auth')
const router = express.Router();

router.post('/transaction',auth, async (req,res)=> {
    const transaction = new Transaction({...req.body, createdBy : req.user._id})
    try {
        await transaction.save()
        res.status(201).send(transaction)
    } catch (error) {
        res.status().send()
    }
})
router.get('/transactions',auth, async (req,res)=> {
    try {
        // const transactions = await Transaction.find({createdBy : req.user._id})
        await req.user.populate('transactions').execPopulate()       
        res.status(202).json(req.user.transactions)
    } catch (error) {
        res.status(500).send({error : error})
    }

})
router.patch('/transaction/:id', auth, async (req,res)=> {
    const updates = Object.keys(req.body)
    // console.log(updates);
    // const allowedUpdate = ['amount','name','date']
    // const isValidOperation = updates.every((update)=> allowedUpdate.includes(update))
    // if(!isValidOperation){
    //     return res.status(400).json({error : 'Invalid operation'})
    // }
    try {
        const transaction = await Transaction.findOne({_id : req.params.id})
        if(!transaction){
            return res.status(404).json('transaction not found')
        }
        updates.forEach((update)=> transaction[update] = req.body[update])
        await transaction.save()
        res.json(transaction)
    } catch (error) {
        res.status(500).send()
    }
})
router.delete('/transaction/:id', auth, async (req,res)=> {
        
    try {
        const deletedTransaction = await Transaction.findOneAndDelete({_id : req.params.id })
        // const deletedTransaction = await Transaction.find({_id : req.params.id})
        // const deletedTransaction = await Transaction.findOne({_id : req.params.id, createdBy : req.user._id});
        if(!deletedTransaction){
            return res.json({msg : 'no such transaction!'})
        }
        res.json({msg : 'transaction deleted!'})
        // console.log(deletedTransaction);
        // if(!deletedTransaction){
        //     return res.status(400).json({
        // errorMessage:
        //   "No snippet with this ID was found. Please contact the developer.",
        // })}
        // console.log(deletedTransaction[0].createdBy);
        // if(deletedTransaction[0].createdBy != req.user._id){
        //     return res.status(401).json({ msg : 'Unauthorized' });
        // }
        // // await deletedTransaction.delete()
        // res.json(deletedTransaction)
    } catch (error) {
        res.status(500).send({msg : 'Sth went wrong'}) 
    }
})

module.exports = router;





