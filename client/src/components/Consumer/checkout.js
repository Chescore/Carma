import React, {useContext, useState} from 'react';
import axios from 'axios';
import {useNavigate, useParams} from 'react-router-dom'
import { useForm } from 'react-hook-form';
import { Form, Card } from 'react-bootstrap'

import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import AuthContext from '../../hoc/AuthContext/consumer_auth'

const Checkout = () => {
    const navigate = useNavigate()

    const {consumerLoggedIn} = useContext(AuthContext)

    if(consumerLoggedIn===false) navigate('/consumer_login')

    const id = useParams()

    const {handleSubmit,register, formState:{errors}} = useForm()

    const [authDetails, setAuthDetails] = useState({
        phone:'',
    })

    const delay = ms => new Promise(res => setTimeout(res,ms))

    const onSubmit = async() =>{
        try{
            await axios.post(`http://localhost:5000/transaction/${id.id}`, authDetails)
            toast("Your transaction was successful. Please wait for a message", {
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
            });        
        }
    }

    return (
        <Card className='m-4 p-4 shadow'>
            <div className='m-4'>
                <h1>
                    M-PESA Checkout
                </h1>
                <form autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
                    <div className='form-design my-4'>
                        <label>Your MPESA phone number:</label>
                        <Form.Control type='number' 
                            {...register("phone",{required:{
                                value:true,message:"Your phone number"
                            }})}
                            placeholder='Start with 254'
                            onChange={(e)=>setAuthDetails({...authDetails,phone:e.target.value})}
                            value={authDetails.phone}/>
                            <div>
                                {errors?.phone?.message}
                            </div>
                    </div>
                    <div>
                        <button className='btn btn-outline-secondary' type='submit'>Proceed</button>
                    </div>
                </form>
                <ToastContainer/>
            </div>
        </Card>
    );
};

export default Checkout;