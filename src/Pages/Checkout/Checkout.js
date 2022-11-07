import React from "react";
import { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../Context/UserContext";

const Checkout = () => {
  const { user } = useContext(AuthContext);
  const product = useLoaderData();
  const { _id, name, price, img } = product;
  const handleOrder = (event) => {
    event.preventDefault();
    const form = event.target;
    const customerName = `${form.firstName.value} ${form.lastName.value}`;
    const phone = form.phone.value;
    const message = form.message.value;
    const order = {
      customerName,
      phone,
      email: user?.email,
      message,
      prodId: _id,
      productName: name,
      price: price,
      status: "Pending",
    };

    fetch("http://localhost:5000/orders", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(order),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          alert("Thank You! Order Placed");
          form.reset();
        }
      });
  };
  return (
    <div>
      <div className="text-2xl flex flex-col justify-center items-center gap-2">
        <h1>Checkout of {name}</h1>
        <p>Price: ${price}</p>
        <img className="h-24 w-24" src={img} alt="" />
      </div>
      <div className="w-[80%] mx-auto my-10">
        <form onSubmit={handleOrder}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 my-5">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              className="input input-bordered w-full "
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              className="input input-bordered w-full "
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone No"
              className="input input-bordered w-full"
            />
            <input
              type="text"
              name="email"
              defaultValue={user?.email}
              className="input input-bordered w-full"
              readOnly
            />
          </div>
          <textarea
            className="textarea textarea-bordered w-full h-32"
            name="message"
            placeholder="Message"
          ></textarea>
          <button type="submit" className="btn btn-info mt-4">
            Place Order
          </button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
