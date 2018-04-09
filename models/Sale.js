const
	mongoose = require('mongoose'),
	saleSchema = new mongoose.Schema({
		company: { type: String, required: true},
		price: { type: Number, required: true },
        commission: { type: Number, required: true },
        invoiceDate: { type: Number, required: true },
        return: { type: Boolean, default: false},
        user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
    })
    
const Sale = mongoose.model('Sale', saleSchema)
module.exports = Sale