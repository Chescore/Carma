import React, {useState} from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';

const VehicleImage = () => {
    const [image, setImage] = useState('')
    const {handleSubmit,register, formState:{errors}} = useForm()

    const imageSubmit = async() => {
        try{
            const formData = new FormData()
            formData.append('image', image)
            await axios.post("http://localhost:5000/image", formData)
            alert("Image uploaded successfully")
        }catch(err){
            console.log(err.response.data)
        }
    }

    return(
        <div>
            <div>
                <img src={URL.createObjectURL(image)}></img>
            </div>
            <form autoComplete='off' onSubmit={handleSubmit(imageSubmit)}>
                <div>
                    <label>Image Upload</label>
                    <input type='file' 
                        {...register("image",{required:{
                            value:true,message:"This field is required"
                        }})}
                        placeholder='File Upload'
                        onChange={(e)=>setImage(e.target.files[0])}/>
                        <div>
                            {errors?.image?.message}
                        </div>
                </div>
                <div>
                    <button type='submit'>Upload Image</button>
                </div>
            </form>
        </div>
    )
}

export default VehicleImage