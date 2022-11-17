import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdPerson, MdCalendarToday } from "react-icons/md";
import { Link } from "react-router-dom";
import { MainHeader, JoinTeam } from "../allFiles";
import { useNavigate } from "react-router-dom";
import "../styles/MyTeam.css";

interface Team {
  id: string;
  name: string;
  leaderId: number;
  leaderNickname: string;
  description: string;
  startDate: Date;
  deadline: Date;
}

const TeamList = ({ team }: { team: Team }) => {
  const nav = useNavigate();
  const { name, leaderNickname, startDate, deadline } = team;
  const getDateDiff = (d1: Date, d2: Date) => {
    const date1 = new Date(d1);
    const date2 = new Date(d2);
    const diffDate = date1.getTime() - date2.getTime();

    return Math.abs(diffDate / (1000 * 60 * 60 * 24)); // 밀리세컨 * 초 * 분 * 시 = 일
  };

  const d_day = getDateDiff(startDate, deadline);
  return (
    <div
      className="teamList-div"
      onClick={() => {
        nav(`/team/${team.id}`);
      }}
    >
      <h2>{name}</h2>
      <div className="teamList-span-div">
        <span className="teamList-span-div-deadline">
          <MdCalendarToday /> D - {d_day}
        </span>
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
  // let haveTeam: boolean = true;
  const [haveTeam, setHaveTeam] = useState(true);
  const onClick = () => {
    setModal((prev) => !prev);
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await getTeam();
        setTeam(response.data);
        setHaveTeam(response.data.length > 0);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  console.log(haveTeam);

  const getTeam = () => {
    return axios.get("api/team");
  };

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const data = await postTeam();
  //       console.log(data.data.teamId);
  //       const code = await axios.post("api/team/code", {
  //         teamId: data.data.teamId,
  //       });
  //       setTeamCode([...teamCode, code]);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   })();
  // }, []);

  // console.log(teamCode);

  // const postTeam = () => {
  //   return axios.post("api/team", {
  //     teamName: "test3",
  //     description: "테스트",
  //     startDate: "2022-08-26",
  //     deadline: "2022-09-26",
  //   });
  // };

  return (
    <div>
      <MainHeader />
      {haveTeam ? (
        <div className="MyTeam-div">
          <h1>내 프로젝트</h1>
          <div className="MyTeam-teamList">
            {team.map((team: Team) => {
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
