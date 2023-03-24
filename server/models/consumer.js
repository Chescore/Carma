const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")

const consumerSchema = new mongoose.Schema({
    username: {
        type:String,
        required:[true, "This field is required"],
        lowercase:true
    },
    email: {
        type:String,
        required:[true, "This field is required"],
        lowercase:true,
        trim:true
    },
    password: {
        type:String,
        required:[true, "This field is required"]
    },
    phone: {
        type: String,
        required: true
    },
    transactions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Transaction'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
})

consumerSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id:this._id, email:this.email, username:this.username}, process.env.CONSUMER_TOKEN_KEY)
    return token
}

const Consumer = mongoose.model('Consumer', consumerSchema)

exports.Consumer = Consumer