const 
    express = require('express'),
    salesRouter = new express.Router()
    Sale = "a completed tweet model...",
    { verifyToken } = require('../serverAuth.js')
 

//index, show,

salesRouter.use(verifyToken)

//create, update, destroy 

salesRouter.post('/', (req, res) => {
    Sale.create({... req,body, user: req.user._id }, (err, brandNewSale) => {

    })
})

// 

// {
// const tweetSchema = new mongoose Schema
// user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
// }