import React, {useContext, useEffect, useState} from 'react';
import "../styles/secSideBar.css";
import { UserContext } from "../App";
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

interface ChatRoom {
    title: any;
    teamId: string;
    id: string;
    createdAt: string;
}

interface VoiceChatRoom {
    title: any;
    teamId: string;
    id: string;
    createdAt: string;
}

export default function SecSideBar() {
  const user = useContext(UserContext);
  const [chatRoomList, setChatRoomList] = useState<ChatRoom[]>([]);
  const [voiceChatRoomList, setVoiceChatRoomList] = useState<VoiceChatRoom[]>([]);
  const nav = useNavigate();
  const { teamId } = useParams();
  useEffect(() => {
    (async () => {
        setChatRoomList((await axios.get("/api/chat/room")).data);
        setVoiceChatRoomList((await axios.get(`/api/chat/voice/${teamId}`)).data);
    })();
  }, []);

  return (
    <div className={"side-bar"}>
        <div className={"side-bar-menu"}>
            <img
                src={"/images/bxs_chat.png"}
                alt={"icon"}
                className={"icon"}
            />
            <ul className={"side-bar--side"}>
                {chatRoomList.map(room => (
                    <li onClick={() => nav(`/team/${room.teamId}/${room.id}/chatting`)}>
                        {room.title}
                    </li>
                ))}
            </ul>
            <div className={"side-bar--call"}>
                <img
                    src={"/images/phoneicon.png"}
                    alt={"icon"}
                    className={"icon"}
                />
                <div className={"side-bar--call--div"}>
                </div>
                <span className={"side-bar--list"}>백엔드 회의</span>
            </div>
            <ul className={"side-bar--side"}>
                {voiceChatRoomList.map(room => (
                    <li onClick={() => nav(`/call/${room.id}`)}>
                        {room.title}
                    </li>
                ))}
            </ul>
            <div className={"side-bar--codeshare"}>
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
        <div className={"side-bar--user"}>
            <div className={"side-bar--user--div"}>
                <div className={"side-bar--userimg"}></div>
                <p className={'secSideBar-nickname'}>{user.nickname}</p>
            </div>
        </div>
    </div>
  );
}