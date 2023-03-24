import React, {useContext, useState} from 'react';
import axios from 'axios';
import {useNavigate, useParams} from 'react-router-dom'
import { useForm } from 'react-hook-form';

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

    const onSubmit = async() =>{
        try{
            await axios.post(`http://localhost:5000/transaction/${id.id}`, authDetails)
            alert("Your transaction was successful. Please wait for a message")
            navigate('/inventory')
        }catch(err){
            alert(err.response.data);
        }
    }

    return (
        <div>
            <div>
                M-PESA Checkout
            </div>
            <form autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label>Mpesa Phone Number</label>
                    <input type='number' 
                        {...register("phone",{required:{
                            value:true,message:"Your phone number"
                        }})}
                        placeholder='Your M-PESA Phone Number'
                        onChange={(e)=>setAuthDetails({...authDetails,phone:e.target.value})}
                        value={authDetails.phone}/>
                        <div>
                            {errors?.phone?.message}
                        </div>
                </div>
                <div>
                    <button type='submit'>Proceed</button>
                </div>
            </form>
        </div>
    );
};

export default Checkout;