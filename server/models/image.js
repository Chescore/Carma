const mongoose = require("mongoose")

const vehicleImageSchema = new mongoose.Schema({
    data: {
        type: Buffer,
        required: true
    },
    contentType: {
      type: String,
      required:true
    },
    vehicle: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Vehicle'
    } 
})

const VehicleImage = mongoose.model('VehicleImage', vehicleImageSchema)

exports.VehicleImage = VehicleImage
