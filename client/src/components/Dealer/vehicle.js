import React, {useState, useContext} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
import { useForm } from 'react-hook-form';
import { Form, Card } from 'react-bootstrap'

import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import AuthContext from '../../hoc/AuthContext/dealer_auth';

const VehicleUpdate = () => {
    const navigate = useNavigate()

    const {dealerLoggedIn} = useContext(AuthContext)
    
    if(dealerLoggedIn === false) navigate('/dealer_login')

    const {handleSubmit,register, formState:{errors}} = useForm()

    const [vehicleDetails, setVehicleDetails] = useState({
        image:'',
        brand: '',
        model:'',
        body_type: '',
        year: '',
        price: '',
        description: '',
    })

    const delay = ms => new Promise(res => setTimeout(res,ms))

    const onSubmit = async() =>{
        try{
            const formData = new FormData()
            formData.append('image', vehicleDetails.image)
            formData.append('brand', vehicleDetails.brand)
            formData.append("model", vehicleDetails.model);
            formData.append("body_type", vehicleDetails.body_type);
            formData.append("year", vehicleDetails.year);
            formData.append("price", vehicleDetails.price);
            formData.append("description", vehicleDetails.description)
            await axios.post("http://localhost:5000/", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            })
            toast('Your inventory has been updated successfully', {
                theme: 'light',
                position: 'top-center',
                type: 'success'
            })
            await delay(5000)
            navigate('/inventory')
        }catch(err){
            toast(err.response.data, {
                theme: 'light',
                position: 'top-center',
                type: 'error'
            });        }
    }

    return (
        <Card className='m-4'>
            <div className='m-4'>
                <h1 className='font-nunito'>
                    Upload your Vehicle
                </h1>
                <Form autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <div className='form-design my-4'>
                            <Form.Control type='file' 
                                {...register("image",{required:{
                                    value:true,message:"This field is required"
                                }})}
                                placeholder='File Upload'
                                onChange={(e)=>setVehicleDetails({...vehicleDetails,image:e.target.files[0]})}/>
                                <div className='text-danger'>
                                    {errors?.image?.message}
                                </div>
                        </div>
                        <div className='form-design my-4'>
                            <Form.Control type='text' 
                                {...register("brand",{required:{
                                    value:true,message:"This field is required"
                                }})}
                                placeholder='The Brand'
                                onChange={(e)=>setVehicleDetails({...vehicleDetails,brand:e.target.value})}
                                value={vehicleDetails.brand}/>
                                <div className='text-danger'>
                                    {errors?.brand?.message}
                                </div>
                        </div>
                        <div className='form-design my-4'>
                            <Form.Control type='text' 
                                {...register("model",{required:{
                                    value:true,message:"This field is required"
                                }})}
                                placeholder='The Model'
                                onChange={(e)=>setVehicleDetails({...vehicleDetails,model:e.target.value})}
                                value={vehicleDetails.model}/>
                                <div className='text-danger'>
                                    {errors?.model?.message}
                                </div>
                        </div>
                        <div className='form-design my-4'>
                            <Form.Control type='text' 
                                {...register("body_type",{required:{
                                    value:true,message:"This field is required"
                                }})}
                                placeholder='The Body Type'
                                onChange={(e)=>setVehicleDetails({...vehicleDetails,body_type:e.target.value})}
                                value={vehicleDetails.body_type}/>
                                <div className='text-danger'>
                                    {errors?.body_type?.message}
                                </div>
                        </div>
                        <div className='form-design my-4'>
                            <Form.Control type='number' 
                                {...register("year",{required:{
                                    value:true,message:"This field is required"
                                }})}
                                placeholder='Year of Make'
                                onChange={(e)=>setVehicleDetails({...vehicleDetails,year:e.target.value})}
                                value={vehicleDetails.year}/>
                                <div className='text-danger'>
                                    {errors?.year?.message}
                                </div>
                        </div>
                        <div className='form-design my-4'>
                            <Form.Control type='number' 
                                {...register("price",{required:{
                                    value:true,message:"This field is required"
                                }})}
                                placeholder='Price of model'
                                onChange={(e)=>setVehicleDetails({...vehicleDetails,price:e.target.value})}
                                value={vehicleDetails.price}/>
                                <div className='text-danger'>
                                    {errors?.price?.message}
                                </div>
                        </div>
                        <div className='form-lg-textarea my-4'>
                            <Form.Control as='textarea' rows={3} columns={20} 
                                {...register("description",{required:{
                                    value:true,message:"This field is required"
                                }})}
                                placeholder='Vehicle description'
                                onChange={(e)=>setVehicleDetails({...vehicleDetails,description:e.target.value})}
                                value={vehicleDetails.description}/>
                                <div className='text-danger'>
                                    {errors?.description?.message}
                                </div>
                        </div>
                    </div>
                    <div>
                        <button className='btn btn-outline-primary' type='submit'>Submit</button>
                    </div>
                </Form>
                <ToastContainer/>
            </div>
        </Card>
    );
};

export default VehicleUpdate;