import React, { useEffect, useState } from "react";
import axios, { AxiosError, AxiosPromise } from "axios";
import "../../styles/team/chatting.css";
import { io } from "socket.io-client";
import { Chat } from "../../types/chat";
import { useNavigate, useParams } from "react-router-dom";
import { TiPlus } from "react-icons/ti";
import Modal from "react-modal";

interface ChatTeam {
  title: any;
  teamId: string;
  roomId: string;
  createdAt: string;
}

const socket = io("43.201.36.11:3000/chat", {
  transports: ["websocket"],
});

export default function Chatting() {
  const [chatList, setChatList] = React.useState<Chat[]>([]);
  const [modal, setModal] = useState(false);
  const [teamName, setTeamName] = useState("");
  const param = useParams();
  const { teamId, roomId } = param;
  const chatInputRef = React.useRef<HTMLInputElement>(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get("/api/chat/room");
        console.log(response);
        setChatTeam(response.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const send = () => {
    if (chatInputRef.current?.value) {
      socket.emit("chat", {
        teamId,
        roomId,
        content: chatInputRef.current.value,
      });
      chatInputRef.current.value = "";
    } else {
      return alert("채팅을 보내는 중에 문제가 발생하였습니다.");
    }
  };
  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      send();
    }
  };

  React.useEffect(() => {
    initChatList();
    initSocket();
  }, []);

  const initSocket = () => {
    socket.on("chat", (data: Chat) => {
      setChatList((prev) => [...prev, data]);
    });
  };

  const [chatTeam, setChatTeam] = useState<ChatTeam[]>([]);

  Modal.setAppElement("#root");

  const createChatRoom = () => {
    setModal(true);
  };

  const postChatRoom = async () => {
    try {
      const response = await axios.post("/api/chat", {
        teamId: teamId,
        roomTitle: teamName,
      });
      console.log(response);
      setModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  const initChatList = async () => {
    try {
      const chatData = (await getChatList(teamId, roomId)).data.reverse();
      // 채팅 목록이 없으면
      if (!chatData.length) {
        return;
      }
      setChatList(chatData);
    } catch (error) {
      if (error instanceof AxiosError) {
        alert(error.response?.data?.message);
      } else {
        alert("알 수 없는 에러가 발생하였습니다");
      }
    }
  };

  const getChatList = (
    teamId: string,
    roomId: string,
    startChatId: number = 0
  ): AxiosPromise<Chat[]> => {
    return axios.get(`/api/chat/${teamId}/${roomId}/${startChatId}`, {
      withCredentials: true,
    });
  };

  const nav = useNavigate();

  return (
    <div className="chatting-div">
      <div className="chatting-main-div">
        <span className="chatting-channel">채팅</span>
        <div className="chatting-chat-div">
          {chatList.map((chat) => (
            <div className="user-chatting">
              <div className="chatting-userIcon"></div>
              <span className="chatting-speechBubble">{chat.content}</span>
            </div>
          ))}
        </div>
        <div className="chatting-input">
          <input
            type="text"
            placeholder="보낼 메세지를 입력하세요."
            className="chatting-input--input"
            onKeyDown={onKeyDown}
            ref={chatInputRef}
          />
          <img
            src="images/chat-submit.png"
            alt="icon"
            className="chatting-input--img"
            onClick={send}
          />
        </div>
        <div>
          <TiPlus
            size={32}
            onClick={() => {
              createChatRoom();
            }}
          />
          <Modal
            isOpen={modal}
            onRequestClose={() => setModal(false)}
            style={{
              overlay: {
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                zIndex: 100,
              },
              content: {
                width: "300px",
                height: "200px",
                margin: "auto",
                borderRadius: "20px",
                overflowX: "hidden",
              },
            }}
          >
            <span>채팅방 이름을 입력하세요</span>
            <input
              type="text"
              placeholder="채팅방 이름"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
            />
            <button onClick={() => postChatRoom()}>확인</button>
          </Modal>
          {chatTeam.map((item: ChatTeam) => {
            return (
              <button
                onClick={() => {
                  nav(`/team/${item.teamId}/${item.roomId}/chatting`);
                }}
                className="chatting-select"
              >
                {item.title.slice(0, 2)}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
