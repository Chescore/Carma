import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'

const Vehicles = () => {
    let [vehicles, setVehicles] = useState([])

    async function getVehicleList(){
        try{
            let response = await axios.get('http://localhost:5000/')
            setVehicles(response.data)
        }catch(err){
            console.log(err.response.data)
        }
    }

    useEffect(()=>{
        getVehicleList()
    },[])

    const showVehicles = () => {
        return vehicles.map((vehicle,i)=>{
            return(
                <Link key={i} to={`/inventory/${vehicle._id}`}>
                    <div>{vehicle.brand}</div>
                    <div>{vehicle.year} {vehicle.brand} {vehicle.model}</div>
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