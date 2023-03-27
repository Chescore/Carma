import axios from 'axios';
import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom'
import {Buffer} from 'buffer'

const Search = () => {
    const [parameter, setParameter] = useState('brand')

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
        searchHandle()
    },[])

    const showVehicles = () => {
        return vehicles.map((vehicle,i)=>{
            let base64Image = Buffer.from(images[i].data).toString('base64')
            return(
                <Link key={i} to={`/inventory/${vehicle._id}`}>
                    <div>{vehicle.brand}</div>
                    <div>{vehicle.year} {vehicle.brand} {vehicle.model}</div>
                    <div><img src={`data:${images[i].contentType};base64,${base64Image}`} alt={vehicle.model}/></div>
                    <div>{vehicle.price}</div>
                </Link>
            )
        })
    }

    const searchHandle = async(e) => {
        try{
            let key = e.target.value
            if(key==="") return getVehicleList() 
            let response = await axios.get(`http://localhost:5000/search/${parameter}/${key}`)
            setVehicles(response.data)
        }catch(err){
            console.log(err)
        }
    }


    return (
        <div>
            <div>
                <label>Search By:</label>
                <select placeholder='Search by:' onChange={(e)=>setParameter(e.target.value)}>
                    <option value='brand'>Brand</option>
                    <option value='model'>Model</option>
                    <option value='year'>Year</option>
                </select>
            </div>
            <div>
                <label>Input:</label>
                {parameter==='year'?
                    <input type='number' 
                    placeholder={`The ${parameter}`}
                    onChange={searchHandle}/> :
                    <input type='text' 
                    placeholder={`The ${parameter}`}
                    onChange={searchHandle}/>
                }
                <div>
            </div>
            </div>
            <div>
                {showVehicles()}
            </div>
        </div>
    );
};

export default Search;