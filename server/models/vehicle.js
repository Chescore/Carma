const mongoose = require("mongoose")

const vehicleSchema = new mongoose.Schema({
  brand: {
    type: String,
    required: [true, "This field is required"]
  },
  model: {
    type: String,
    required: [true, "This field is required"]
  },
  body_type: {
    type: String,
    required: [true, "This field is required"]
  },
  year: {
    type: Number,
    required: [true, "This field is required"]
  },
  price: {
    type: Number,
    required: [true, "This field is required"]          
  },
  image: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vehicle'
  },
  description: {
    type: String,
    required: [true, "This field is required"]
  },
  dealer: {
    type: String
  },
  inventory:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Dealer'
  },
  createdAt:{
    type: Date,
    default: Date.now
  }
})

const Vehicle = mongoose.model('Vehicle', vehicleSchema)

exports.Vehicle = Vehicle
