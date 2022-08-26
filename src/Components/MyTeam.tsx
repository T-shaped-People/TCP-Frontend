import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdPerson, MdCalendarToday } from "react-icons/md";
import { Link } from "react-router-dom";
import { MainHeader, JoinTeam } from "../allFiles";
import "../styles/MyTeam.css";

interface sampleTeam {
  id: string;
  name: string;
  leaderId: number;
  leaderNickname: string;
}

const TeamList = ({ team }: { team: sampleTeam }) => {
  const { name, leaderNickname } = team;

  return (
    <div className="teamList-div">
      <h2>{name}</h2>
      <div className="teamList-span-div">
        {/* <span className="teamList-span-div-deadline">
          <MdCalendarToday /> D - {deadline}
        </span> */}
        <span className="teamList-span-div-leader">
          팀장 : {leaderNickname}
        </span>
        {/* <span>
          <MdPerson />
          {totalMembers}
        </span> */}
      </div>
    </div>
  );
};

function MyTeam() {
  const [modal, setModal] = useState(false);
  const [team, setTeam] = useState([]);
  let haveTeam: boolean = true;
  const onClick = () => {
    setModal((prev) => !prev);
  };

  useEffect(() => {
    (async () => {
      try {
        setTeam((await getTeam()).data);
        haveTeam = team.length > 0 ? true : false;
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  console.log(team);

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const a = await postTeam();
  //       console.log(a);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   })();
  // }, []);

  const getTeam = () => {
    return axios.get("api/team");
  };

  // const postTeam = () => {
  //   return axios.post("api/team", { teamName: "asdbfg ujafedg" });
  // };

  return (
    <div>
      <MainHeader />
      {haveTeam ? (
        <div className="MyTeam-div">
          <h1>내 프로젝트</h1>
          <div className="MyTeam-teamList">
            {team.map((team: sampleTeam) => {
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
            <button
              onClick={() => {
                setModal(true);
              }}
            >
              팀 가입하기
            </button>
          </div>
          {modal && <JoinTeam onClick={onClick} />}
        </div>
      )}
    </div>
  );
}

export default MyTeam;
