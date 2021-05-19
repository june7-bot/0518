import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

function Register() {
  let history = useHistory();
  const [sameId, setSameId] = useState(false);
  const [sameNickname, setSameNickname] = useState(false);
  const [input, setInput] = useState({
    id: '',
    pw: '',
    nickname: '',
  });
  const [pwSame, setpwSame] = useState(true);

  function handleChange(e) {
    const { value, name } = e.target;

    setInput((prev) => {
      return { ...prev, [name]: value };
    });
  }

  function checkPw(e) {
    input.pw === e.target.value ? setpwSame(true) : setpwSame(false);
  }
  function handleSubmit(e) {
    axios
      .post('http://localhost:3001/register', {
        id: input.id,
        pw: input.pw,
        nickname: input.nickname,
      })
      .then(function (res) {
        if (res.data.result === 'duplicateId') setSameId(true);
        else if (res.data.result === 'duplicateNickname') setSameNickname(true);
        else history.push({ pathname: '/success', nickname: res.data });
      })
      .catch(function (error) {
        console.log(error);
      });
    e.preventDefault();
  }

  return (
    <div className="container">
      <form method="POST">
        <input
          onChange={handleChange}
          name="id"
          type="text"
          placeholder="아이디"
        />
        {sameId && <p className="warning">이미 등록된 아이디입니다.</p>}
        <input
          onChange={handleChange}
          name="nickname"
          type="text"
          placeholder="닉네임"
        />
        {sameNickname && <p className="warning">이미 등록된 닉네임입니다.</p>}
        <input
          onChange={handleChange}
          name="pw"
          type="password"
          placeholder="비밀번호"
        />
        <input
          onChange={checkPw}
          name="pwck"
          type="password"
          placeholder="비밀번호 확인"
        />
        {pwSame ? null : <p className="warning">비밀번호 일치하지않습니다.</p>}
        <button type="submit" onClick={handleSubmit}>
          가입하기
        </button>
      </form>
    </div>
  );
}
export default Register;
