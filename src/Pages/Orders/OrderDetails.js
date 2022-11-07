import React from "react";
import { useState } from "react";
import { useEffect } from "react";

const OrderDetails = ({
  order,
  index,
  handleDeleteOrder,
  handleUpdateStatus,
}) => {
  const { _id, customerName, phone, prodId, productName, price, status } =
    order;
  const [orderProduct, setOrderProduct] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/product/${prodId}`)
      .then((res) => res.json())
      .then((data) => {
        setOrderProduct(data);
      });
  }, [prodId]);

  return (
    <tr>
      <td>
        <div className="flex items-center space-x-3">
          <div>
            <div className="font-bold">{index + 1}</div>
          </div>
        </div>
      </td>
      <td className="flex gap-3">
        <div className="avatar">
          <div className="mask mask-squircle w-12">
            <img src={orderProduct?.img} alt="Avatar Tailwind CSS Component" />
          </div>
        </div>
        <div>
          {productName}
          <br />
          <span className="badge badge-ghost badge-sm">Price: ${price}</span>
        </div>
      </td>
      <td>{status}</td>
      <th className="flex gap-2">
        <button
          className="btn btn-outline btn-success"
          onClick={() => handleUpdateStatus(_id)}
        >
          Confirm
        </button>
        <button
          className="btn btn-error"
          onClick={() => handleDeleteOrder(_id)}
        >
          Delete
        </button>
      </th>
    </tr>
  );
};

export default OrderDetails;
