import React from 'react';
import axios from 'axios';
import {TeamHeader, Sidebar, SecSideBar} from '../allFiles'
import '../styles/chatting.css';

const teamId = '1';
const roomId = '1';

export default function Chatting(props) {
    const [chatList, setChatList] = React.useState([]);

    const send = () => {
        console.log('실행')
    }
    const onKeyDown = (e) =>{
        if(e.key === 'Enter'){
            send();
        }
    }

    React.useEffect(() => {
        InitChatList();
    }, []);
    
    const InitChatList = async () => {
        try {
            const chatData = (await getChatList(teamId, roomId)).data.reverse();
            // 채팅 목록이 없으면
            if (!chatData.length) {
                return;
            }
            setChatList(chatData);
        } catch (error) {
            alert(error.response?.data?.message);
        }
    }

    const getChatList = (teamId, roomId, startChatId = 0) => {
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
                    <input type="text" placeholder='보낼 메세지를 입력하세요.' className='chatting-input--input' onKeyDown={onKeyDown} />
                    <img src="images/chat-submit.png" alt="icon" className='chatting-input--img' onClick={send}/>
                </div>
            </div>
        </div>
    )
}