import React from 'react';
import axios, { Axios, AxiosError, AxiosPromise } from 'axios';
import {TeamHeader, Sidebar, SecSideBar} from '../allFiles'
import '../styles/chatting.css';
import { io } from 'socket.io-client';
import { User } from '../types/user';
import { Chat } from '../types/chat';

const socket = io('localhost:3000/chat', {
    transports: ['websocket']
});

const teamId = 'edfa0783e4dc4fd09e68b71be3ff69ea';
const roomId = 'a11c92055eba46e690099bd5233bc3c4';

interface ChattingProps {
    user: User
}

export default function Chatting(props: ChattingProps) {
    const [chatList, setChatList] = React.useState<Chat[]>([]);
    const chatInputRef = React.useRef<HTMLInputElement>(null);

    const send = () => {
        if (chatInputRef.current?.value) {
            socket.emit('chat', {
                teamId,
                roomId,
                content: chatInputRef.current.value
            });
            chatInputRef.current.value = '';
        } else {
            return alert('채팅을 보내는 중에 문제가 발생하였습니다.');
        }
    }
    const onKeyDown = (event: React.KeyboardEvent) =>{
        if(event.key === 'Enter'){
            send();
        }
    }

    React.useEffect(() => {
        initChatList();
        initSocket();
    }, []);

    const initSocket = () => {
        socket.on('chat', (data: Chat) => {
            setChatList(prev => [...prev, data]);
        })
    }
    
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
                alert('알 수 없는 에러가 발생하였습니다');
            }
        }
    }

    const getChatList = (teamId: string, roomId: string, startChatId: number = 0): AxiosPromise<Chat[]> => {
        return axios.get(`/api/chat/${teamId}/${roomId}/${startChatId}`, {withCredentials: true}); 
    }

    return(
        <div className='chatting-div'>
            <TeamHeader user={props.user} />
            <Sidebar/>
            <SecSideBar/>
            <div className='chatting-main-div'>
                <span className='chatting-channel'>채팅</span>
                <div className='chatting-chat-div'>{
                    chatList.map((chat) => (
                        <div className='user-chatting'>
                            <div className='chatting-userIcon'></div>
                            <span className='chatting-speechBubble'>{chat.content}</span>
                        </div>
                    ))
                }</div>
                <div className='chatting-input'>
                    <input
                        type="text"
                        placeholder='보낼 메세지를 입력하세요.'
                        className='chatting-input--input'
                        onKeyDown={onKeyDown}
                        ref={chatInputRef}
                    />
                    <img src="images/chat-submit.png" alt="icon" className='chatting-input--img' onClick={send}/>
                </div>
            </div>
        </div>
    )
}