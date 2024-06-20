import "./layout.scss";
import React, { useContext } from 'react'
import Navbar from "../../components/navbar/Navbar";
import {Outlet} from "react-router-dom"
import { AuthContext } from "../../context/AuthContext";

export default function Layout() {
    return (
        <div className="layout">
            <div className="navbar">
                <Navbar />
            </div>
            <div className="content">
                <Outlet />
            </div>
        </div>
    )
}