    import React, { useState } from 'react'
    import axios from 'axios'
    import {toast } from 'react-hot-toast'
    import { useNavigate } from 'react-router-dom'

    export default function Register() {

        const navigate =  useNavigate()
        const [data,setData] = useState({
            name:'',
            email:'',
            password:''
        })

        const registerUser = async (e) =>{
            e.preventDefault()
            console.log("in register");
            
            const {name,email,password} = data
            try {
                const {data} = await axios.post('http://localhost:5000/register',{
                    name,email,password
                })
                if(data.error){
                    toast.error(data.error)
                }else{
                    setData({})
                    toast.success('Login Succesfull. Welcome!')
                    navigate('http://localhost:5000/login')
                }
            } catch (error) {
                console.log(error);
                
            }
        }

    return (
        <div>
        <form onSubmit={registerUser}>
            <label>Name</label>
            <input type='text' placeholder='Enter Name'  value={data.name} onChange={(e) =>setData({...data,name:e.target.value})}/>
            <label>Email</label>
            <input type='text' placeholder='Enter Email' value={data.email} onChange={(e) =>setData({...data,email:e.target.value})}/>
            <label>Password</label>
            <input type='password' placeholder='Enter Password' value={data.password} onChange={(e) =>setData({...data,password:e.target.value})}/>
            <button type='submit'>Submit</button>
        </form>
        </div>
    )
    }
