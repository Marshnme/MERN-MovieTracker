import React from 'react';
import {useState,useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify'
import {FaUser} from 'react-icons/fa'
function Register() {

    const [formData,setFormData] = useState({
        name:'',
        email:'',
        password:'',
        password2:''
    })

    const {name,email,password,password2} = formData

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
                <h1><FaUser/> User</h1>
                <p>Please create an account</p>
            </section>
            <section className="form">
                <div className="form-group">
                    <form onSubmit={onSubmit}>
                        <input type="text" ClassName="form-control" id="name" name="name" value = {name} placeholder="Enter your name" onChange={onChange}></input>
                    </form>
                </div>
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
                    <form>
                        <input type="password" ClassName="form-control" id="password2" name="password2" value = {password2} placeholder="Confirm password" onChange={onChange}></input>
                    </form>
                </div>
                <div className="form-group">
                    <button className="btn btn-block">Submit</button>
                </div>
            </section>
        </>
    )
}

export default Register