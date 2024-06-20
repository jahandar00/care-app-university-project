import React, { useContext, useState } from 'react';
import "./navbar.scss";
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const { currentUser } = useContext(AuthContext);


  return (
    <nav>
      <div className="left">
        <Link href='/' className='logo'>
          <img src="/logo.png" alt="" />
          <span>edumap</span>
        </Link>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <li className="nav-item youth-service">
          <Link href="#">Youth Service</Link>
          <div className="youth-projects">
            <a href="/list-school">Schools</a>
            <a href="/list-kindergarden">Kindergarten</a>
            <a href="/list-child">Childreen</a>
            <a href="/list-teenager">Teenagers</a>
          </div>
        </li>
      </div>
      <div className="right">
      {currentUser ? (
          <div className="user">
            <a href="/profile" className='a-none'><img src={currentUser.avatar || "/noavatar.png"} alt="" /></a>
            <span>{currentUser.username}</span>
            <Link to="/profile" className='profile'>
              <span>Profile</span>
            </Link>
          </div>
        ) : (
          <>
            <a href="/login">Sign in</a>
            <a href="/register" className='register'>Sign up</a>
          </>
        )

        }
        <div className="menuIcon">
          <img src="/menu.png" alt="" className={open ? 'menu-img menu-img-active' : 'menu-img'} onClick={() => setOpen((prev) => !prev)} />
        </div>
        <div className={open ? "menu active" : "menu"}>
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/list-school">Schools</a>
          <a href="/list-kindergarden">Kindergarten</a>
          <a href="/list-child">Childreen</a>
          <a href="/list-teenager">Teenagers</a>
          <hr style={{ width: "150px" }} />


          {currentUser ? (
          <div className="user-right">
            <a href="/profile" className='profile-right'>
              <span>Profile</span>
            </a>
          </div>
        ) : (
          <>
            <a href="/login">Sign in</a>
            <a href="/register" className='register-right'>Sign up</a>
          </>
        )

        }
        </div>
      </div>
    </nav>
  )
}
