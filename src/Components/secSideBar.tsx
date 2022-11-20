import React, {useContext, useEffect, useState} from 'react';
import "../styles/secSideBar.css";
import { UserContext } from "../App";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface ChatRoom {
    title: any;
    teamId: string;
    id: string;
    createdAt: string;
  }

export default function SecSideBar() {
  const user = useContext(UserContext);
  const [chatRoomList, setChatRoomList] = useState<ChatRoom[]>([]);
  const nav = useNavigate();
  useEffect(() => {
    (async () => {
        setChatRoomList((await axios.get("/api/chat/room")).data);
    })();
  }, []);

  return (
    <div className={"calendar_sidebar"}>
        <div>
            <img
                src={"/images/bxs_chat.png"}
                alt={"icon"}
                className={"icon"}
            />
            <ul className={"calendar_sidebar--side"}>
                {chatRoomList.map(room => (
                    <li onClick={() => nav(`/team/${room.teamId}/${room.id}/chatting`)}>
                        {room.title}
                    </li>
                ))}
            </ul>
            <div className={"calendar_sidebar--call"}>
                <img
                    src={"/images/phoneicon.png"}
                    alt={"icon"}
                    className={"icon"}
                />
                <div className={"calendar_sidebar--call--div"}>
                </div>
                <span className={"calendar_sidebar--list"}>백엔드 회의</span>
            </div>
            <div className={"calendar_sidebar--codeshare"}>
                <img
                    src={"/images/clarity_code-line.png"}
                    alt={"icon"}
                    className={"icon"}
                />
                <p className={"calendar_codeshare"}>
                    여기를 눌러 새로운 코드 공유방을 생성하세요.
                </p>
            </div>
        </div>
        <div className={"calendar_sidebar--user"}>
            <div className={"calendar_sidebar--user--div"}>
                <div className={"calendar_sidebar--userimg"}></div>
                <p className={'secSideBar-nickname'}>{user.nickname}</p>
            </div>
            <div className={"calendar_sidebar--user--icons"}>
                <img
                    src={"/images/micicon.png"}
                    alt={"icon"}
                    className={"calendar_sidebar--user--mic"}
                />
                <img
                    src={"/images/headphone.png"}
                    alt={"icon"}
                    className={"calendar_sidebar--user--head"}
                />
            </div>
        </div>
    </div>
  );
}