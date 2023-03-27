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

router.get('/', async(req,res)=>{
    try{
        const vehicles = await Vehicle.find()
        
        const images = await VehicleImage.find(vehicles.image)
        vehicles.image = images

        res.status(200).json({vehicles: vehicles, images, images})
    }catch(error){
        res.status(404).json({message: error.message})
    }
})

router.get('/search/brand/:key', async(req,res)=>{
    try{
        let result = await Vehicle.find({
            "$or": [
                {
                    brand: { $regex: req.params.key}
                }
            ]
        })
        res.status(200).send(result)
    }catch(error){
        res.status(404).json({message:error.message})
    }
})

router.get('/search/model/:key', async(req,res)=>{
    try{
        let result = await Vehicle.find({
            "$or": [
                {
                    model: { $regex: req.params.key}
                }
            ]
        })
        res.status(200).send(result)
    }catch(error){
        res.status(404).json({message:error.message})
    }
})

router.get('/search/year/:key', async(req,res)=>{
    try{
        let result = await Vehicle.find({
            "$or": [
                {
                    year: parseInt(req.params.key)
                }
            ]
        })
        if(!result) return res.status(400).send("Result not found")
        res.status(200).json(result)
    }catch(error){
        res.status(404).json({message:error.message})
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
        res.status(404).json({message:error.message})
    }   
})

module.exports = router;
