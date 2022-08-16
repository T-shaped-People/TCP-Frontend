import React from 'react';
import { MainHeader, MakeTeam } from '../allFiles';
import '../styles/Main.css';


export default function Main(){
    
    const [modal, setModal] = React.useState(false);
    const mEl = document.querySelector('.main-root');

    const team = () => {
        mEl?.classList.add('main-shadow');
        setModal(!modal);
    }

    React.useEffect(()=>{
        if(document.querySelector('.main-shadow') !== null){
            document.querySelector('.main-shadow')?.addEventListener('click', ()=>{
                mEl?.classList.remove('main-shadow');
                setModal(!modal)
            })
        }
    }, [modal])

    return(
        <div className='main-root'>
            <MainHeader />
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

