import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/BeforeLogin.css";
import { UserContext } from "../App";

function BeforeLogin() {
  const navigate = useNavigate();
  const user = useContext(UserContext);
  if (user.isLogin) navigate("/myteam");

  function goOauth() {
    window.location.href =
      "https://auth.bssm.kro.kr/oauth?clientId=4edf448e&redirectURI=http://localhost:3000/api/user/oauth/bsm";
  }
  return (
    <div className={"root-div"}>
      <header>
        <nav className={"container"}>
          <div>
            <img
              src={"images/tcpicon2.png"}
              className="nav--logo"
              onClick={() => navigate("/")}
              alt={"profile"}
            />
          </div>
          <div className={"container--div"}>
            <img
              src={"images/person.png"}
              className={"nav--personImg"}
              alt={"profile"}
            />
            <p className={"nav--p"}>no account</p>
          </div>
        </nav>
      </header>
      <section className={"beforeLogin--section"}>
        <div className={"section--left"}>
          <div className={"section--div"}>
            <img
              className={"section--div--title"}
              src={"images/black_tcpicon.png"}
              alt={"profile"}
            ></img>
            <p className={"section--div--subtitle"}>
              {" "}
              : Team Cooperation Platform
            </p>
          </div>
          <div className={"section--div2"}>
            <p className={"section--div2--p"}>
              ✔ 함께 아이디어를 공유할 수 있는 드로잉 기능 제공
            </p>
            <p className={"section--div2--p"}>
              ✔ 코드 공유방을 통한 실시간 코드 피드백 기능 사용
            </p>
            <p className={"section--div2--p"}>
              ✔ 아이디어 공유를 통해 빠른 브레인스토밍
            </p>
            <h2>이 모든 것을 한번에</h2>
          </div>
        </div>
        <div className={"section--right"}>
          <div className={"section--right--div"}>
            <h2 className={"section--right--div--h2"}>시작하기</h2>
            <button className={"section--right--div--button"} onClick={goOauth}>
              <img
                src={"images/bsmicon.png"}
                className={"bsmImg"}
                alt={"profile"}
              />
              <span>Continue with BSM</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
export default BeforeLogin;
