import React, { useState } from "react";
import axios from "axios";
import { MainHeader } from "../../allFiles";
import "../../styles/makeProject.css";
import { useNavigate } from "react-router-dom";

const Modal = ({ teamCode }) => {
  const nav = useNavigate();
  return (
    <div className="makeproject-modal">
      <p className="makeproject-modal-p">팀 코드가 생성 되었습니다!</p>
      <p className="makeproject-modal-p">
        아래 코드를 팀원들과 공유해 팀에 초대하세요!
      </p>
      <p className="makeproject-modal-p">
        <b>{teamCode}</b>
      </p>
      <button
        onClick={() => {
          nav("/myteam");
        }}
        className="makeproject-modal-button"
      >
        확인
      </button>
    </div>
  );
};

export default function MakeProject() {
  const now = ((new Date().toLocaleDateString()).replaceAll(".", "")).split(" ", )
  const start = `${now[0]}-${now[1].padStart(2, "0")}-${now[2].padStart(2, "0")}`;
  const [modal, setModal] = React.useState(false);
  const [inputs, setInput] = React.useState({
    teamName: "",
    description: "",
    startDate: start,
    deadline: "",
  });
  const [teamCode, setTeamCode] = useState([]);

  const onChange = (e) => {
    const { name, value } = e.target;
    const nextInputs = {
      ...inputs,
      [name]: value,
    };
    setInput(nextInputs);
  };
  const { teamName, description, startDate, deadline } = inputs;

  const makeTeam = async () => {
    try {
      const data = (await axios.post("api/team", inputs)).data;
      const code = await axios.post("api/team/code", {
        teamId: data.teamId,
      });
      setTeamCode([...teamCode, code]);
      reverseModal();
    } catch (error) {
      console.log(error);
    }
    console.log(teamCode);
  };

  const reverseModal = () => {
    setModal((prev) => !prev);
    document
      .querySelector(".makeProject-shadow")
      .classList.toggle("project-dark");
  };

  return (
    <div className="makeProject-root">
      <div className="makeProject-shadow"></div>
      <MainHeader />
      <div className="makeProject-div">
        <h1 className="makeProject-title">팀 만들기</h1>
        <div className="makeProject-flex">
          <ul className="makeProject-table">
            <li className="makeProject-tr">
              <p className="makeProject-td">팀 이름</p>
              <input
                type="text"
                name="teamName"
                className="makeProject-input"
                onChange={onChange}
                value={teamName}
              />
            </li>
            <li className="makeProject-tr">
              <p className="makeProject-td">팀 설명</p>

            </li>
            <li className="makeProject-tr">
              <p className="makeProject-td">프로젝트 마감일시</p>
              <div className="makeProject-input-date-div">
                <input
                  type="date"
                  name="deadline"
                  className="makeProject-input-date"
                  onChange={onChange}
                  value={deadline}
                  min={start}
                />
              </div>
            </li>
          </ul>
          <button className="makeProject-button" onClick={makeTeam}>
            팀 만들기
          </button>
          {modal ? <Modal teamCode={teamCode[0].data.teamCode} /> : <></>}
        </div>
      </div>
    </div>
  );
}
