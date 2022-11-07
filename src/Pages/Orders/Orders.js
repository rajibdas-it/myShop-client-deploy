import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../../Context/UserContext";
import OrderDetails from "./OrderDetails";

const Orders = () => {
  const { user, logOut } = useContext(AuthContext);
  const [storedOrders, setStoredOrders] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/orders?email=${user?.email}`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("user-token")}`,
      },
    })
      .then((res) => {
        if (res.status === 401 || res.req === 403) {
          return logOut();
        }
        return res.json();
      })
      .then((data) => setStoredOrders(data));
  }, [user?.email, logOut]);

  const handleDeleteOrder = (id) => {
    fetch(`http://localhost:5000/orders/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          alert("Item deleted from your list");
          const remainingOrders = storedOrders.filter((ord) => ord._id !== id);
          setStoredOrders(remainingOrders);
        }
      });
  };

  const handleUpdateStatus = (id) => {
    fetch(`http://localhost:5000/orders/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ status: "Approved" }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          const remainingOrders = storedOrders.filter((ord) => ord._id !== id);
          const approvingOrders = storedOrders.find((ord) => ord._id === id);
          approvingOrders.status = "Approved";
          const newOrders = [...remainingOrders, approvingOrders];
          setStoredOrders(newOrders);
        }
      });
  };

  return (
    <div className="w-[80%] mx-auto">
      <div className="text-2xl text-center my-5">
        <h1>Your Orders List</h1>
      </div>
      <div>
        <div className="overflow-x-auto w-full">
          <table className="table w-full">
            <thead>
              <tr>
                <th>SL No.</th>
                <th>Product Details</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {storedOrders.map((order, index) => (
                <OrderDetails
                  key={order._id}
                  order={order}
                  index={index}
                  handleDeleteOrder={handleDeleteOrder}
                  handleUpdateStatus={handleUpdateStatus}
                ></OrderDetails>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Orders;
