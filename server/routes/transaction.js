const express = require("express")
const router = express.Router()

const {Vehicle} = require('../models/vehicle')
const {Dealer} = require('../models/dealer')
const {Transaction} = require('../models/transaction')
const {Consumer} = require("../models/consumer")
const {access} = require('../middleware/access')
const {consumer_auth} = require('../middleware/consumer_auth')

const moment = require('moment')
const unirest = require('unirest')
const axios = require('axios')


router.get('/register_url', access, async(req,res)=>{   
    try{
        unirest('POST', 'https://sandbox.safaricom.co.ke/mpesa/c2b/v1/registerurl')
        .headers({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${req.access.access_token}`
        })
        .send(JSON.stringify({
            "ShortCode": 600984,
            "ResponseType": "Completed",
            "ConfirmationURL": process.env.PUBLIC_IP +"/transaction/confirmation",
            "ValidationURL": process.env.PUBLIC_IP +"/transaction/validation",
        }))
        .end(response => {
            if (response.error) return res.send(response.error);
            res.send(response.raw_body);
        });
    } 
    catch(err){
        res.send(err.message)
    }
})

router.post('/:id', consumer_auth, access, async(req,res)=>{
    try{
        const {phone} = req.body

        let timestamp = moment().format('YYYYMMDDHHmmss')
        let password = new Buffer.from(
            "174379" +
            "bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919" +
            timestamp
        ).toString("base64");

        const vehicle = await Vehicle.findById(req.params.id)
        if(!vehicle) return res.status(400).send('Invalid vehicle ID!')

        const transaction = new Transaction({
            phone: phone,
            buyer: req.user,
            seller: vehicle.inventory,
            vehicle: vehicle,
            price: vehicle.price
        })

        let response = axios.post('https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest' , JSON.stringify({
            "BusinessShortCode": 174379,
            "Password": password,
            "Timestamp": timestamp,
            "TransactionType": "CustomerPayBillOnline",
            "Amount": 1,
            "PartyA": phone,    
            "PartyB": 174379,
            "PhoneNumber": phone,
            "CallBackURL": process.env.PUBLIC_IP +"/transaction/callback",
            "AccountReference": "TruckKun",
            "TransactionDesc": "Payment of X" 
        }), {
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${req.access.access_token}` 
            }
        })

        if(response.error) return res.send(response.error);
        await Dealer.findByIdAndUpdate(vehicle.inventory, {$push: {transactions: transaction}})
        await Consumer.findByIdAndUpdate(req.user, {$push: {transactions: transaction}})
        await transaction.save()
        res.send(response.raw_body);
    }catch(error){
        res.send(error.message)
    }
})

module.exports = router