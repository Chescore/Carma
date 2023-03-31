import React, {useContext, useState} from 'react';
import axios from 'axios';
import {useNavigate, Link} from 'react-router-dom'
import { useForm } from 'react-hook-form';
import {Form, Button, Card} from 'react-bootstrap'

import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

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

    const delay = ms => new Promise(res => setTimeout(res,ms))

    const onSubmit = async() =>{
        try{
            await axios.post("http://localhost:5000/dealer/register", authDetails)
            await getDealerLoggedIn()
            setDealer(authDetails.username)
            toast("Registration was successful",{
                theme: 'light',
                position: 'top-center',
                type: 'success'
            })
            await delay(5000)
            navigate('/vehicle_update')
        }catch(err){
            toast(err.response.data, {
                theme: 'light',
                position: 'top-center',
                type: 'error'
            });        }
    }

    return (
        <Card className='m-4 p-4 shadow'>
            <div className='m-4'>
                <h1 className='font-nunito'>
                    Create your Dealer Account
                </h1>
                <Form autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <div className='form-design my-4'>
                            <Form.Control type='text'
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
                        <div className='form-design my-4'>
                            <Form.Control type='text' 
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
                        <div className='form-design my-4'>
                            <Form.Control type='text'
                                {...register("phone",{required:{
                                    value:true,message:"Your phone number is required"
                                }})}
                                placeholder='Phone Number'
                                onChange={(e)=>setAuthDetails({...authDetails,phone:e.target.value})}
                                value={authDetails.phone}/>
                            <div>
                                {errors?.phone?.message} 
                            </div>
                        </div>
                        <div className='form-design my-4'>
                            <Form.Control type='password'
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
                        <div className='form-design my-4'>
                            <Form.Control type='password'
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
                    <div className='my-4'>
                        <Button type='submit'>Sign up</Button>
                    </div>
                    <div className='my-4'>
                        <Link to='/dealer_login'><label>Already have a dealer account? Log In</label></Link>
                    </div>
                </Form>
                <ToastContainer/>
            </div>                      
        </Card>
    );
};

export default DealerSignup;