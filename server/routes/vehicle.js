const express = require('express')
const router = express.Router()
const multer = require('multer')

const { Dealer } = require('../models/dealer')
const { Vehicle } = require('../models/vehicle')
const { VehicleImage } = require('../models/image')
const {dealer_auth} = require('../middleware/dealer_auth')

const upload = multer({ dest: 'uploads/'})

router.post('/', dealer_auth, upload.single('image'),async(req,res)=>{
    try{
        const {brand, model, body_type, year, price, description} = req.body
        console.log(req.file)

        const vehicle = new Vehicle({
            brand: brand,
            model: model,
            body_type: body_type,
            year: year,
            price: price,
            description: description,
            image:req.file,
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

router.post('/image', dealer_auth, upload.single("image"), async(req, res)=>{
    console.log(req.file)
    await Vehicle
})

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

module.exports = router;
