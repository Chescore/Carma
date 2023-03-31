import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import {useNavigate, useParams} from 'react-router-dom'
import {Buffer} from 'buffer'
import {Card} from 'react-bootstrap'

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
                <div className='text-info text-uppercase'>{vehicle.dealer}</div>
                <h1 className='font-nunito text-secondary'>{vehicle.brand} {vehicle.model}</h1>
                <h3>{vehicle.body_type}</h3>
                <h4 className='font-nunito'>Ksh. {vehicle.price}</h4>
                <div><img width='750px' src={imageUrl} alt="Vehicle"/></div>
                <Card className='m-4 p-4'>
                    <div>{vehicle.description}</div>
                </Card>
            </div>                
        )
    }

    return (
        <div className='text-center my-4'>
            {showVehicle()}
            {consumerLoggedIn===true ? 
            <button className='btn btn-outline-primary' onClick={getCheckout}>
                Buy Now!
            </button> :
            <></>}
        </div>
    );
};

export default Vehicle;