import React, {useState, useContext} from 'react';
import axios from 'axios';
import {useNavigate, Link} from 'react-router-dom'
import { useForm } from 'react-hook-form';
import AuthContext from '../../hoc/AuthContext/dealer_auth';

const DealerLogin = () => {
    const {getDealerLoggedIn} = useContext(AuthContext)
    const navigate = useNavigate()

    const {handleSubmit,register, formState:{errors}} = useForm()

    const [authDetails, setAuthDetails] = useState({
        email:'',
        password:''
    })

    const onSubmit = async() =>{
        try{
            await axios.post("http://localhost:5000/dealer/login", authDetails)
            await getDealerLoggedIn()
            alert('You have successfully logged in')
            navigate('/vehicle_update')
        }catch(err){
            alert(err.response.data);
        }
    }

    return (
        <div>
            <div>
                Sign in to your Dealer Account
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
                    <Link to='/dealer_signup'><label>Don't have an account? Sign up</label></Link>
                    <button type='submit'>Login</button>
                </div>
            </form>
        </div>
    );
};

export default DealerLogin;