import React from 'react';
import { MainHeader } from '../allFiles';
import '../styles/makeProject.css';

export default function MakeProject()
{
    const [modal, setModal] = React.useState(false);
    const [name, setName] = React.useState('');
    const [explain, setExplain] = React.useState('');
    const [date, setDate] = React.useState('');


    const showInfo = () =>{
        console.log(name, explain, date);
        setName('');
        setExplain('');
        setDate('');
        setModal(!modal);
    }

    return(
        <div className='makeProject-root'>
            <MainHeader/>
            <div className='makeProject-div'>
                <h1 className='makeProject-title'>팀 만들기</h1>
                <div className='makeProject-flex'>
                    <h2 className='makeProject-subtitle'>새 팀을 만들어보세요</h2>
                    <div className='makeProject-table'>
                        <div className='makeProject-tr'>
                            <span className='makeProject-td'>팀 이름</span>
                            <input type="text" className='makeProject-input' onChange={(e)=>{setName(e.target.value)}} value={name} />
                        </div>
                        <div className='makeProject-tr'>
                            <span className='makeProject-td'>팀 설명</span>
                            <textarea className='makeProject-textarea' onChange={(e)=>{setExplain(e.target.value)}} value={explain} />
                        </div>
                        <div className='makeProject-tr'>
                            <span className='makeProject-td'>프로젝트 마감일시</span>
                            <input type="date" className='makeProject-input' onChange={(e)=>{setDate(e.target.value)}} value={date} />
                        </div>
                    </div>
                    <button className='makeProject-button' onClick={showInfo}>팀 만들기</button>
                </div>
            </div>
        </div>
    )
}