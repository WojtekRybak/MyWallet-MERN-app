
const User = require('../models/user')
const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const multer = require('multer')



router.post('/', async (req,res)=> {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        if(!user) return res.json({message : 'Wrong credentials'})
        const token = await user.generateAuthToken();
        // res.status(200).json({user,token})
        // res.send({user, token})
        res.cookie("token",token,{
           httpOnly: true 
        }).send();
    } catch (error) {
        res.status(500).json({message : "Unable to login"})
    }
})

router.post('/signup', async (req, res) => {
    const {name,email, password, confirmPassword} = req.body
    const user = new User(req.body)
    try {
        const existingUser = await User.findOne({email})
        if(existingUser) return res.status(400).json({message : "User already exists."})
        if(password !== confirmPassword) return res.status(400).json({message : "Password don't match"})

        await user.save()
        const token = await user.generateAuthToken()
        // res.status(201).json({user,token})
        res.cookie("token",token,{
           httpOnly: true 
        }).send();
    } catch (err) {
       res.status(500).json({message : "Sth went wrong"})
        
    }
})
router.get('/logout',  async (req,res)=> {                //with or without auth???
    try {
        res.clearCookie('token').send()
    } catch (error) {
        res.json(null)
    }
    // try { 
    //     req.user.tokens = req.user.tokens.filter((token)=>{
    //         return token.token !== req.token
    //     })
    //     await req.user.save()
    //     res.send()
    // } catch (error) {
    //     res.status(500).send()
    // }
})
router.post('/logoutAll',auth, async(req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch (error) {
        console.log(error);
        res.status(500).send()
    }
})
router.get('/me',auth, async (req,res)=>{
    try {
    const token = req.cookies.token;
    if(token){
        res.json('Logged In')
    }else{
        res.json(null)
    }
    // if (!token) return res.json(null);
    // const validatedUser = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(validatedUser);
    // if(validatedUser) return res.json({id : 'user'});
  } catch (err) {
    return res.json(null); 
  }
    
})
router.get('/user/:id', async(req,res)=> {
        const _id = req.params.id
    try {
        const user = await User.findById(_id)
        if(!user){
            return res.status(404).send()
        }
        res.send(user)
    } catch (error) {
        res.send(error)
    }

})
router.delete('/user/me', auth, async (req,res)=> {
    try {
        await req.user.remove()
        res.send(req.user)
    } catch (error) {
        res.status(500).send()
    }
})
const upload = multer({
    dest : 'avatars'
})
router.post('/user/me/avatar', upload.single('avatar'), async(req,res)=> {
    res.send()
})

module.exports = router;