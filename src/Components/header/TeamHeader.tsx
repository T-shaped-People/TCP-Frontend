import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../styles/header/team-header.css";
import { UserContext } from "../../App";
import axios from "axios";
import TeamType from "../../types/team";

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
  if (!user.isLogin) navigate("/");
  const param = useParams();

  useEffect(() => {
    const getTeamInfo = async () => {
      try {
        const response = await axios.get(`/api/team/${param.teamId}`);
        setTeam(response.data);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };
    getTeamInfo();
  }, [param]);
  return (
    <header className="team-header">
      <nav>
        <div className="nav--left">{team.name}</div>
        <ul className="nav--right rows">
          <li>
            <img
              src="/images/speechbubble.png"
              alt="icon"
              className="team-header--speech"
            />
          </li>
          <li>
            <img
              src="/images/carbon_notebook.png"
              alt="icon"
              className="team-header--notebook"
            />
          </li>
          <li>
            <input type="text" className="team-header--input" />
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
  );
};

export default TeamHeader;
