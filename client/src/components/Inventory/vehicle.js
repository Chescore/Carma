import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import {useNavigate, useParams} from 'react-router-dom'
import {Buffer} from 'buffer'

import AuthContext from '../../hoc/AuthContext/consumer_auth'

const Vehicle = () => {
    const navigate = useNavigate()

    let {consumerLoggedIn} = useContext(AuthContext)

    let [imageUrl, setImageUrl] = useState([])

    let [vehicle, setVehicle] = useState([])
    let {id} = useParams()

    async function getCheckout(){
        await navigate(`/checkout/${id}`)
    }

    async function getVehicle(){
        try{
            let response = await axios.get(`http://localhost:5000/${id}`)
            setVehicle(response.data)
        }catch(err){
            console.log(err.response.data)
        }
    }
    async function getImage(){
        try{
            let imageResponse = await axios.get(`http://localhost:5000/image/${id}`)
            let base64Image = Buffer.from(imageResponse.data.data).toString('base64')
            setImageUrl(`data:${imageResponse.data.contentType};base64,${base64Image}`)
        }catch(err){
            console.log(err.response.data)
        }
    }

    useEffect(()=>{
        getVehicle()
        getImage()
    },[])

    const showVehicle = () => {
        return(
            <div>
                <div>Brand: {vehicle.brand}</div>
                <div>Model: {vehicle.year} {vehicle.brand} {vehicle.model}</div>
                <div>Body Type: {vehicle.body_type}</div>
                <div><img src={imageUrl} alt="Vehicle"/></div>
                <div>Info: {vehicle.description}</div>
                <div>Price: {vehicle.price}$</div>
            </div>
        )
    }

    return (
        <div>
            {showVehicle()}
            {consumerLoggedIn===true ? 
            <button onClick={getCheckout}>
                Buy Now!
            </button> :
            <></>}
        </div>
    );
};

export default Vehicle;