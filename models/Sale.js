const
	mongoose = require('mongoose'),
	saleSchema = new mongoose.Schema({
		company: { type: String, required: true},
		price: { type: Number, required: true },
        commission: { type: Number, required: true },
        invoiceDate: { type: Number, required: true },
        return: { type: boolean, default: false}
    })
    
const Sale = mongoose.model('Sale', saleSchema)
module.exports = Sale