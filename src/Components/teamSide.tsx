import axios from "axios";
import { Link, useParams } from "react-router-dom";
import "../styles/teamSide.css";

export default function TeamSide() {
  const param = useParams();
  const quitTeam = async () => {
    try {
      await axios.delete(`/team/member/quit/${param.teamId}`);
    } catch (error) {
      console.log(error);
    }
  };

  // const logout = async () => {
  //   try {
  //     await axios.delete()
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  return (
    <div className="teamSide-root">
      <img src="/images/tcpicon2.png" alt="icon" className="teamSide-logo" />
      <Link to="/team">대시보드</Link>
      <Link to="todo">TODO</Link>
      <Link to="/">캘린더</Link>
      <Link to="/">아이디어방</Link>
      <Link to="/">팀관리</Link>
      <Link to="/chatting">채팅</Link>
      <button className="teamSide-button" onClick={() => quitTeam()}>
        팀 나가기
      </button>
      <button className="teamSide-button">로그아웃</button>
    </div>
  );
}
