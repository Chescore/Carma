import React, {useState, useContext} from 'react';
import axios from 'axios';
import {useNavigate, Link} from 'react-router-dom'
import { useForm } from 'react-hook-form';
import {Form, Button, Card} from 'react-bootstrap'

import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import AuthContext from '../../hoc/AuthContext/dealer_auth';
import DealerContext from '../../hoc/AuthContext/dealer_username';

const DealerLogin = () => {
    const {getDealerLoggedIn} = useContext(AuthContext)
    const {setDealer} = useContext(DealerContext)

    const navigate = useNavigate()

    const {handleSubmit,register, formState:{errors}} = useForm()

    const [authDetails, setAuthDetails] = useState({
        email:'',
        password:''
    })

    const delay = ms => new Promise(res => setTimeout(res, ms))

    const onSubmit = async() =>{
        try{
            await axios.post("http://localhost:5000/dealer/login", authDetails)
            await getDealerLoggedIn()
            setDealer(authDetails.email)
            toast('You have successfully logged in', {
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
            });
        }
    }

    return (
        <Card className='shadow m-4 p-4'>
        <div className='m-4'>
            <h1 className='font-nunito'>
                Sign in to your Dealer Account
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
                    <Link to='/dealer_signup'><label>Don't have a dealer account? Sign up</label></Link>
                </div>
            </Form>
            <ToastContainer/>
        </div>
        </Card>
    );
};

export default DealerLogin;