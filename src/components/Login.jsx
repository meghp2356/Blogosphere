import {useState} from "react";
import "./css/Login.css";
import { Input } from "./index";
import auth from "../services/auth";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { login } from "../app/userSlice";
import { useNavigate  } from "react-router-dom";

function Login() {
  const [error, setError] = useState("");
  const { handleSubmit, register } = useForm();
  const dispatch = useDispatch();
  const [type, setType] = useState("password");
  const navigate = useNavigate();

  async function onsubmit(data){
    setError('')
    console.log(data.email,data.password)
    try{
      const response = await auth.login(data);
      console.log(response)

      if(response){ 

        const data = await auth.getAccount();
        console.log(data)
        if(data) dispatch(login(data))
        navigate('/');
      
      }
    }catch(err){

      console.log(err)
      setError('Invalid mail or password')
      
    }
  }
  return (
    <div className="body">
      <div className="conatiner">
        <h1>LOGIN </h1>
        <form action="" onSubmit={(handleSubmit(onsubmit))}>
          <Input className="input" type="text" placeholder="Email" {...register('email')} />
          <Input className="input" type={type} placeholder="password" {...register('password')}/>
          <button>Login</button>
        </form>
        <hr />
        {error && <p>{error}</p>} 
        <span onClick={()=>navigate("/signup")}> Do not have an Account?SignUp</span>
      </div>
    </div>
  );
}

export default Login;
