import {Nav, Sidebar, SecSideBar} from '../allFiles'
import '../styles/chatting.css';

export default function Chatting()
{
    const send = () => {
        console.log('실행')
    }
    const onKeyDown = (e) =>{
        if(e.key === 'Enter'){
            send();
        }
    }

    return(
        <div className='chatting-div'>
            <Nav/>
            <Sidebar/>
            <SecSideBar/>
            <div className='chatting-main-div'>
                <span className='chatting-channel'>채팅</span>
                <div className='chatting-chat-div'>
                    <div className='user-chatting'>
                        <div className='chatting-userIcon'></div>dk
                        <span className='chatting-speechBubble'>ㅎㅇ</span>
                    </div>
                    <div className='user-chatting'>
                        <div className='chatting-userIcon'></div>
                        <span className='chatting-speechBubble'>아무말아무말아무말아무말아무말아무말아무말아무말아무말아무말아무말아무말아무말아무말아무말아무말아무말아무말아무말</span>
                    </div>
                    <div className='user-chatting'>
                        <div className='chatting-userIcon'></div>
                        <span className='chatting-speechBubble'>테스트</span>
                    </div>
                    <div className='user-chatting'>
                        <div className='chatting-userIcon'></div>
                        <span className='chatting-speechBubble'>테스트</span>
                    </div>
                    <div className='user-chatting'>
                        <div className='chatting-userIcon'></div>
                        <span className='chatting-speechBubble'>테스트</span>
                    </div>
                    <div className='user-chatting'>
                        <div className='chatting-userIcon'></div>
                        <span className='chatting-speechBubble'>테스트</span>
                    </div>
                    <div className='user-chatting'>
                        <div className='chatting-userIcon'></div>
                        <span className='chatting-speechBubble'>테스트</span>
                    </div>
                    <div className='user-chatting'>
                        <div className='chatting-userIcon'></div>
                        <span className='chatting-speechBubble'>테스트</span>
                    </div>
                    <div className='user-chatting'>
                        <div className='chatting-userIcon'></div>
                        <span className='chatting-speechBubble'>테스트</span>
                    </div>
                    <div className='user-chatting'>
                        <div className='chatting-userIcon'></div>
                        <span className='chatting-speechBubble'>테스트</span>
                    </div>
                </div>
                <div className='chatting-input'>
                    <input type="text" placeholder='보낼 메세지를 입력하세요.' className='chatting-input--input' onKeyDown={onKeyDown} />
                    <img src="images/chat-submit.png" alt="icon" className='chatting-input--img' onClick={send}/>
                </div>
            </div>
        </div>
    )
}