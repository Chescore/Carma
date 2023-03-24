import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useNavigate, useParams} from 'react-router-dom'

const Vehicle = () => {
    const navigate = useNavigate()

    let [vehicle, setVehicle] = useState([])
    let {id} = useParams()

    async function getCheckout(){
        await navigate(`/checkout/${id.id}`)
    }

    async function getVehicle(){
        try{
            let response = await axios.get(`http://localhost:5000/${id}`)
            setVehicle(response.data)
        }catch(err){
            console.log(err.response.data)
        }
    }

    useEffect(()=>{
        getVehicle()
    })

    const showVehicle = () => {
        return(
            <div>
                <div>Brand: {vehicle.brand}</div>
                <div>Model: {vehicle.year} {vehicle.brand} {vehicle.model}</div>
                <div>Body Type: {vehicle.body_type}</div>
                <div>Image: {vehicle.image}</div>
                <div>Info: {vehicle.description}</div>
                <div>Price: {vehicle.price}$</div>
            </div>
        )
    }

    return (
        <div>
            {showVehicle()}
            <button onClick={getCheckout}>
                Buy Now!
            </button>
        </div>
    );
};

export default Vehicle;