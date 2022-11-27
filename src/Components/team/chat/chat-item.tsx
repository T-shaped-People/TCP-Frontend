import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from '../../../App';
import { Chat } from '../../../types/chat';
import { elapsedTime, MilliSecondTime } from '../../../utils/date';

interface ChatItemType extends Chat {
    deleteChat: (id: number) => void;
}

const ChatItem: React.FC<ChatItemType> = ({
    id,
    usercode,
    nickname,
    createdAt,
    content,
    deleted,
    deleteChat
}: ChatItemType) => {

    const [isHovering, setIsHovering] = useState<boolean>(false);
    const user = useContext(UserContext);

    return (
        <li className='chat--item'>
            <img className="chat--item--profile"
                src={`https://auth.bssm.kro.kr/resource/user/profile/${usercode}.png`}
                alt=""
                onError={e => e.currentTarget.src = '/images/profile_default.png'}
            />
            <div 
                className='chat--item--content-wrap'
                onMouseOver={() => setIsHovering(true)}
                onMouseOut={() => setIsHovering(false)}
            >
                <div className='chat--item--header'>
                    <div className='chat--item--nickname'>{nickname}</div>
                    <div className='chat--item--date'>{elapsedTime(createdAt, MilliSecondTime.DAY)}</div>
                </div>
                <div className='chat--item--content'>{content}</div>
                {isHovering && user.usercode === usercode && !deleted ? 
                <div 
                    className='chat--item--delete' 
                    onClick={() => deleteChat(id)}>삭제</div> : null}
            </div>
        </li>
    );
}
export default ChatItem;