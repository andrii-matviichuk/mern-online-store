import { useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { getProductList } from '../actions/productActions';

function HomeScreen() {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { products, loading, error } = productList;

  useEffect(() => {
    dispatch(getProductList());
  }, [dispatch]);

  return (
    <>
      <h1>Latest products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger" children={error} />
      ) : (
        <Row>
          {products.map((prod) => (
            <Col key={prod._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={prod} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
}

export default HomeScreen;
