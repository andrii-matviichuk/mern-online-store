import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Row, Col, Button, Form } from 'react-bootstrap';
import Message from '../components/Message';
import FormContainer from '../components/FormContainer';
import { login } from '../actions/userActions';

function LoginScreen() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  //dispatch(login('andrew@example.com', 'test1234'));
  const submitHandler = () => {};
  return (
    <FormContainer>
      <h1>Login</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="andrew@example.com"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="test1234"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          ></Form.Control>
        </Form.Group>
      </Form>
    </FormContainer>
  );
}

export default LoginScreen;
