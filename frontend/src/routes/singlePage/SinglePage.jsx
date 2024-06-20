import React, { useState, useEffect, useContext } from 'react'
import "./singlePage.scss"
import Slider from '../../components/slider/Slider'
import { singlePostData } from '../../lib/dummydata'
import Map from "../../components/map/Map"
import { useLoaderData, useNavigate } from 'react-router-dom'
import { AuthContext } from "../../context/AuthContext"
import axios from "axios"

export default function SinglePage() {
  const post = useLoaderData()
  const [saved, setSaved] = useState(post.isSaved);
  const [distance, setDistance] = useState(null);
  const [error, setError] = useState(null);
  const [saveError, setSaveError] = useState(null)
  const { currentUser } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleSave = async () => {
    //after react 19 update to useoptimistik hook
    setSaved((prev) => !prev);
    if (!currentUser) {
      navigate("/login")
    }
    try {
      await axios.post("http://localhost:8800/api/users/save", { postId: post.id, userId: currentUser.id }, { withCredentials: true });

    } catch (err) {
      setSaved((prev) => !prev);
      setSaveError(err.response.data.message)
    }
  }


  useEffect(() => {
    const handleCalculate = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) {
        setError("User address not found in local storage.");
        return;
      }

      const address = user.street + " " + user.plz;
      const url = 'https://nominatim.openstreetmap.org/search?format=json&q=' + encodeURIComponent(address);
      const currentCoordinate = post.coordinate;

      try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.length > 0) {
          const location = data[0];
          const userCoordinate = { lat: parseFloat(location.lat), lng: parseFloat(location.lon) };
          const distance = haversineDistance(userCoordinate, currentCoordinate);
          setDistance(distance.toFixed(2));
        } else {
          setError("No results found");
        }
      } catch (error) {
        console.error("Error fetching location:", error);
        setError("An error occurred while fetching location data.");
      }
    };

    handleCalculate();
  }, [post]);

  const toRadians = (degrees) => {
    return degrees * (Math.PI / 180);
  };

  const haversineDistance = (coord1, coord2) => {
    const R = 6371; // Radius of the Earth in kilometers
    const lat1 = toRadians(coord1.lat);
    const lon1 = toRadians(coord1.lng);
    const lat2 = toRadians(coord2[1]);
    const lon2 = toRadians(coord2[0]);

    const dLat = lat2 - lat1;
    const dLon = lon2 - lon1;

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1) * Math.cos(lat2) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // Distance in kilometers
  };

  return (
    <div className='singlePage'>
      <div className="details">
        <div className="wrapper">
          <Slider images={singlePostData.img} />
          <div className="info">
            <div className="top">
              <div className="post">
                {post.title && <h1>{post.title}</h1>}

                <div className="address">
                  <img src="/pin.png" alt="" />
                  <span>{post.plz}, {post.street}</span>
                  {post.streetNo && <span>{post.streetNo}</span>}
                  {distance && (
                    <p className='distance'> <b>({distance} km away)</b></p>
                  )}


                </div>
                {post.type && <div className="type">{post.type}</div>}
                {post.sponsor && <div className="type">Sponsored by {post.sponsor}</div>}
              </div>
            </div>
            <div className="bottom">
              <p>Description: {post.description && post.description} </p>
            </div>
          </div>

        </div>
      </div>
      <div className="features">
        <div className="wrapper">
          <p className='title'>General</p>
          <div className="listVertical">
            {post.title &&
              <div className="feature">
                <img src="/title.png" alt="" />
                <div className="featureText">
                  <p>{post.title}</p>
                </div>
              </div>}
            {post.type &&
              <div className="feature">
                <img src="/type.png" alt="" />
                <div className="featureText">
                  <p>{post.type}</p>
                </div>
              </div>}
            {post.description &&
              <div className="feature">
                <img src="/description.png" alt="" />
                <div className="featureText">
                  <p>Description: {post.description}</p>
                </div>
              </div>}
          </div>
          {post.language &&
            <>
              <p className='title'>Languages</p>
              <div className="listVertical">
                <div className="feature">
                  <span>{post.language}</span>
                </div>
              </div>
            </>}
          <p className='title'>Adress and contact</p>
          <div className="listVertical">
            <div className="feature">
              <img src="/pin.png" alt="" />
              <div className="featureText">
                <span>{post.plz}, Chemnitz {post.street}</span>
                {post.streetNo && <span>  {post.streetNo}</span>}
              </div>
            </div>
            {distance &&
              <div className="feature">
                <img src="/distance.png" alt="" />
                <div className="featureText">
                  <span>{distance} km away</span>
                </div>
              </div>}
            {post.website &&
              <div className="feature">
                <img src="/website.png" alt="" />
                <div className="featureText">
                  <p><a href={`https://${post.website}`} target='_blank'>{post.website}</a></p>
                </div>
              </div>}
            {post.email &&
              <div className="feature">
                <img src="/email.png" alt="" />
                <div className="featureText">
                  <p><a href={`mailto:${post.email}`}>{post.email}</a></p>
                </div>
              </div>}
            {post.phoneNumber &&
              <div className="feature">
                <img src="/phone.png" alt="" />
                <div className="featureText">
                  <p>{post.phoneNumber}</p>
                </div>
              </div>}
          </div>
          <p className='title'>Location</p>
          <div className="mapContainer">
            <Map items={post} />
          </div>
          <div className="buttons">
            <button onClick={handleSave} style={{ backgroundColor: saved ? "#fece51" : "white" }}>
              {saved ? "Place Saved" : "Save the Place"}
              <img src="/save.png" alt="" />
            </button>
            {saveError && <div className="error">{saveError}</div>}
          </div>
        </div>
      </div>

    </div>
  )
}
