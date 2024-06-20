import React, { useContext, useEffect, useState } from 'react'
import List from '../../components/list/List'
import "./profilePage.scss"
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import { AuthContext } from "../../context/AuthContext"
import Card from '../../components/card/Card'

export default function ProfilePage() {
  const { updateUser, currentUser } = useContext(AuthContext);
  const [item, setItem] = useState([])

  useEffect(() => {
    let isMounted = true; // To prevent setting state on unmounted component

    const handleSavedFetch = async () => {
      try {
        const res = await axios.get("http://localhost:8800/api/posts/savedPosts", {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if (isMounted) { 
          // Check if the component is still mounted before setting state
          setItem(res.data[0]?.post || null);
          console.log(res.data[0]?.post || null);
        }
      } catch (error) {
        console.error(error);
      }
    };

    handleSavedFetch();

    return () => {
      isMounted = false; // Clean up function to mark component as unmounted
    };
  }, []);

  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate("/login")
    }
  }, [currentUser, navigate])

  const handleLogout = async () => {

    try {
      await axios.post("http://localhost:8800/api/auth/logout");

      updateUser(null)

      navigate('/')

    } catch (err) {
      console.log(err)
    }
  }

  const HandleDeleteWindow = () => {
    setDeleteUser((prev) => !prev)
  }

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8800/api/users/${currentUser.id}`, {
        withCredentials: true
      })
      updateUser(null)
      navigate("/")
    } catch (err) {
      console.log(err)
    }
  }
  return (
    currentUser && (
      <div className='profilePage'>
        <div className="details">
          <div className="wrapper">
            <div className="title">
              <h1>User Information</h1>
              <Link to="/profile/update">
                <button>Update Profile</button>
              </Link>
            </div>
            <div className="info">
              <span><img src={currentUser.avatar || "/noavatar.png"} alt="" /></span>
              <span>Username: <b>{currentUser.username}</b></span>
              <span>email: <b>{currentUser.email}</b></span>
              <span>Address: <b>{currentUser.plz}, {currentUser.street}</b></span>
              <button onClick={handleLogout}>Log out</button>
              <div className="deleteDiv">
                <button className="delete" onClick={handleDelete}>Delete Account</button>
              </div>
            </div>
            <div className="title">
            </div>
            <div className="title">
              <h1>Saved Posts</h1>
            </div>
            {item ? (
              <Card item={item} />
            ) : (
              <p>Currently you have not saved any post.</p>
            )}
          </div>
        </div>
        <div className="rightContainer">
          <div className="wrapper"></div>
        </div>
      </div>)
  )
}
