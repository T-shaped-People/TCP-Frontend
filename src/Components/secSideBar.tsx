import { useContext, useEffect, useState } from 'react';
import "../styles/secSideBar.css";
import { UserContext } from "../App";
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Modal from "react-modal";
import { CreateChatRoomModalStyle, GeneralModalStyle } from '../styles/team/GeneralModalStyle';

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
    const { teamId, roomId } = useParams<string>();
    const [chatRoomModal, setChatRoomModal] = useState<boolean>(false);
    const [voiceChatRoomModal, setVoiceChatRoomModal] = useState<boolean>(false);
    const [teamName, setTeamName] = useState<string>("");
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
            setVoiceChatRoomList((await axios.get(`/api/chat/voice/${teamId}`)).data);
        })();
    }, [teamId]);

    const createChatRoom = async () => {
        await axios.post("/api/chat", {
            teamId,
            roomTitle: teamName,
        });
        setChatRoomModal(false);
    };

    const createVoiceChatRoom = async () => {
        await axios.post("/api/chat/voice", {
            teamId,
            roomTitle: teamName,
        });
        setVoiceChatRoomModal(false);
    };

    const toggleCreateChatModal = () => {
        setChatRoomModal(false);
    };


    const toggleCreateVoiceChatModal = () => {
        setVoiceChatRoomModal(false);
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
                    <span className='side-bar--add' onClick={() => setChatRoomModal(true)}>+</span>
                </div>
                <ul className='side-bar--side'>
                    {chatRoomList.map(room => (
                        <li
                            onClick={() => nav(`/team/${room.teamId}/room/${room.id}/chatting`)}
                            className={room.id === roomId? 'active': ''}
                        >
                            {room.title}
                        </li>
                    ))}
                </ul>
                <div className='side-bar--call'>
                    <div className='rows'>
                        <img
                            src='/images/phoneicon.png'
                            alt='icon'
                            className='icon'
                        />
                        <span className='side-bar--add' onClick={() => setVoiceChatRoomModal(true)}>+</span>
                    </div>
                    <div className='side-bar--call--div'></div>
                </div>
                <ul className={"side-bar--side"}>
                    {voiceChatRoomList.map(room => (
                        <li
                            onClick={() => nav(`/team/${room.teamId}/room/${room.id}/call`)}
                            className={room.id === roomId? 'active': ''}
                        >
                            {room.title}
                        </li>
                    ))}
                </ul>
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
            <div className='side-bar--user'>
                <div className='side-bar--user--div'>
                    <div className='side-bar--userimg'></div>
                    <p className='secSideBar-nickname'>{user.nickname}</p>
                </div>
            </div>
            <Modal
                isOpen={chatRoomModal}
                onRequestClose={() => setChatRoomModal(false)}
                style={CreateChatRoomModalStyle}
            >
                <div className="create-room-root">
                    <div className="create-room-header">
                        <h1 className="create-room-title">채팅방 생성</h1>
                        <div className="create-room-button" onClick={toggleCreateChatModal}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </div>
                    </div>
                    <ul className="create-room-ul">
                        <input
                            type="text"
                            placeholder="채팅방 이름을 입력하세요."
                            className="create-room-input"
                            name="title"
                            value={teamName}
                            onChange={(e) => setTeamName(e.target.value)}
                        />
                        <div>
                            <div className="create-room-button-submit" onClick={() => createChatRoom()}>
                                확인
                            </div>
                        </div>
                    </ul>
                </div>
            </Modal>
            <Modal
                isOpen={voiceChatRoomModal}
                onRequestClose={() => setVoiceChatRoomModal(false)}
                style={CreateChatRoomModalStyle}
            >
                <div className="create-room-root">
                    <div className="create-room-header">
                        <h1 className="create-room-title">음성채팅방 생성</h1>
                        <div className="create-room-button" onClick={toggleCreateVoiceChatModal}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </div>
                    </div>
                    <ul className="create-room-ul">
                        <input
                            type="text"
                            placeholder="채팅방 이름을 입력하세요."
                            className="create-room-input"
                            name="title"
                            value={teamName}
                            onChange={(e) => setTeamName(e.target.value)}
                        />
                        <div>
                            <div className="create-room-button-submit" onClick={() => createVoiceChatRoom()}>
                                확인
                            </div>
                        </div>
                    </ul>
                </div>
            </Modal>
        </div>
    );
}