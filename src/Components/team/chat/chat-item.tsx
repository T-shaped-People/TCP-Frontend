import React from 'react';
import { Chat } from '../../../types/chat';

const ChatItem: React.FC<Chat> = ({
    usercode,
    nickname,
    createdAt,
    content
}: Chat) => {

    return (
        <li className='chat--item'>
            <img className="chat--item--profile"
                src={`https://auth.bssm.kro.kr/resource/user/profile/${usercode}.png`}
                alt=""
                onError={e => e.currentTarget.src = '/images/profile_default.png'}
            />
            <div className='chat--item--content-wrap'>
                <div className='chat--item--header'>
                    <div className='chat--item--nickname'>{nickname}</div>
                    <div className='chat--item--date'>{new Date(createdAt).toLocaleString()}</div>
                </div>
                <div className='chat--item--content'>{content}</div>
            </div>
        </li>
    );
}
export default ChatItem;