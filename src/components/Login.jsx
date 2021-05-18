
function Login(){
    return (
    <div className = "container">
    <form action="">
        <input name="id"  type="text" placeholder = "아이디"/>
        <input name="pw"  type="text" placeholder = "비밀번호"/>
        <button>로그인</button>    
    </form>
    <a href="/register">회원가입</a> 
    </div>
    );
}
export default Login;