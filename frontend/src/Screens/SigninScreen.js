import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useLocation } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
export default function SigninScreen() {
  //get current location
  const { search } = useLocation();
  //get url of current location to be redirected to
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  //if it exists save it in redirect as string , if not save redirect URL as home screen
  const redirect = redirectInUrl ? redirectInUrl : '/';
  return (
    <Container className="small-container">
      <Helmet>
        <title>Sign in</title>
      </Helmet>
      <h1 className="my-3">Sign in</h1>
      <Form>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" required />
        </Form.Group>
        <div className="mb-3">
          <Button type="submit">Sign in</Button>
        </div>
        <div>
          New Customer ? {/* redirect link to sign up if user doesnt exist*/}
          <Link to={`/signup?redirect=${redirect}`}>Create an Account</Link>
        </div>
      </Form>
    </Container>
  );
}
