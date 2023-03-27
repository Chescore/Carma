import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'
import {Buffer} from 'buffer'

const Vehicles = () => {
    let [vehicles, setVehicles] = useState([])
    let [images, setImages] = useState([])


    async function getVehicleList(){
        try{
            let response = await axios.get('http://localhost:5000/')
            setVehicles(response.data.vehicles)
            setImages(response.data.images)
        }catch(err){
            console.log(err.response.data)
        }
    }

    useEffect(()=>{
        getVehicleList()
    },[])

    const showVehicles = () => {
        return vehicles.map((vehicle,i)=>{
            let base64Image = Buffer.from(images[i].data).toString('base64')
            return(
                <Link key={i} to={`/inventory/${vehicle._id}`}>
                    <div>{vehicle.dealer}</div>
                    <div>{vehicle.brand}</div>
                    <div>{vehicle.year} {vehicle.brand} {vehicle.model}</div>
                    <div><img src={`data:${images[i].contentType};base64,${base64Image}`} alt={vehicle.model}/></div>
                    <div>{vehicle.price}</div>
                </Link>
            )
        })
    }

    return (
        <div>
            {showVehicles()}
        </div>
    );
};

export default Vehicles;