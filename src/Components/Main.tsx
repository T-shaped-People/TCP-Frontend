import React from 'react';
import { MainHeader, MakeTeam } from '../allFiles';
import '../styles/Main.css';
import { User } from '../types/user';

interface MainProps{
    user: User
}

export default function Main(props: MainProps){
    
    const [modal, setModal] = React.useState(false);

    const team = () => {
        setModal(!modal);
    }

    return(
        <div>
            <MainHeader user={props.user} />
            <section className={"section_main"}>
                <div className="imgdiv">
                    <img src={"images/teamimg1.png"} className="sec--img" alt={"icon"}/>
                </div>
                <p className='sec--button--or'>당신의 팀 프로젝트를 시작하세요</p>
                <button className="sec--button" onClick={team}>시작하기</button>
                {modal ? <MakeTeam /> : <></>}
            </section>
        </div>
        )
}

