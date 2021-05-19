import { useLocation } from 'react-router-dom';

function LoginSuccess() {
  const location = useLocation();

  return <h1>반갑습니다 {location.nickname}</h1>;
}
export default LoginSuccess;
