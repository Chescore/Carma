const mongoose = require("mongoose")

const vehicleImageSchema = new mongoose.Schema({
    image: {
        type: Buffer,
        required: true
    },
    vehicle: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Vehicle'
    } 
})

const VehicleImage = mongoose.model('VehicleImage', vehicleImageSchema)

exports.VehicleImage = VehicleImage
