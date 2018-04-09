const 
    express = require('express'),
    salesRouter = new express.Router()
    Sale = "a completed tweet model...",
    salesCtrl = require('../controllers/sales.js'),
    { verifyToken } = require('../serverAuth.js')
 

//index, show,
salesRouter.route('/')
    .get(salesCtrl.index)
    .post(salesCtrl.create)

salesRouter.use(verifyToken)

//create, update, destroy 

salesRouter.route('/:id')
    .get(salesCtrl.show)
    .delete(salesCtrl.destroy)
    .patch(salesCtrl.update)

module.exports = salesRouter