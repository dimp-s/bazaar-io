import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { Store } from '../Store';
import { toast } from 'react-toastify';
import { getError } from '../utils';

export default function SigninScreen() {
  //for redirection
  const navigate = useNavigate();
  //get current location
  const { search } = useLocation();
  //get url of current location to be redirected to
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  //if it exists save it in redirect as string , if not save redirect URL as home screen
  const redirect = redirectInUrl ? redirectInUrl : '/';

  //create state for current email and password in form
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  //access context of Store.js
  const { state, dispatch: ctxDispatch } = React.useContext(Store);
  const { userInfo } = state;
  //handle form submit
  const submitHandler = async (e) => {
    //prevent page refresh when user clicks sign in
    e.preventDefault();
    try {
      const { data } = await axios.post(`/api/users/signin`, {
        email,
        password,
      });
      //dispatch action to context in Store.js
      ctxDispatch({ type: 'USER_SIGNIN', payload: data });
      localStorage.setItem('userInfo', JSON.stringify(data));
      //redirects to redirect url or homescreen
      navigate(redirect || '/');
    } catch (err) {
      toast.error(getError(err));
    }
  };

  //prevent showing signin screen while user already signed in
  React.useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  return (
    <Container className="small-container">
      <Helmet>
        <title>Sign in</title>
      </Helmet>
      <h1 className="my-3">Sign in</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
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
