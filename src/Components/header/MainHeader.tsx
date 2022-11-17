import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/header/base.css";
import { UserContext } from "../../App";

const MainHeader = () => {
  const navigate = useNavigate();
  const user = useContext(UserContext);
  // if (!user.isLogin) navigate("/");
  return (
    <header className="main_header">
      <nav>
        <div className="nav--left rows">
          <div className="nav--menus rows">
            <img
              src="/images/tcpicon2.png"
              className="nav--logo"
              alt="icon"
              onClick={() => {
                if (user.isLogin) navigate("/myteam");
                else navigate("/");
              }}
            />
          </div>
          <div className="rows">
            <Link to="/community" className="nav--link">
              팀원 모집
            </Link>
            <Link to="/myteam" className="nav--link">
              나의 팀
            </Link>
            <Link to="/maketeam" className="nav--link">
              팀 만들기
            </Link>
          </div>
        </div>
        <div className="nav--right">
          <span className="header--username">{user.nickname}</span>
        </div>
      </nav>
    </header>
  );
};

export default MainHeader;
