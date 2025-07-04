import React from 'react'
import './FoodDisplay.css'
import { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext'
import FoodItemCard from '../FoodItem/FoodItemCard'
const FoodDisplay = ({category}) => {
  
    const {food_list} = useContext(StoreContext);
    
    return (
    <div className='food-display' id='food-display'>
      <h2>Top Dishes Near You !</h2>
      <div className="food-display-list">
        {food_list.map((item,index)=>{
            if (category=== "All" || category===item.category) {
                return <FoodItemCard key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image}/>
            }
        })}
      </div>
    </div>
  )
}

export default FoodDisplay
