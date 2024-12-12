import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
    
    const navigate = useNavigate();


    const [Signup, setSignup] = useState({name:"",email:"",password:"",confirmpassword:""});

    const handleOnchange=(e)=>{
        setSignup({...Signup,[e.target.id]:e.target.value,});
    }
    const handleOnclick= async (e)=>{
        e.preventDefault();

        const userDetails = {
            name: Signup.name,
            email : Signup.email,
            password : Signup.password,
        }

        try {
            const response = await fetch("http://localhost:4000/api/auth/createUser", {
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
            console.error("An error occurred :", e.message);
          }
        setSignup({email:"",password:"",confirmpassword:""});
    }

    return (
        <div className="container">
            <form>
                <div className="form-group my-2">
                    <label htmlFor="name">Name</label>
                    <input  className="form-control my-2" id="name" value={Signup.name} onChange={(e)=>handleOnchange(e)}  placeholder="Enter name" />
                </div>
                <div className="form-group my-2">
                    <label htmlFor="email">Email address</label>
                    <input type="email" className="form-control my-2" id="email" value={Signup.email} onChange={(e)=>handleOnchange(e)} aria-describedby="emailHelp" placeholder="Enter email" />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group my-2">
                    <label htmlFor="password">Password</label>
                    <input type="password" value={Signup.password} onChange={(e)=>handleOnchange(e)}  className="form-control my-2" id="password" placeholder="Password" />
                </div>
                <div className="form-group my-2">
                    <label htmlFor="confirmpassword">Confirm Password</label>
                    <input type="confirmpassword" value={Signup.confirmpassword} onChange={(e)=>handleOnchange(e)}  className="form-control my-2" id="confirmpassword" placeholder="Password" />
                </div>

                <button  className={ "btn btn-primary my-2"+( Signup.email!=="" && Signup.password===Signup.confirmpassword ? "":" disabled")} onClick={(e)=>{handleOnclick(e)}}>Submit</button>
            </form>
        </div>
    )
}
