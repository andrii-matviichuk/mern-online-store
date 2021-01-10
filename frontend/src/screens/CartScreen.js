import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from 'react-bootstrap';
import Message from '../components/Message';
import { addCartItem, removeCartItem } from '../actions/cartActions';

function CartScreen({ history }) {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const removeFromCardHandler = (productId) => {
    dispatch(removeCartItem(productId));
  };

  const proceedToCheckoutHandler = () => {
    history.push('/login?redirect=shipping');
  };
  return (
    <Row className="my-4">
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message>
            Your cart is empty <Link to="/"> Go Back </Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroup.Item key={item.productId}>
                <Row>
                  <Col md={2}>
                    <Image
                      src={item.image}
                      alt={`Photo of ${item.name}`}
                      fluid
                      rounded
                    />
                  </Col>
                  <Col md={3}>
                    <Link to={`/products/${item.productId}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>{item.price} $</Col>
                  <Col md={2}>
                    <Form.Control
                      as="select"
                      value={item.quantity}
                      onChange={(e) =>
                        dispatch(addCartItem(item.productId, +e.target.value))
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((el) => (
                        <option key={el + 1} value={el + 1}>
                          {el + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button
                      type="button"
                      variant="dark"
                      onClick={() => removeFromCardHandler(item.productId)}
                    >
                      <i className="fas fa-trash" />
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item className="py-4">
              <h3 className="py-2">
                SUBTOTAL (
                {cartItems.reduce((acc, val) => acc + val.quantity, 0)}) ITEMS
              </h3>
              {cartItems
                .reduce((acc, val) => acc + val.quantity * val.price, 0.0)
                .toFixed(2)}{' '}
              $
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                className="btn-block"
                type="button"
                disabled={cartItems.length === 0}
                onClick={proceedToCheckoutHandler}
              >
                Proceed to checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
}

export default CartScreen;
