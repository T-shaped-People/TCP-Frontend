import React, { useState } from "react";
import "../styles/JoinTeam.css";
import { MainHeader } from "../allFiles";

function JoinTeam({ onClick }: { onClick: any }) {
  const [code, setCode] = useState("");
  return (
    <div className="modal" onClick={onClick}>
      <div className="JoinTeam-div" onClick={(e) => e.stopPropagation()}>
        {/* <h1>팀 만들기</h1> */}
        <div>
          <h2>팀 코드를 입력해주세요.</h2>
        </div>
        <div className="JoinTeam-input-div">
          <input
            type="text"
            maxLength={6}
            value={code || ""}
            onChange={(e) => setCode(e.target.value)}
            className="JoinTeam-input"
            placeholder="코드 입력"
          ></input>
        </div>
        <button className="JoinTeam-confirm">확인</button>
      </div>
    </div>
  );
}

export default JoinTeam;