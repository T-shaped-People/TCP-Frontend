import { MainHeader, JoinTeam } from "../allFiles";
import { useNavigate } from "react-router-dom";
import "../styles/maketeam.css";
import { useState } from "react";

function MakeTeam() {
  const nav = useNavigate();
  const [modal, setModal] = useState(false);
  const onClick = () => {
    setModal((prev) => !prev);
  };
  return (
    <div className="makeTeam-root">
      <MainHeader />
      <div className="maketeam-div">
        <h1 className="maketeam-title">팀 만들기</h1>
        <div className="maketeam-subdiv">
          <p className="maketeam-subtitle">새 프로젝트를 만들어보세요</p>
          <div className="maketeam-thrdiv">
            <button className="maketeam-button" onClick={()=>{ nav('/makeproject') }}>새 프로젝트 만들기</button>
            <li className="maketeam-li">
              <span className="maketeam-other">
                프로젝트에 참여 받은 것이라면?
              </span>
              <span
                className="maketeam-link"
                onClick={() => {
                  setModal(true);
                }}
              >
                새 프로젝트 참여하기
              </span>
            </li>
            {modal && <JoinTeam onClick={onClick} />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MakeTeam;