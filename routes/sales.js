const 
    express = require('express'),
    salesRouter = new express.Router()
    salesCtrl = require('../controllers/sales.js'),
    { verifyToken } = require('../serverAuth.js')

    
salesRouter.use(verifyToken)
    
//index, show,
salesRouter.route('/')
    .get(salesCtrl.index)
    .post(salesCtrl.create)
//create, update, destroy 

salesRouter.route('/:id')
    .get(salesCtrl.show)
    .delete(salesCtrl.destroy)
    .patch(salesCtrl.update)

module.exports = salesRouter