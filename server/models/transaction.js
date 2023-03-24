const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
    phone: {
        type: Number,
        required: true
    },
    buyer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Consumer',
        required: true
    },
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Dealer',
        required: true
    },
    vehicle: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vehicle',
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

const Transaction = mongoose.model('Transaction', TransactionSchema)

exports.Transaction = Transaction