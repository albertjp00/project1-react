    import React, { useState } from 'react'
    import axios from 'axios'
    import {toast } from 'react-hot-toast'
    import { useNavigate } from 'react-router-dom'
    import '../css/login.css'

    export default function Login() {

        const navigate = useNavigate()


        const [data,setData] = useState({
            email:'',
            password:''
        })

        const LoginUser = async (e) => {
            e.preventDefault()

            console.log("hello");
            const {email,password} = data
            try {
                const { data } = await axios.post('/login', { 
                    email, password }, 
                    { withCredentials: true });


                if(data.error){
                    toast.error(data.error)
                }else{
                    setData({ email: '', password: '' })
                    console.log("navigate to dashboard");
                    
                    navigate('/login')
                }
                // console.log('Response:', response.data); // This should log "test is working"
            } catch (error) {
                console.error('Error:', error);
            }
        };
        

        return (
            <div className="form-container">
              <form onSubmit={LoginUser}>
                <label>Email</label>
                <input type='text' placeholder='Enter Email' value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} />
        
                <label>Password</label>
                <input type='password' placeholder='Enter Password' value={data.password} onChange={(e) => setData({ ...data, password: e.target.value })} />
        
                <button type='submit'>Submit</button>
              </form>
            </div>
          )
    }
