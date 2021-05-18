import { useState } from 'react';

const axios = require('axios');
function Register(){
    const [ input , setInput ] = useState({
        id : "",
        pw : "",
        nickname : ""
    })
    const [ pwSame , setpwSame ] = useState(true);

    function handleChange(e){
        const { value, name } = e.target;
        
        setInput( prev => {
            return ({...prev , [name] : value});
        })
    }

    function checkPw(e){
        input.pw === e.target.value ? setpwSame(true) :setpwSame(false); 
    }
    function handleSubmit(e){
        axios.post('http://localhost:3001/register',
            {   
                id : input.id , 
                pw: input.pw,
                nickname : input.nickname
        }).then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
        e.preventDefault();
    }

    return (
    <div className = "container">
    <form>
        <input onChange = { handleChange} name="id"  type="text" placeholder = "아이디"/>
        <input onChange = { handleChange} name="nickname"  type="text"placeholder = "닉네임" />
        <input onChange = { handleChange} name="pw"  type="password" placeholder = "비밀번호"/>
        <input onChange = { checkPw} name="pwck"  type="password" placeholder = "비밀번호 확인"/>
        { pwSame ? null : <p className = "pwdCk">비밀번호 일치하지않습니다.</p>}
        <button type = "submit" onClick = { handleSubmit }>가입하기</button>   
    </form>
    </div>
    );
}
export default Register;