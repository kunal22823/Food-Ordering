import React from "react";
import "./Orders.css";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { assets } from "../../assets/assets";

const Orders = () => {
  const url = "http://localhost:4000";
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    const response = await axios.get(url + "/api/order/list");
    if (response.data.success) {
      setOrders(response.data.data);
      console.log(response.data.data);
    } else {
      toast.error("Error");
    }
  };

  const statusHadler = async (event,orderId) => {
    const response = await axios.post(url+"/api/order/status",{orderId,status:event.target.value});
    if(response.data.success){
      await fetchAllOrders();
    }
  }


  useEffect(() => {
    fetchAllOrders();
  }, []);
  
  return (
    <div className="order add">
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.map((order, index) => {
          return (
            <div key={index} className="order-item">
              <img src={assets.parcel_icon} alt="parcel icon" />
              <div>
                <p className="order-item-food">
                  {order.items.map((item,index) => {
                    return (
                      item.name +" x " +item.quantity + (index === order.items.length - 1 ? "" : ", ")
                    );
                  })}
                </p>
                <p className="order-item-name">
                  {order.address.firstname+" "+order.address.lastname}
                </p>
                <div className="order-item-address">
                  <p>{order.address.street+", "}</p>
                  <p>{order.address.city+", "+order.address.state+", "+order.address.country+", "+order.address.zipcode}</p>
                </div>
                <p className="order-item-phone">{order.address.phone}</p>
              </div>
              <p>Items: {order.items.length}</p>
              <p>₹ {order.amount}</p>
              <select onChange={(event)=>statusHadler(event,order._id)} value={order.status}>
                <option value="Food Processing">Food Processing</option>
                <option value="Out For Delivery">Out For Delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Orders;
