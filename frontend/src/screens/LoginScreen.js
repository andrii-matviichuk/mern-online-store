import { useDispatch } from 'react-redux';
import { login } from '../actions/userActions';

function LoginScreen() {
  const dispatch = useDispatch();
  dispatch(login('andrew@example.com', 'test1234'));
  return (
    <div>
      <h1>KUU</h1>
    </div>
  );
}

export default LoginScreen;
