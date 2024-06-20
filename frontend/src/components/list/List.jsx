import React from 'react'
import Card from "../card/Card"
import { listData } from "../../lib/dummydata.js";
import "./list.scss"

export default function List() {
  return (
    <div className='list'>
        {listData.map(item => (
            <Card key={item.id} item={item}/>
        ))}
    </div>
  )
}
