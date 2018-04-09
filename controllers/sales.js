const Sale = require('../models/Sale.js')

module.exports = {
    index: (req, res) => {
        Sale.find({}, (err, allDemSales) => {
            if(err) return console.log(err)
            res.json(allDemSales)
        })
    },
    show: (req, res) => {
     Sale.findById(req.params.id, (err, thatSale) => {
            if(err) return console.log(err) 
            res.json(thatSale)
        })
    },
    create: (req, res) => {
        newSale.create({... req.body, user: req.user._id }, (err, brandNewSale) => {
            if(err) return console.log(err)
            res.json({sucess: true, mesage: "Sale Created!"})
        })
    },
    update: (req, res) => {
        Sale.findById(req.params.id, (err, sale) => {
         sale.company = req.body.company
         sale.price = req.body.price
         sale.comission = req.body.comission
         sale.invoiceDate = req.body.invoiceDate
         sale.return = req.body.return
         sale.user = req.user._id
         sale.save((err, updatedSale) => {
             if(err) return err
             res.json(updatedSale)
         })
        })
    },
    destroy: (req, res) => {
        Sale.findByIdAndRemove(req.params.id, (err, deletedSale) => {
            if(err) return console.log(err)
            res.json({message: "Sale deleted"})
        })
    }
 }