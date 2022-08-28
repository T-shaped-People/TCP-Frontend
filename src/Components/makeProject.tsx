import React, { useEffect, useState } from "react";
import axios from "axios";
import { MainHeader } from "../allFiles";
import "../styles/makeProject.css";

export default function MakeProject() {
  const [modal, setModal] = React.useState(false);
  const [inputs, setInput] = React.useState({
    teamName: "",
    description: "",
    startDate: "",
    deadline: "",
  });
  const [teamCode, setTeamCode] = useState([]);

  const onChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
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
      const data = await axios.post("api/team", inputs);
      const code = await axios.post("api/team/code", {
        teamId: data.data.teamId,
      });
      setTeamCode([...teamCode, code]);
    } catch (error) {
      console.log(error);
    }

    console.log(teamCode);
  };

  return (
    <div className="makeProject-root">
      <MainHeader />
      <div className="makeProject-div">
        <h1 className="makeProject-title">팀 만들기</h1>
        <div className="makeProject-flex">
          <h2 className="makeProject-subtitle">새 프로젝트를 만들어보세요</h2>
          <div className="makeProject-table">
            <div className="makeProject-tr">
              <span className="makeProject-td">팀 이름</span>
              <input
                type="text"
                name="teamName"
                className="makeProject-input"
                onChange={onChange}
                value={teamName}
              />
            </div>
            <div className="makeProject-tr">
              <span className="makeProject-td">팀 설명</span>
              <textarea
                className="makeProject-textarea"
                name="description"
                onChange={onChange}
                value={description}
              />
            </div>
            <div className="makeProject-tr">
              <span className="makeProject-td">프로젝트 마감일시</span>
              <div className="makeProject-input-date-div">
                <input
                  type="date"
                  name="startDate"
                  className="makeProject-input-date"
                  onChange={onChange}
                  value={startDate}
                />
                ~
                <input
                  type="date"
                  name="deadline"
                  className="makeProject-input-date"
                  onChange={onChange}
                  value={deadline}
                />
              </div>
            </div>
          </div>
          <button className="makeProject-button" onClick={makeTeam}>
            팀 만들기
          </button>
        </div>
      </div>
    </div>
  );
}