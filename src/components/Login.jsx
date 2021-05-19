import axios from 'axios';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import InputBox from '../segement/Input';
import Warning from '../segement/Warning';
function Login() {
  const [loginCheck, setLoginCheck] = useState(false);
  let history = useHistory();

  const [input, setInput] = useState({
    id: '',
    pw: '',
  });

  function changeInput(data) {
    const { name, value } = data;
    setInput((prev) => {
      return { ...prev, [name]: value };
    });
  }

  function handleOnclick(e) {
    axios
      .post('http://localhost:3001/login', {
        id: input.id,
        pw: input.pw,
      })
      .then(function (res) {
        res.data
          ? history.push({ pathname: '/success', nickname: res.data })
          : setLoginCheck(true);
      })
      .catch(function (error) {
        console.log(error);
      });
    e.preventDefault();
  }

  return (
    <div className="container">
      <form method="POST">
        <InputBox
          change={changeInput}
          name="id"
          type="text"
          placeholder="아이디"
        />
        <InputBox
          change={changeInput}
          name="pw"
          type="password"
          placeholder="비밀번호"
        />
        {loginCheck && (
          <Warning text=" 가입하지 않은 아이디이거나, 잘못된 비밀번호입니다." />
        )}
        <button onClick={handleOnclick}>로그인</button>
      </form>
      <a href="/register">회원가입</a>
    </div>
  );
}
export default Login;
