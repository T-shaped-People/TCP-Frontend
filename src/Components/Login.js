import '../styleComponents/Login.css'
import {Link} from "react-router-dom";

function Login()
{
    const goHome = () =>{
        // eslint-disable-next-line no-restricted-globals
        history.push('/');
    }
    return(
        <div className={"loginPage"}>
            <fieldset>
                <img src={"images/tcpicon.png"}  onClick={goHome} />
                <form>
                    <input type={"text"} placeholder={"username"} className={"id"} />
                    <input type={"password"} placeholder={"password"}  className={"pass"}/>
                    <input type={"button"} value={"로그인하기"} className={"button"} />
                </form>
                <br/>
                <br/>
                <Link to={"/FindId"} >아이디 찾기</Link>
                <Link to={"/ChangePass"}>비밀번호 변경</Link>
                <Link to={"/Signup"}>회원가입</Link>
            </fieldset>
        </div>
    )
}
export default Login;
