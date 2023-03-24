const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")

const dealerSchema = new mongoose.Schema({
    username: {
        type:String,
        required:[true, "This field is required"],
        lowercase:true
    },
    email: {
        type:String,
        required:[true, "This field is required"],
        trim:true,
        lowercase:true
    },
    password: {
        type:String,
        required:[true, "This field is required"]
    },
    phone: {
        type: String,
        required: [true, "This field is required"]
    },
    inventory: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vehicle'
    }],
    transactions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Transaction'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
})

dealerSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id:this._id, email:this.email, username:this.username}, process.env.DEALER_TOKEN_KEY)
    return token
}

const Dealer = mongoose.model('Dealer', dealerSchema)

exports.Dealer = Dealer