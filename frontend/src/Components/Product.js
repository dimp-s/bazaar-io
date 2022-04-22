import React from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Rating from './Rating';
export default function Product(props) {
  const { product } = props;
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
        <Button>Add To Cart</Button>
      </Card.Body>
    </Card>
  );
}
