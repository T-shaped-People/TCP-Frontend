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
              ✔ Todo, Calendar를 이용한 체계적인 프로젝트 관리
            </p>
            <p className={"section--div2--p"}>
              ✔ 팀원들과 함께하는 영상 통화, 채팅
            </p>
            <p className={"section--div2--p"}>
              ✔ 프로젝트를 함께 할 팀원들을 모집하는 기능
            </p>
            <h2>
              이 모든 것을 한 번에
            </h2>
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
