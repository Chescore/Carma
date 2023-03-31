import React, {useContext, useState} from 'react';
import axios from 'axios';
import {useNavigate, Link} from 'react-router-dom'
import { useForm } from 'react-hook-form';
import { Form, Button, Card } from 'react-bootstrap'

import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import AuthContext from '../../hoc/AuthContext/consumer_auth';
import ConsumerContext from '../../hoc/AuthContext/consumer_username';

const ConsumerLogin = () => {
    const {getConsumerLoggedIn} = useContext(AuthContext)

    const navigate = useNavigate()

    const {handleSubmit,register, formState:{errors}} = useForm()

    const [authDetails, setAuthDetails] = useState({
        email:'',
        password:''
    })

    const delay = ms => new Promise(res => setTimeout(res, ms))

    const {setConsumer} = useContext(ConsumerContext)

    const onSubmit = async() =>{
        try{
            await axios.post("http://localhost:5000/consumer/login", authDetails)
            await getConsumerLoggedIn()
            setConsumer(authDetails.email)
            toast('You have successfully logged in', {
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
        <Card className='m-4 p-4 shadow'>
            <div className='m-4'>
                <h1 className='font-nunito'>
                    Sign in to your Account
                </h1>
                <Form autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <div className='form-design my-2 py-2'>
                            <Form.Control type='email' 
                                {...register("email",{required:{
                                    value:true,message:"Your email address is required"
                                },pattern:{
                                    value:/@gmail.com|@yahoo.com|@hotmail.com|@live.com/,message:'Invalid email address'
                                }})}
                                placeholder='Email address'
                                onChange={(e)=>setAuthDetails({...authDetails,email:e.target.value})}
                                value={authDetails.email}/>
                                <div className='text-danger'>
                                    <i>{errors?.email?.message}</i>
                                </div>
                        </div>
                        <div className="form-design my-2 py-2">
                            <Form.Control type='password'
                                {...register("password",{
                                    required:{value:true,message:'Your password is required'}
                                })} 
                                placeholder='Password'
                                onChange={(e)=>setAuthDetails({...authDetails,password:e.target.value})}
                                value={authDetails.password}/>
                                <div className='text-danger'>
                                    <i>{errors?.password?.message}</i>
                                </div>
                        </div>
                    </div>
                    <div className='my-4'>
                        <Button variant='primary' type='submit'>Login</Button>
                    </div>
                    <div>
                        <Link to='/consumer_signup'><label>Don't have an account? Sign up</label></Link>
                    </div>
                </Form>
                <ToastContainer/>
            </div>
        </Card>
    );
};

export default ConsumerLogin;