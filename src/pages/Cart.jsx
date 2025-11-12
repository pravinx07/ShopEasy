// import React, { useContext } from 'react'
import Loading from "../components/Loading";
import { useCart } from "../context/CartContext";
import Checkout from "../pages/Checkout"
import { Link } from "react-router-dom";
const Cart = () => {
  const { items, increaseQty, decreaseQty, removeItem } = useCart();
  // console.log(items);

  // const [qty, setQty] = useState(cart.items.qty);
  // console.log(cart);

  // const addQuantity = () => {
  //   setQty(cart.items.qty+1)
  // }

  const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);

  if (items === 0) return <Loading />;
  return (
    <div className="cart ">
      <h1 className="text-center m-4 text-3xl font-semibold">Cart Page</h1>
      {items &&
        items.map((item) => (
          <li key={item.id} className="border ">
            {/* {item.title} - ${item.price} */}
            <div className="flex border border-gray-400 p-3 rounded-lg m-2 items-center gap-4">
              <img
                src={item.thumbnail}
                alt={item.title}
                className="w-20 h-20 object-cover rounded-md"
              />

              <div className="flex-1">
                <h3 className="font-semibold text-lg">{item.title}</h3>
                <p className="text-gray-600">
                  Availability: {item.availabilityStatus}
                </p>
              </div>

              <button
                onClick={() => removeItem(item.id)}
                className="btn btn-sm btn-error ml-2"
              >
                X
              </button>
              <div className="text-center">
                <p className="font-bold">${item.price}</p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => decreaseQty(item.id)}
                    className="btn btn-sm btn-outline"
                  >
                    -
                  </button>
                  <span className="font-semibold">{item.qty}</span>
                  <button
                    onClick={() => increaseQty(item.id)}
                    className="btn btn-sm btn-outline"
                  >
                    +
                  </button>
                </div>
              </div>

              <p className="font-semibold text-green-700">
                ${(item.price * item.qty).toFixed(2)}
              </p>
            </div>
          </li>
        ))}

      <div className="flex flex-col jsutify-center items-center m-2 p-3">
        <h3 className="text-xl font-bold  m-2 ">
          Grand Total: {total.toFixed(2)}
        </h3>
        <Link to="/checkout" element={<Checkout/>}><button className="bg-blue-600 px-4 py-3 rounded-lg font-bold cursor-pointer hover:bg-blue-700 justify-center items-center">
          Checkout
        </button></Link>
      </div>
    </div>
  );
};

export default Cart;
