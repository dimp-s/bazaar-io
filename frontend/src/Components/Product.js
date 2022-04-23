import React from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Rating from './Rating';
import axios from 'axios';
import { Store } from '../Store';
export default function Product(props) {
  const { product } = props;

  //for updating cart in homescreen
  const { state, dispatch: ctxDispatch } = React.useContext(Store);
  //create new object and save to current cart state
  const {
    cart: { cartItems },
  } = state;
  const addToCartHandler = async (item) => {
    //check if item is in stock
    const existItem = cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.countInStock < quantity) {
      window.alert('Sorry. Product out of stock');
      return;
    }
    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...item, quantity },
    });
  };
  return (
    <Card>
      {/* Link prevents page refreshes when clicking on product link */}
      <Link to={`/product/${product.slug}`}>
        <img src={product.image} alt={product.name} className="card-img-top" />
      </Link>
      <Card.Body>
        <Link to={`/product/${product.slug}`}>
          <Card.Title>{product.name}</Card.Title>
        </Link>
        <Rating rating={product.rating} numReviews={product.numReviews} />
        <Card.Text>
          <strong>Rs</strong>
          {product.price}
        </Card.Text>
        {product.countInStock === 0 ? (
          <Button disabled variant="light">
            Out of Stock
          </Button>
        ) : (
          <Button onClick={() => addToCartHandler(product)}>Add To Cart</Button>
        )}
      </Card.Body>
    </Card>
  );
}
