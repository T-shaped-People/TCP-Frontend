import React, { useEffect, useState } from "react";
import { MdPerson, MdCalendarToday } from "react-icons/md";
import { Link } from "react-router-dom";
import { MainHeader } from "../allFiles";
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
      <div className="teamList-span-div">
        <span className="teamList-span-div-deadline">
          <MdCalendarToday /> D - {deadline}
        </span>
        <span className="teamList-span-div-leader">팀장 : {leaderName}</span>
        <span>
          <MdPerson />
          {memberCount}
        </span>
      </div>
    </div>
  );
};

function MyTeam() {
  const [haveTeam, setHaveTeam] = useState(true);
  // useEffect(() => {
  //   if (sampleTeam.length > 0) {
  //     setHaveTeam(true);
  //   }
  // }, []);
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
      name: "test",
      deadline: 12,
      leader: 3,
      leaderName: "정승민",
      memberCount: 5,
      comment: "test",
    },
  ];
  return (
    <div>
      <MainHeader />
      {haveTeam ? (
        <div className="MyTeam-div">
          <h1>내 프로젝트</h1>
          <div className="MyTeam-teamList">
            {sampleTeam.map((team: sampleTeam) => {
              return <TeamList team={team} key={team.id} />;
            })}
          </div>
        </div>
      ) : (
        <div className="MyTeam-div">
          <h1>내 프로젝트</h1>
          <div className="MyTeam-noTeam-img">
            <img src={"images/teamimg1.png"} alt={"icon"} />
          </div>
          <div className="MyTeam-noTeam-span">
            <span>아직 프로젝트가 없습니다!</span>
          </div>
          <div className="MyTeam-button">
            <button>프로젝트 만들기</button>
            <Link to="/community">
              <button>모집중인 팀 보기</button>
            </Link>
            <button>팀 가입하기</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyTeam;