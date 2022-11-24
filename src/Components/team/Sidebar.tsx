import "../../styles/team/sidebar.css";
import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect, useContext, CSSProperties } from "react";
import { UserContext } from "../../App";
import axios from "axios";
function Sidebar() {
    const [team, setTeam] = useState([]);
    const user = useContext(UserContext);
    const navigate = useNavigate();

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

    const getTeamColor = (teamId: string) => {
        const colors = ["#6554C0", "#4FCBDF", "#EC994B", "#36B37E"];
        const index = parseInt(teamId[0], 16);
        return colors[index % colors.length];
    }

    return (
        <div className={"sidebar"}>
            <img
                src={"/images/tcpicon2.png"}
                alt={"icon"}
                className={"sidebar--tcp"}
                onClick={() => {
                if (user.isLogin) navigate("/myteam");
                else navigate("/");
                }}
            />
            <ul>
                {team.map((item) => (
                    <li
                        key={item.id}
                        style={{'--team-color': getTeamColor(item.id)} as CSSProperties}
                    >
                        <Link to={`/team/${item.id}`}>{item.name[0]}</Link>
                    </li>
                ))}
                <li key='plus'>
                    <img
                        src={"/images/whiteplus.png"}
                        alt={"icon"}
                        className={"sidebar--plus"}
                    />
                </li>
            </ul>
        </div>
    );
}
export default Sidebar;
