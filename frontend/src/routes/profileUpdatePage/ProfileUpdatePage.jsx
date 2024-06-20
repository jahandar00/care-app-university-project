import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import "./profileUpdatePage.scss"
import { AuthContext } from '../../context/AuthContext';
import axios from "axios"
import apiRequest from '../../lib/apiRequests.js';

export default function ProfileUpdatePage() {
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const { currentUser, updateUser } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault()

        const formData = new FormData(e.target)

        const { username, email, password, street, plz } = Object.fromEntries(formData);

        try {
            const res = await axios.put(`http://localhost:8800/api/users/${currentUser.id}`, {
                username,
                email,
                password,
                street,
                plz
            }, {
                withCredentials: true, // Ensure cookies are sent with the request
                headers: {
                    'Content-Type': 'application/json'
                  }
            })
            updateUser(res.data);
            navigate("/profile")
        } catch (err) {
            console.log(err)
            setError(err.response.data.message)
        }

    }


    return (
        <div className='profileUpdate'>
            <div className="formContainer">
                <form onSubmit={handleSubmit}>
                    <h1>Update Profile</h1>
                    <div className="item">
                        <label htmlFor="username">Username: </label>
                        <input type="text" name="username" id="username" defaultValue={currentUser.username} />
                    </div>
                    <div className="item">
                        <label htmlFor="email">Email: </label>
                        <input type="email" name="email" id="email" defaultValue={currentUser.email} />
                    </div>
                    <div className="item">
                        <label htmlFor="password">Password: </label>
                        <input type="password" name="password" id="password" />
                    </div>
                    <div className="item">
                        <label htmlFor="street">Street: </label>
                        <input type="text" name="street" id="street" defaultValue={currentUser.street} />
                    </div>
                    <div className="item">
                        <label htmlFor="plz">Plz: </label>
                        <input type="text" name="plz" id="plz" defaultValue={currentUser.plz} />
                    </div>
                    <button>Update</button>
                    {error && <span>{error}</span>}
                </form>
            </div>
            <div className="sideContainer">
                <img src={currentUser.avatar || "/noavatar.png"} alt="" className='avatar' />
            </div>

        </div>
    )
}
