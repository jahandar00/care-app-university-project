import React, { useEffect, useState } from 'react'
import "./pin.scss"
import { Link } from 'react-router-dom'
import { Marker, Popup } from "react-leaflet";
import { singlePostData } from '../../lib/dummydata';

export default function Pin({item}) {
    let link;
    if(item.typeOf == "school") {
        link = "list-school"
    } else if(item.typeOf == "kindergarden") {
        link = "list-kindergarden"
    } else if(item.typeOf == "child") {
        link = "list-child"
    } else if (item.typeOf == "teenager") {
        link = "list-teenager"
    }

    return (
        <Marker position={[item.coordinate[1], item.coordinate[0]]}>
            <Popup>
                <div className="popupContainer">
                <Link to={`/${link}/${item.id}`}><img src={singlePostData.img[0]} alt="" /></Link>
                    <div className="textContainer">
                        <Link to={`/${link}/${item.id}`}><h4>{item.title}</h4></Link>
                        <span>{item.type}</span>
                        <span>{item.plz}, {item.street}</span>
                    </div>
                </div>
            </Popup>
        </Marker>
    )
}
