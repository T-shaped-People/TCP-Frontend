import '../styleComponents/Login.css'
import {Link, useNavigate} from "react-router-dom";

function Login()
{
    const navigate = useNavigate();
    return(
        <div className={"loginPage"}>
            <fieldset>
                <img src={"images/tcpicon.png"} className={"fieldset--img"} onClick={() => navigate('/')}/>
                <form>
                    <input type={"text"} placeholder={"username"} className={"id"} />
                    <input type={"password"} placeholder={"password"}  className={"pass"}/>
                    <input type={"button"} value={"로그인하기"} className={"button"} />
                </form>
                <br/>
                <br/>
                <br/>
                <br/>
                <div className="bottom-menu">
                    <Link to={"/FindId"} >아이디 찾기</Link>
                    <Link to={"/ChangePass"}>비밀번호 변경</Link>
                    <Link to={"/Signup"}>회원가입</Link>
                </div>
            </fieldset>
        </div>
    )
}
export default Login;
