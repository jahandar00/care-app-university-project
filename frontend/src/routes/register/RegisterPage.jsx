import React, { useState } from 'react'
import "./registerPage.scss"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"

export default function RegisterPage() {

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    const formData = new FormData(e.target);

    const username = formData.get("username")
    const email = formData.get("email")
    const street = formData.get("street")
    const plz = formData.get("plz")
    const password = formData.get("password")


    try{
      const res = await axios.post("http://localhost:8800/api/auth/register", {
        username, email, street, plz, password 
      })

      navigate("/login");
    } catch(err) {
      console.log(err)
      setError(err.response.data.message)
    } finally {
      setIsLoading(false)
    }

  }
  return (
    <div className='registerPage'>
      <div className="register">
        <form onSubmit={handleSubmit} className='form'>
          <span>Create an Account</span>
          <input name='username' placeholder='Username' type="text" />
          <input name='email' placeholder='Email' type="email" />
          <input name='street' placeholder='Street and house number' type="text" />
          <input name='plz' placeholder='Postal Code' type="text" />
          <input name='password' placeholder='Password' type="password" />
          <button disabled={isLoading}>Sign up</button>
          {error && <span style={{color: "red", fontSize: "16px"}}> {error}</span>}
          <Link to="/login" style={{color: "#277BE9"}}>Do you have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="bg.png" alt="" />
      </div>
    </div>
  )
}
