import "../../styles/team/sidebar.css";
import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../App";
import axios from "axios";
function Sidebar() {
  const [team, setTeam] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get("/api/team");
        setTeam(response.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  const navigate = useNavigate();
  const color = (teamId: string) => {
    const colors = ["#6554C0", "#4FCBDF", "#EC994B", "#36B37E"];
    const index = parseInt(teamId[0], 16);
    return colors[index % colors.length];
  }
  const user = useContext(UserContext);
  return (
    <div className={"sidebar"}>
      <img
        src={"/images/tcpicon2.png"}
        alt={"icon"}
        className={"sidebar--tcp"}
        onClick={() => {
          if (user.isLogin) navigate("/calendar");
          else navigate("/");
        }}
      />
      {team.map((item) => {
        return (
          <Link to={`/team/${item.id}`}>
            <div
              className={"sidebar--square"}
              key={item.id}
              style={{
                backgroundColor: color(item.id),
              }}
            >
              {item.name[0]}
            </div>
          </Link>
        );
      })}
      {/* <div
        style={{
          backgroundColor: randomColor(),
        }}
      ></div>
      <div
        className={"sidebar--square"}
        style={{
          backgroundColor: randomColor(),
        }}
      ></div> */}
      <img
        src={"/images/whiteplus.png"}
        alt={"icon"}
        className={"sidebar--plus"}
      />
    </div>
  );
}
export default Sidebar;
