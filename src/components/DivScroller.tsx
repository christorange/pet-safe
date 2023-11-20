import React, {useEffect, useState} from 'react'
import InfiniteScroll from './InfiniteScroll'
import {delay} from './utils'
import {Arrow} from '../assets/icons/Arrow';
import {Star} from '../assets/icons/Star';
import logo from "../assets/park9.png";
import '../components/distance.css';
let counter = 0

const DivScroller = () => {
  const [items, setItems] = useState<string[]>([]);

  const fetchMore = async () => {
    await delay(async () => {
      const newItems = []

      for (let i = counter; i < counter + 10; i++) {
        newItems.push(
        <div className="card w-96 card-compact  --ion-color-success shadow-xl border-8 border-white">
        <figure><img src={logo} alt="Can't load" /></figure>
        <div className="card-body" >
          <h2 className="card-title">Park9</h2>
          <p>Daycare/Dog Park/ Bar</p>
          <h2 className="card-title"><Star/><Star/><Star/><Star/><Star/></h2>
          <div className="card-actions justify-end">
            <button><Arrow/></button>
           
          </div>
          </div>
      </div> )
      }
      setItems([...items, ...newItems])

      counter += 10
    })
  }

  useEffect(() => {
    fetchMore().then()
  }, [])

  return (
    <div style={{right: 0,height: 802, width: 393,overflow: 'auto'}}>
      <InfiniteScroll
        useWindow={false}
        threshold={50}
        loadMore={fetchMore}
        loader={<div className="loader" key={0}>Loading ...</div>}
      >
        {items.map(item => <div key={item}>{item}</div>)}
      </InfiniteScroll>
    </div>
  )
}

export default DivScroller