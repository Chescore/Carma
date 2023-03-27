import React, {useContext, useState} from 'react';
import axios from 'axios';
import {useNavigate, Link} from 'react-router-dom'
import { useForm } from 'react-hook-form';

import AuthContext from '../../hoc/AuthContext/dealer_auth';
import DealerContext from '../../hoc/AuthContext/dealer_username';

const DealerSignup = () => {
    const navigate = useNavigate()

    const {getDealerLoggedIn} = useContext(AuthContext)
    const {setDealer} = useContext(DealerContext)

    const {handleSubmit,register, formState:{errors}} = useForm()

    const [authDetails, setAuthDetails] = useState({
        username:'',
        email:'',
        phone: '',
        password:'',
        passwordVerify: ''
    })

    const onSubmit = async() =>{
        try{
            await axios.post("http://localhost:5000/dealer/register", authDetails)
            await getDealerLoggedIn()
            setDealer(authDetails.username)
            alert("Registration was successful")
            navigate('/vehicle_update')
        }catch(err){
            alert(err.response.data);
        }
    }

    return (
        <div>
            <div>
                Create your Dealer Account
            </div>
            <form autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <div>
                        <label>Username</label>
                        <input type='text'
                            {...register("username",{required:{
                                value:true,message:"Your username is required"
                            }})}
                            placeholder='Username'
                            onChange={(e)=>setAuthDetails({...authDetails,username:e.target.value})}
                            value={authDetails.username}/>
                        <div>
                            {errors?.username?.message}
                        </div>
                    </div>
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
                        <label>Phone Number</label>
                        <input type='text'
                            {...register("phone",{required:{
                                value:true,message:"Your phone number is required"
                            }})}
                            placeholder='Username'
                            onChange={(e)=>setAuthDetails({...authDetails,phone:e.target.value})}
                            value={authDetails.phone}/>
                        <div>
                            {errors?.phone?.message}
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
                    <div>
                        <label>Repeat Password</label>
                        <input type='password'
                            {...register("passwordVerify",{
                                required:{value:true,message:'Your password is required'}
                            })} 
                            placeholder='Repeat Password'
                            onChange={(e)=>setAuthDetails({...authDetails,passwordVerify:e.target.value})}
                            value={authDetails.passwordVerify}/>
                            <div>
                                {errors?.passwordVerify?.message}
                            </div>
                    </div>
                </div>
                <div>
                    <Link to='/dealer_login'><label>Already have an account? Log In</label></Link>
                    <button type='submit'>Sign up</button>
                </div>
            </form>
        </div>
    );
};

export default DealerSignup;