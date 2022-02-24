import React from 'react';
import {useState,useEffect} from 'react'
import {FaSignInAlt} from 'react-icons/fa'



function Login() {

    const [formData,setFormData] = useState({
        email:'',
        password:'',
    })

    const {email,password} = formData

    const onChange = (e) => {
        setFormData((prevState) =>({
            ...prevState,
            [e.target.name]:e.target.value
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()
    }

     return(
        <>
            <section>
                <h1><FaSignInAlt/> Login</h1>
                <p>Login and start saving movies</p>
            </section>
            <section className="form">
            
                <div className="form-group">
                    <form>
                        <input type="email" ClassName="form-control" id="email" name="email" value = {email} placeholder="Enter your email" onChange={onChange}></input>
                    </form>
                </div>

                <div className="form-group">
                    <form>
                        <input type="password" ClassName="form-control" id="password" name="password" value = {password} placeholder="Enter your password" onChange={onChange}></input>
                    </form>
                </div>
                
                <div className="form-group">
                    <button className="btn btn-block">Submit</button>
                </div>
            </section>
        </>
    )
}

export default Login