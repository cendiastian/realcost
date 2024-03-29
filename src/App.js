import React, { useState, useEffect, useRef } from "react";
import { commerce } from "./lib/commerce";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Products, Navbar, Cart, Banner, Checkout } from "./compunents";

const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  //   const [totalCart, setTotalCart] = useState({});
  const [order, setOrder] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const refProduct = useRef(null);

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();
    setProducts(data);
  };

  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve());
    // setTotalCart(await commerce.cart.retrieve());
  };
  //   const fetchTotalCart = async () => {
  //     // setCart(await commerce.cart.retrieve());
  //     setTotalCart(await commerce.cart.retrieve());
  //   };

  const handleAddToCart = async (productId, quantity) => {
    const { cart } = await commerce.cart.add(productId, quantity);
    setCart(cart);
  };
  const handleUpdateCartQty = async (productId, quantity) => {
    const { cart } = await commerce.cart.update(productId, { quantity });
    setCart(cart);
  };
  const handleRemoveFromCart = async (productId, quantity) => {
    const { cart } = await commerce.cart.remove(productId, { quantity });
    setCart(cart);
  };
  const handleEmptyCart = async () => {
    const { cart } = await commerce.cart.empty();
    setCart(cart);
  };
  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh();
    setCart(newCart);
  };

  const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
    try {
      const incomingOrder = await commerce.checkout.capture(
        checkoutTokenId,
        newOrder
      );
      setOrder(incomingOrder);
      refreshCart();
    } catch (error) {
      setErrorMessage(error.data.error.message);
    }
  };
  useEffect(() => {
    // console.log("1");
    // fetchTotalCart();
    fetchCart();
  }, [handleAddToCart, handleUpdateCartQty, handleRemoveFromCart]);

  useEffect(() => {
    // console.log("2");
    fetchProducts();
    fetchCart();
  }, []);
  console.log(cart);
  //   console.log(totalCart);
  console.log(products);
  return (
    <Router>
      <div>
        <Navbar totalItems={cart?.total_items} />
        <Switch>
          <Route exact path="/">
            <Banner refProduct={refProduct} />
            <Products
              refProduct={refProduct}
              products={products}
              onAddToCart={handleAddToCart}
            />
          </Route>

          <Route exact path="/cart">
            <Cart
              cart={cart}
              handleUpdateCartQty={handleUpdateCartQty}
              handleRemoveFromCart={handleRemoveFromCart}
              handleEmptyCart={handleEmptyCart}
            />
          </Route>

          <Route exact path="/checkout">
            <Checkout
              cart={cart}
              order={order}
              onCaptureCheckout={handleCaptureCheckout}
              error={errorMessage}
            />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
