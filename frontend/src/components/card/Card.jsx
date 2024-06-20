import React, { useEffect, useState } from 'react';
import "./card.scss";
import { Link } from 'react-router-dom';
import { singlePostData } from '../../lib/dummydata';

export default function Card({ item }) {
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
    <div className="card">
      <Link to={`/${link}/${item.id}`} className="imageContainer">
        <img src={singlePostData.img[0]} alt="image" />
      </Link>
      <div className="textContainer">
        {item.title &&
          <h2 className='title'>
            <Link to={`/${link}/${item.id}`}>{item.title}</Link>
          </h2>}
        <p className='address'>
          <img src="/pin.png" alt="" />
          <span>{item.plz}, {item.street}</span>
        </p>
        <p className='type'>{item.type}</p>

        <div className='bottom'>
          <div className="languages">
            {item.language ? (
              <div className='language'>
                <img src="/language.png" alt="Language Icon" />
                <span>{item.language}</span>
              </div>
            ) : null}
          </div>
          <div className="icons">
            
          </div>
        </div>
      </div>
    </div>
  );
}