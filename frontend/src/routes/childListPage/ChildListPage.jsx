import React, { useEffect, useState } from 'react';
import "./childListPage.scss"
import { listData } from '../../lib/dummydata';
import Map from '../../components/map/Map';
import Card from '../../components/card/Card';

export default function ChildListPage() {

    const [data, setData] = useState({})
    async function fetchData() {
        const response = await fetch('http://localhost:8800/api/posts/social-child');
        const res_data = await response.json();
        setData(res_data);            
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className='listPage'>
            <div className="listContainer">
                <div className="wrapper">
                    {Object.entries(data).map(([key, item]) => (
                        <Card key={key} item={item} />
                    ))} 
                </div>
            </div>
            <div className="mapContainer">
                <Map items={Object.entries(data)} />
            </div>
        </div>
    )
}
