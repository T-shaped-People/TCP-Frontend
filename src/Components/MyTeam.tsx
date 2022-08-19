import React from "react";
import { MdPerson, MdCalendarToday } from "react-icons/md"; //npm install react-icons --save 치세요
import { TeamHeader } from "../allFiles";
import "../styles/MyTeam.css";

interface sampleTeam {
  id: number;
  name: string;
  deadline: number;
  leader: number;
  leaderName: string;
  memberCount: number;
  comment: string;
}

const TeamList = ({ team }: { team: sampleTeam }) => {
  const { name, deadline, leaderName, memberCount } = team;
  return (
    <div className="teamList-div">
      <h2>{name}</h2>
      <span className="teamList-div-deadline teamList-span">
        <MdCalendarToday /> D - {deadline}
      </span>
      <span>팀장 : {leaderName}</span>
      <span>
        <MdPerson />
        {memberCount}
      </span>
    </div>
  );
};

function MyTeam() {
  const sampleTeam: sampleTeam[] = [
    {
      id: 1,
      name: "T자형 인재 프로젝트",
      deadline: 21,
      leader: 3,
      leaderName: "이현준",
      memberCount: 21,
      comment: "팀 협업 플랫폼입니다",
    },
    {
      id: 2,
      name: "LogoEgo",
      deadline: 12,
      leader: 3,
      leaderName: "정승민",
      memberCount: 5,
      comment: "쓰레기",
    },
  ];
  return (
    <div>
      <TeamHeader />
      <div className="MyTeam-div">
        <h1>내 프로젝트</h1>
        <div className="MyTeam-teamList">
          {sampleTeam.map((team: sampleTeam) => {
            return <TeamList team={team} key={team.id} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default MyTeam;
