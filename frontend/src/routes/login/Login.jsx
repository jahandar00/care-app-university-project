import React, { useContext, useState } from 'react'
import "./login.scss"
import { Link, useNavigate } from "react-router-dom"
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

export default function Login() {

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false)

  const {updateUser} = useContext(AuthContext);

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    const formData = new FormData(e.target);

    const username = formData.get("username")
    const password = formData.get("password")
    

    try {
      const res = await axios.post("http://localhost:8800/api/auth/login", {
        username,
        password
      }, {
        withCredentials: true 
    })
      updateUser(res.data);

      navigate("/");
    } catch (err) {
      console.log(err)
      setError(err.response.data.message)
    } finally {
      setIsLoading(false)
    }

  }
  return (
    <div className='loginPage'>
      <div className="login">
        <form className="wrapper" onSubmit={handleSubmit}>
          <span>Log into your account</span>
          <input name='username' placeholder='Username' type="text" />
          <input name='password' placeholder='Password' type="password" />
          <button disabled={isLoading}>Sign in</button>
          {error && <span>{error}</span>}
          <Link to="/register">Don't you have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="bg.png" alt="" />
      </div>
    </div>
  )
}