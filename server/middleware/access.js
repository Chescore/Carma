const unirest = require('unirest')

const access = (req,res,next)=>{
    unirest('GET', 'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials')
    .headers({ 'Authorization': `Basic ${process.env.MPESA_AUTH_KEY}` })
    .send()
    .end(response => {
        if (response.error) throw new Error(response.error);
        req.access = JSON.parse(response.raw_body)
        next()
    })
}

exports.access = access