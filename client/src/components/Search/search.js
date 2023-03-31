import axios from 'axios';
import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom'
import {Buffer} from 'buffer'
import { Card, Form } from 'react-bootstrap'

const Search = () => {
    const [parameter, setParameter] = useState('brand')

    let [vehicles, setVehicles] = useState([])

    async function getVehicleList(){
        try{
            let response = await axios.get('http://localhost:5000/')
            setVehicles(response.data.vehicles)
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
            return(
                <Card key={i} className='shadow-sm m-4 text-center p-4'>
                    <Link className='text-decoration-none text-secondary' to={`/inventory/${vehicle._id}`}>
                        <div>{vehicle.brand}</div>
                        <div>{vehicle.year} {vehicle.brand} {vehicle.model}</div>
                        <div>{vehicle.price}</div>
                    </Link>
                </Card>
            )
        })
    }

    const searchHandle = async(e) => {
        try{
            let key = e.target.value
            if(key==="") return getVehicleList() 
            let response = await axios.get(`http://localhost:5000/search/${parameter}/${key}`)
            setVehicles(response.data.vehicles)
        }catch(err){
            console.log(err)
        }
    }


    return (
        <div className='p-4'>
            <div className='form-design'>
                <label>Search By:</label>
                <Form.Select placeholder='Search by:' onChange={(e)=>setParameter(e.target.value)}>
                    <option value='brand'>Brand</option>
                    <option value='model'>Model</option>
                    <option value='year'>Year</option>
                </Form.Select>
            </div>
            <div className='form-design my-2'>
                <label>Input:</label>
                {parameter==='year'?
                    <Form.Control type='number' 
                    placeholder={`The ${parameter}`}
                    onChange={searchHandle}/> :
                    <Form.Control type='text' 
                    placeholder={`The ${parameter}`}
                    onChange={searchHandle}/>
                }
                <div>
            </div>
            </div>
            <div className='d-flex flex-row'>
                {showVehicles()}
            </div>
        </div>
    );
};

export default Search;