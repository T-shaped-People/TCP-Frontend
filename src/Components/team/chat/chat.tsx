import "../../../styles/team/chat.css";
import { FormEvent, useEffect, useRef, useState } from "react";
import axios, { AxiosError, AxiosPromise } from "axios";
import { io } from "socket.io-client";
import { Chat } from "../../../types/chat";
import { useParams } from "react-router-dom";
import ChatItem from "./chat-item";
import { useInView } from "react-intersection-observer";

const socket = io("/chat", {
    transports: ["websocket"],
    withCredentials: true
});

export default function Chatting() {
    const [chatList, setChatList] = useState<Chat[]>([]);
    const param = useParams();
    const { teamId, roomId } = param;
    const [startChatId, setStartChatId] = useState(0);
    const [prevScrollY, setPrevScrollY] = useState(0);
    const [prevHeight, setPrevHeight] = useState(0);
    const [loading, setLoading] = useState(true);
    const [chatLoadRef, inView] = useInView();
    const chatListRef = useRef<HTMLUListElement>(null);
    const chatInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        initSocket();
    }, []);

    useEffect(() => {
        if (!roomId) return;
        initChatList();
    }, [roomId]);

    useEffect(() => {
        if (loading) {
            // 원래 스크롤 위치로 이동
            chatListRef.current?.scrollTo({
                top: chatListRef.current.scrollHeight - prevHeight + prevScrollY
            });
        } else {
            chatListRef.current?.scrollTo({
                top: (chatListRef.current.scrollTop == chatListRef.current.scrollHeight)?
                    chatListRef.current.scrollTop:
                    chatListRef.current.scrollHeight
            });
        }
    }, [chatList]);

    useEffect(() => {
        // 스크롤이 아직 남아있거나 로딩중이라면
        if (!inView || loading) {
            return;
        }
        // 아니면 다음 채팅 목록을 가져옴
        setLoading(true);
        (async () => {
            const chatData: Chat[] = (await getChatList(teamId, roomId, startChatId)).data.reverse();
            // 채팅 목록이 없으면
            if (!chatData.length) {
                setStartChatId(1);
                return setLoading(false);
            }

            setStartChatId(() => chatData[0].id);
            setPrevScrollY(Number(chatListRef.current?.scrollTop));
            setPrevHeight(Number(chatListRef.current?.scrollHeight));
            setChatList(prev => [
                ...chatData,
                ...prev
            ]);

            // 리로딩 쿨타임
            setTimeout(() => {
                setLoading(false);
            }, 200);
        })();
    }, [inView, loading]);

    const initSocket = () => {
        socket.on("chat", (data: Chat) => {
            setChatList((prev) => [...prev, data]);
        });
    };

    const initChatList = async () => {
        socket.emit('chat:room-join', {
            teamId,
            roomId
        });
        try {
            const chatData = (await getChatList(teamId, roomId)).data.reverse();
            setStartChatId(() => chatData[0]?.id ?? 1);
            setChatList(chatData);
        } catch (error) {
            if (error instanceof AxiosError) {
                alert(error.response?.data?.message);
            } else {
                alert("알 수 없는 에러가 발생하였습니다");
            }
        }
        setLoading(false);
    };

    const sendChat = (event?: FormEvent<HTMLFormElement>) => {
        event?.preventDefault();
        if (!chatInputRef.current?.value) {
            return alert("채팅을 보내는 중에 문제가 발생하였습니다.");
        }
        socket.emit("chat", {
            teamId,
            roomId,
            content: chatInputRef.current.value,
        });
        chatInputRef.current.value = "";
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

    return (
        <>
            <ul className="chat--item-list scroll-bar" ref={chatListRef}>
                {startChatId > 1 || startChatId == 0? <li className='chat--load' ref={chatLoadRef}></li>: null}
                {chatList.map((chat) => <ChatItem {...chat} />)}
            </ul>
            <form className="chat--input" onSubmit={sendChat}>
                <input
                    type="text"
                    placeholder="보낼 메세지 입력"
                    ref={chatInputRef}
                    autoComplete="off"
                    required
                />
                <button type="submit">
                    <img
                        src="/images/chat-submit.png"
                        alt="icon"
                        className="chatting-input--img"
                    />
                </button>
            </form>
        </>
    );
}
