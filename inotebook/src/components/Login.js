import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';


export default function Login() {

    const navigate = useNavigate();


    const [logindetails, setlogindetails] = useState({email:"",password:"",confirmpassword:""});

    const handleOnchange=(e)=>{
        setlogindetails({...logindetails,[e.target.id]:e.target.value,});
    }
    const handleOnclick= async (e)=>{
        e.preventDefault();

        const userDetails = {
            email : logindetails.email,
            password : logindetails.password,
        }

        try {
            const response = await fetch("https://mern-inotebook-e6ha.onrender.com/api/auth/login", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
            },
      
              body: JSON.stringify(userDetails),
      
            });
        
            
        
            const data = await response.json();

            if(data.success){
                localStorage.setItem('token',data.authToken);
                navigate("/")
            }
      
            console.log(data) 
      
          } catch (e) {
            console.error("An error occurred", e.message);
          }
        setlogindetails({email:"",password:"",confirmpassword:""});
    }

    return (
        <div className="container">
            <form>
                <div className="form-group my-2">
                    <label htmlFor="email">Email address</label>
                    <input type="email" className="form-control my-2" id="email" value={logindetails.email} onChange={(e)=>handleOnchange(e)} aria-describedby="emailHelp" placeholder="Enter email" />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group my-2">
                    <label htmlFor="password">Password</label>
                    <input type="password" value={logindetails.password} onChange={(e)=>handleOnchange(e)}  className="form-control my-2" id="password" placeholder="Password" />
                </div>
                <div className="form-group my-2">
                    <label htmlFor="confirmpassword">Confirm Password</label>
                    <input type="confirmpassword" value={logindetails.confirmpassword} onChange={(e)=>handleOnchange(e)}  className="form-control my-2" id="confirmpassword" placeholder="Password" />
                </div>

                <button  className={ "btn btn-primary my-2"+( logindetails.email!=="" && logindetails.password===logindetails.confirmpassword ? "":" disabled")} onClick={(e)=>{handleOnclick(e)}}>Submit</button>
            </form>
        </div>
    )
}
