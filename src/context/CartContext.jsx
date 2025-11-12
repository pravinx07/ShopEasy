import { createContext, useContext, useEffect, useState } from "react";

export const CartContext = createContext(null);

// custom hook
export const useCart = () => {
  const cart = useContext(CartContext);
  return cart;
};

export const CartProvider = (props) => {
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem("cart");
      return saved ? JSON.parse(saved) : [];
    } catch (err) {
      console.error("Cart parse error:", err);
      localStorage.removeItem("cart");
      return [];
    }
  });

  //  2. Save to localStorage whenever cart updates
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  const addToCart = (product) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }

      return [...prev, { ...product, qty: 1 }];
    });
  };

  const increaseQty = (id) => {
     setItems((prev)=>
    prev.map((item)=>
    item.id === id ? {...item, qty:item.qty+1}:item)
    )
  }

  const decreaseQty = (id) => {
    setItems((prev)=>
    prev.map((item)=>
    item.id === id ? {...item ,qty:item.qty - 1}:item).filter((item)=>item.qty>0)
    )
  }

  const removeItem = (id) => {
    setItems((prev) => prev.filter((item)=>item.id !== id))
  }
  return (
    <CartContext.Provider value={{ items, addToCart, increaseQty, decreaseQty, removeItem }}>
      {props.children}
    </CartContext.Provider>
  );
};
