import React from 'react'
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "./map.scss"
import "leaflet/dist/leaflet.css"
import Pin from '../pin/Pin';

export default function Map({ items }) {

    const isIterable = (obj) => {
        // Check if obj is not null and is iterable
        return obj != null && typeof obj[Symbol.iterator] === 'function';
    };

    

    return (
        <MapContainer center={[50.8127634464818, 12.8942128969262]} zoom={11} scrollWheelZoom={true} className='map'>
            <TileLayer
                attribution='&copy; '
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {isIterable(items) ? (
                items.map(([key, item]) => (
                    <Pin item={item} key={key} />
                ))
            ) : <Pin item={items} />}
        </MapContainer>
    )
}
