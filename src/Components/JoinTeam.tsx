import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/JoinTeam.css";

function JoinTeam({ onClick }: { onClick: any }) {
  const [code, setCode] = useState("");
  const [isConfirm, setIsConfirm] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [team, setTeam] = useState([]);
  const [teamCode, setTeamCode] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        setTeam((await getTeam()).data);
      } catch (error) {
        console.log(error);
      }
    })();
    team.map(async (item) => {
      try {
        const newCode = await axios.post("/api/team/code", item.id);
        setTeamCode([...teamCode, newCode]);
      } catch (error) {
        console.log(error);
      }
    });
  }, []);

  console.log(teamCode);

  const getTeam = () => {
    return axios.get("api/team");
  };

  console.log(team);

  const sampleCode = ["123456", "qwerty"];
  const confirm = () => {
    sampleCode.includes(code) && setIsCorrect(true);
    setIsConfirm(true);
  };
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
          {isConfirm &&
            (isCorrect ? (
              onClick()
            ) : (
              <span className="JoinTeam-notCorrect">
                코드가 올바르지 않습니다.
              </span>
            ))}
        </div>
        <button className="JoinTeam-confirm" onClick={() => confirm()}>
          확인
        </button>
      </div>
    </div>
  );
}

export default JoinTeam;
