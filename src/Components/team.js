import { Link, useNavigate, useParams } from "react-router-dom";
import '../styles/team.css'
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction";
import { TeamSide } from "../allFiles";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Team()
{
    const nav = useNavigate();
    const param = useParams();

    const [todo, setTodo] = useState([]);
 
    useEffect(()=>{ 
        axios.get(`/api/todo/incompleted/${param.teamId}`)
        .then((response)=>{
            return response
        }).then((data)=>{
            setTodo(data.data);
        })
    }, [])
    
    return(
        <div className="team-root">
            <TeamSide/>
            <div className="team-title">
                <h1>프로젝트 명</h1>
                <span>마감까지 D-기한</span>
            </div>
            <div className="team">
                <div className="team-div1">
                    <div className="team-todo" onClick={()=>{
                        nav(`/team/${param.teamId}/todo`)
                    }}>
                        <div className="team-mytodo">
                            <p>My Todo</p>
                            {todo.map((value)=>{
                                return(
                                    <div className="team-mytodo-list">
                                        <p className="team-mytodo-title">{value.title}</p>
                                        <p className="team-mytodo-text">{value.todo}</p>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className="team-alarm">
                        <p>알람</p>
                        <p>누구가 당신한테 이것을 하였습니다.</p>
                        <p>공지사항이 추가되었습니다.</p>
                    </div>
                </div>
                <div className="team-div2"> 
                    <div className="team-calendar" onClick={()=>{
                        nav(`calendar`)
                    }}>
                        <div className="team-calendar-size">
                            <FullCalendar
                                plugins={[dayGridPlugin, interactionPlugin]}
                                editable={true}
                                initialView="dayGridMonth"
                                eventDisplay={'block'}
                                eventTextColor={'#FFF'}
                                eventColor={'#F2921D'}
                                height={'100%'}
                            />
                        </div>
                        <div className="team-calendar-text">
                            <p>예정된 일정</p>
                            <p>00일: 이거하기</p>
                            <p>00일: 저거하기</p>
                        </div>
                    </div>
                    <div className="team-notice">
                        <p>공지사항</p>
                        <p>2022-09-01 까지 페이지 개발 기능 중심으로 합시다.</p>
                    </div>
                    <div className="team-direct">
                        <p>바로가기</p>
                        <Link to="https://www.figma.com/file/X60Jy15c8mHbCHmM31bZaT/tcp-design">피그마</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}