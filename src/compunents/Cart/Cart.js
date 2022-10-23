import React from "react";
import { Container, Typography, Button, Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
import Zoom from "react-reveal/Zoom";
import CartItem from "./CartItem/CartItem";
import useStyle from "./styles";

const Cart = ({
  cart,
  handleUpdateCartQty,
  handleRemoveFromCart,
  handleEmptyCart,
}) => {
  const classes = useStyle();

  const EmptyCart = () => (
    <Typography variant="subtitle1">
      You have no items in your Shopping Cart,
      <Link to="/" className={classes.link}>
        Start Adding some
      </Link>
      !!
    </Typography>
  );
  const FilledCart = () => (
    <>
      <Grid container spacing={3}>
        {cart.line_items.map((item, index) => (
          <Grid item xs={12} sm={6} key={`${item.id}-${index}`}>
            <Zoom big delay={300 * index}>
              <CartItem
                item={item}
                onUpdateCartQty={handleUpdateCartQty}
                onRemoveFromCart={handleRemoveFromCart}
              />
            </Zoom>
          </Grid>
        ))}
      </Grid>
      <div className={classes.cardDetails}>
        <Typography variant="h5" gutterBottom>
          Subtotal: {cart.subtotal.formatted_with_symbol}
        </Typography>
      </div>
      <div className={classes.button}>
        <Button
          className={classes.emptyButton}
          size="large"
          type="button"
          variant="contained"
          color="secondary"
          onClick={handleEmptyCart}
        >
          Empty Cart
        </Button>
        <Button
          className={classes.checkoutButton}
          component={Link}
          to="/checkout"
          size="large"
          type="button"
          variant="contained"
          color="primary"
        >
          Checkout
        </Button>
      </div>
    </>
  );

  if (!cart?.line_items) return "Loading...";

  return (
    <Container>
      <div className={classes.toolbar} />
      <Typography className={classes.title} variant="h3" gutterBottom>
        Your Shopping Cart
      </Typography>
      {!cart.line_items.length ? <EmptyCart /> : <FilledCart />}
    </Container>
  );
};
export default Cart;
