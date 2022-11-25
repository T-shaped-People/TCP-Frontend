import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../styles/header/team-header.css";
import { UserContext } from "../../App";
import axios from "axios";
import TeamType from "../../types/team";
import Sidebar from "../team/Sidebar";
import SecSideBar from "../secSideBar";

const TeamHeader = () => {
  const [team, setTeam] = useState<TeamType>({
    id: "",
    leaderId: 0,
    leaderNickname: "",
    name: "",
    description: "",
    startDate: "",
    deadline: "",
    totalMembers: 0,
  });
  const navigate = useNavigate();
  const user = useContext(UserContext);
  const param = useParams();

  useEffect(() => {
    console.log(param);
    (async () => {
      try {
        const response = await axios.get(`/api/team/${param.teamId}`);
        setTeam(response.data);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [param]);
  return (
    <>
      <header className="team-header">
        <nav>
          <div className="nav--left">{team.name}</div>
          <ul className="nav--right rows">
            <li
              onClick={() => navigate(`todo`)}
              className={"team-header-todo"}
            >
              <img
                src="/images/carbon_notebook.png"
                alt="icon"
                className="team-header--notebook"
              />
            </li>
            <li className="header--username">
              <img
                src="/images/person.png"
                alt="icon"
                className="team-header--person"
              />
              <span>{user.nickname}</span>
            </li>
          </ul>
        </nav>
      </header>
      <Sidebar />
      <SecSideBar />
    </>
  );
};

export default TeamHeader;
