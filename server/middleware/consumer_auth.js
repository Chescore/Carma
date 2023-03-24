const jwt = require("jsonwebtoken")

const consumer_auth = (req,res,next) => {
    const token = req.cookies.token;

    if(token){
        jwt.verify(token, process.env.CONSUMER_TOKEN_KEY, (err, decoded)=>{
            if(err) return res.json({
                isLoggedIn: false,
                message: "Unauthorised"
            })
            req.user = {}
            req.user = decoded
            next() 
        })
    }else{
        res.json({message: 'Unauthorized', isLoggedIn:false})
    }
}

exports.consumer_auth = consumer_auth