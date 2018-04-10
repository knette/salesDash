const
	mongoose = require('mongoose'),
	saleSchema = new mongoose.Schema({
		company: { type: String, required: true},
		price: { type: Number, required: true },
        commission: { type: Number, required: true },
        invoiceDate: { type: Date, required: true },
        refund: { type: Boolean, default: false},
        user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
    })
    
const Sale = mongoose.model('Sale', saleSchema)
module.exports = Sale