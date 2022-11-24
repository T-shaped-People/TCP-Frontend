import { useContext, useEffect, useState } from 'react';
import "../styles/secSideBar.css";
import { UserContext } from "../App";
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Modal from "react-modal";

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
    const [modal, setModal] = useState(false);
    const [teamName, setTeamName] = useState("");
    Modal.setAppElement("#root");

    useEffect(() => {
        (async () => {
            setChatRoomList((await axios.get("/api/chat/room")).data);
            setVoiceChatRoomList((await axios.get(`/api/chat/voice/${teamId}`)).data);
        })();
    }, []);

    useEffect(() => {
        (async () => {
            setChatRoomList((await axios.get(`/api/chat/room/${teamId}`)).data);
        })();
    }, [teamId]);

    const createChatRoom = async () => {
        await axios.post("/api/chat", {
            teamId,
            roomTitle: teamName,
        });
        setModal(false);
    };

    return (
        <div className='side-bar'>
            <div className='side-bar-menu'>
                <div className='rows'>
                    <img
                        src='/images/bxs_chat.png'
                        alt='icon'
                        className='icon'
                    />
                    <span className='side-bar--add' onClick={() => setModal(true)}>+</span>
                </div>
                <ul className='side-bar--side'>
                    {chatRoomList.map(room => (
                        <li onClick={() => nav(`/team/${room.teamId}/${room.id}/chatting`)}>
                            {room.title}
                        </li>
                    ))}
                </ul>
                <div className='side-bar--call'>
                    <img
                        src='/images/phoneicon.png'
                        alt='icon'
                        className='icon'
                    />
                    <div className='side-bar--call--div'></div>
                    <span className='side-bar--list'>백엔드 회의</span>
                </div>
                <div className='side-bar--codeshare'>
                    <img
                        src='/images/clarity_code-line.png'
                        alt='icon'
                        className='icon'
                    />
                    <p className='calendar_codeshare'>
                        여기를 눌러 새로운 코드 공유방을 생성하세요.
                    </p>
                </div>
            </div>
            <ul className={"side-bar--side"}>
                {voiceChatRoomList.map(room => (
                    <li onClick={() => nav(`/call/${room.id}`)}>
                        {room.title}
                    </li>
                ))}
            </ul>
            <div className='side-bar--user'>
                <div className='side-bar--user--div'>
                    <div className='side-bar--userimg'></div>
                    <p className='secSideBar-nickname'>{user.nickname}</p>
                </div>
            </div>
            <Modal
                isOpen={modal}
                onRequestClose={() => setModal(false)}
                style={{
                    overlay: {
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        zIndex: 100,
                    },
                    content: {
                        width: "320px",
                        height: "250px",
                        margin: "auto",
                        borderRadius: "20px",
                        overflowX: "hidden",
                    },
                }}
            >
                <div className="create-room-root">
                    <div className="create-room-header">
                        <h1 className="craete-room-title">채팅방 생성</h1>
                    </div>
                    <ul className="craete-room-ul">
                        <input
                            type="text"
                            placeholder="채팅방 이름을 입력하세요."
                            className="craete-room-input"
                            name="title"
                            value={teamName}
                            onChange={(e) => setTeamName(e.target.value)}
                        />
                        <div>
                            <div className="craete-room-button-submit" onClick={() => createChatRoom()}>
                                확인
                            </div>
                        </div>
                    </ul>
                </div>
            </Modal>
        </div>
    );
}