import React, {useContext, useState} from 'react';
import axios from 'axios';
import {useNavigate, Link} from 'react-router-dom'
import { useForm } from 'react-hook-form';

import AuthContext from '../../hoc/AuthContext/consumer_auth';

const ConsumerLogin = () => {
    const {getConsumerLoggedIn} = useContext(AuthContext)

    const navigate = useNavigate()

    const {handleSubmit,register, formState:{errors}} = useForm()

    const [authDetails, setAuthDetails] = useState({
        email:'',
        password:''
    })

    const onSubmit = async() =>{
        try{
            await axios.post("http://localhost:5000/consumer/login", authDetails)
            await getConsumerLoggedIn()
            alert("Login was successful")
            navigate('/inventory')
        }catch(err){
            alert(err.response.data);
        }
    }

    return (
        <div>
            <div>
                Sign in to your Account
            </div>
            <form autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <div>
                        <label>Email</label>
                        <input type='text' 
                            {...register("email",{required:{
                                value:true,message:"Your email address is required"
                            },pattern:{
                                value:/@gmail.com|@yahoo.com|@hotmail.com|@live.com/,message:'Invalid email address'
                            }})}
                            placeholder='Email address'
                            onChange={(e)=>setAuthDetails({...authDetails,email:e.target.value})}
                            value={authDetails.email}/>
                            <div>
                                {errors?.email?.message}
                            </div>
                    </div>
                    <div>
                        <label>Password</label>
                        <input type='password'
                            {...register("password",{
                                required:{value:true,message:'Your password is required'}
                            })} 
                            placeholder='Password'
                            onChange={(e)=>setAuthDetails({...authDetails,password:e.target.value})}
                            value={authDetails.password}/>
                            <div>
                                {errors?.password?.message}
                            </div>
                    </div>
                </div>
                <div>
                    <Link to='/consumer_signup'><label>Don't have an account? Sign up</label></Link>
                    <button type='submit'>Login</button>
                </div>
            </form>
        </div>
    );
};

export default ConsumerLogin;