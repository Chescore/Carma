import React, {useState, useContext} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
import { useForm } from 'react-hook-form';

import AuthContext from '../../hoc/AuthContext/dealer_auth';
import VehicleImage from './image'; 

const VehicleUpdate = () => {
    const navigate = useNavigate()

    const {dealerLoggedIn} = useContext(AuthContext)
    
    if(dealerLoggedIn === false) navigate('/dealer_login')

    const {handleSubmit,register, formState:{errors}} = useForm()

    const [vehicleDetails, setVehicleDetails] = useState({
        brand: '',
        model:'',
        body_type: '',
        year: '',
        price: '',
        description: '',
    })

    const onSubmit = async() =>{
        try{
            await axios.post("http://localhost:5000/", vehicleDetails)
            alert('Your inventory has been updated successfully')
            navigate('/inventory')
        }catch(err){
            alert(err.response.data);
        }
    }

    return (
        <div>
            <div>
                Post your Vehicle here
            </div>
            <div>
                <VehicleImage/>
            </div>
            <form autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <div>
                        <label>Brand</label>
                        <input type='text' 
                            {...register("brand",{required:{
                                value:true,message:"This field is required"
                            }})}
                            placeholder='The Brand'
                            onChange={(e)=>setVehicleDetails({...vehicleDetails,brand:e.target.value})}
                            value={vehicleDetails.brand}/>
                            <div>
                                {errors?.brand?.message}
                            </div>
                    </div>
                    <div>
                        <label>Model</label>
                        <input type='text' 
                            {...register("model",{required:{
                                value:true,message:"This field is required"
                            }})}
                            placeholder='The Model'
                            onChange={(e)=>setVehicleDetails({...vehicleDetails,model:e.target.value})}
                            value={vehicleDetails.model}/>
                            <div>
                                {errors?.model?.message}
                            </div>
                    </div>
                    <div>
                        <label>Body Type</label>
                        <input type='text' 
                            {...register("body_type",{required:{
                                value:true,message:"This field is required"
                            }})}
                            placeholder='The Body Type'
                            onChange={(e)=>setVehicleDetails({...vehicleDetails,body_type:e.target.value})}
                            value={vehicleDetails.body_type}/>
                            <div>
                                {errors?.body_type?.message}
                            </div>
                    </div>
                    <div>
                        <label>Year</label>
                        <input type='number' 
                            {...register("year",{required:{
                                value:true,message:"This field is required"
                            }})}
                            placeholder='Year of Make'
                            onChange={(e)=>setVehicleDetails({...vehicleDetails,year:e.target.value})}
                            value={vehicleDetails.year}/>
                            <div>
                                {errors?.year?.message}
                            </div>
                    </div>
                    <div>
                        <label>Price</label>
                        <input type='number' 
                            {...register("price",{required:{
                                value:true,message:"This field is required"
                            }})}
                            placeholder='Price of model'
                            onChange={(e)=>setVehicleDetails({...vehicleDetails,price:e.target.value})}
                            value={vehicleDetails.price}/>
                            <div>
                                {errors?.price?.message}
                            </div>
                    </div>
                    <div>
                        <label>Desription</label>
                        <input type='text' 
                            {...register("description",{required:{
                                value:true,message:"This field is required"
                            }})}
                            placeholder='Vehicle description'
                            onChange={(e)=>setVehicleDetails({...vehicleDetails,description:e.target.value})}
                            value={vehicleDetails.description}/>
                            <div>
                                {errors?.description?.message}
                            </div>
                    </div>
                </div>
                <div>
                    <button type='submit'>Submit</button>
                </div>
            </form>
        </div>
    );
};

export default VehicleUpdate;