import React, { useState } from "react";
import "./css/Login.css";
import { Input } from "./index";
import auth from "../services/auth";
import {useForm} from 'react-hook-form'
import {useDispatch} from 'react-redux'
import {login} from '../app/userSlice'
import { useNavigate } from "react-router-dom";

 function SignUp() {

  const [error,setError] = useState('')
  const {handleSubmit,register} = useForm();
  const dispatch = useDispatch()
  const [type,setType] = useState('password')
  const navigate = useNavigate()

  const onSubmit = async (data) => {

    try{
      setError('')
      const response = await auth.createACcount(data);

      if(response){
        const userdata = await auth.getAccount(data);
        if(userdata) dispatch(login(userdata))
        navigate('/')
      }
    }catch(err){
      console.log(err)
      setError("already exits")
    }
    
  }

  return (
    <div className="body">
      <div className="conatiner">
        <h1>SIGNUP</h1>
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <Input className="input" type="text" placeholder="UserName" {...register('username')} />
          <Input className="input" type="text" placeholder="Email" {...register('email')}/>
          <Input className="input" type={type} placeholder="password" {...register('password')}/>
          <button>Submit</button>
        </form>
        <hr />
         {error && <p>{error}</p>} 
        <span onClick={()=>navigate('/login')}>Already have an Account?Login</span>
      </div>
    </div>
  );
}

export default SignUp;
