const express = require('express')
const router = express.Router()
const multer = require('multer')

const { Dealer } = require('../models/dealer')
const { Vehicle } = require('../models/vehicle')
const { VehicleImage } = require('../models/image')
const {dealer_auth} = require('../middleware/dealer_auth')
  
const upload = multer()

router.post('/', dealer_auth, upload.single('image'),async(req,res)=>{
    try{
        console.log(req.file)
        console.log(req.body)
        const {brand, model, body_type, year, price, description} = req.body

        const vehicleImage = new VehicleImage({
            data:req.file.buffer,
            contentType: req.file.mimetype
        })

        await vehicleImage.save()

        const vehicle = new Vehicle({
            image:vehicleImage._id,
            brand: brand,
            model: model,
            body_type: body_type,
            year: year,
            price: price,
            description: description,
            inventory: req.user,
            dealer: req.user.username    
        })

        await Dealer.findByIdAndUpdate(req.user, {$push: {inventory: vehicle}})

        await vehicle.save()

        res.status(200).json(vehicle)

    }catch(error){
        res.status(404).json({message: error.message})
    }
})
// router.post('/image', dealer_auth, upload.single("image"), async(req, res)=>{
//     console.log(req.file)
// })

router.get('/', async(req,res)=>{
    try{
        const vehicles = await Vehicle.find()
        res.status(200).json(vehicles)
    }catch(error){
        res.status(404).json({message: error.message})
    }
})

router.get('/:id', async(req,res)=>{
    try{
        const vehicle = await Vehicle.findById(req.params.id)        

        res.status(200).json(vehicle)
    }catch(error){
        res.status(404).json({message: error.message})
    }
})

router.get('/image/:id', async(req,res)=>{
    try{
        const vehicle = await Vehicle.findById(req.params.id)
        const image = await VehicleImage.findById(vehicle.image)
        res.status(200).send(image)
    }catch(err){
        res.status(404).send(message)
    }   
})

module.exports = router;
