import { Link, useNavigate, useParams } from "react-router-dom";
import '../../styles/team/team.css'
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { TeamSide } from "../../allFiles";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Team() {
    const nav = useNavigate();
    const param = useParams();

    const [todo, setTodo] = useState([]);
    const [calendar, setCalendar] = useState([]);
    const [upcoming, setUpcoming] = useState([]);
    const [team, setTeam] = useState({});

    const getDateDiff = (d1, d2) => {
        const date1 = new Date(d1);
        const date2 = new Date(d2);
        const diffDate = date1.getTime() - date2.getTime();
    
        return Math.abs(diffDate / (1000 * 60 * 60 * 24)); // 밀리세컨 * 초 * 분 * 시 = 일
      };

    useEffect(() => {
        (async()=>{
            const todo = (await axios.get(`/api/todo/incompleted/${param.teamId}`)).data;
            setTodo(todo);
            const calendar = (await axios.get(`/api/calendar/${param.teamId}`)).data;
            const newArray = [];
            calendar.map((value)=>{
                const newSchedule = {
                    title: value.content,
                    start: value.startDate.substring(0, 10),
                    end: value.endDate.substring(0, 10),
                }
                newArray.push(newSchedule);
            });
            setCalendar(newArray);
            const upcoming = (await axios.get(`/api/calendar/upcoming/${param.teamId}`)).data;
            setUpcoming(upcoming);
            const team = (await axios.get(`/api/team/${param.teamId}`)).data;
            setTeam(team);
            const d_day = getDateDiff(team.startDate, team.deadline);
            setTeam((prev) => ({...prev, d_day: d_day}));
        })();
    }, [])

    return (
        <div className="team-root">
            <TeamSide />
            <div className="team-title">
                <h1>{team.name}</h1>
                <span>마감까지 D-{team.d_day}</span>
            </div>
            <div className="team">
                <div className="team-div1">
                    <div className="team-todo" onClick={() => {
                        nav(`/team/${param.teamId}/todo`)
                    }}>
                        <div className="team-mytodo">
                            <p>My Todo</p>
                            {todo.filter((value, i) => i < 4).map((value) => {
                                return (
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
                    <div className="team-calendar" onClick={() => {
                        nav(`calendar`)
                    }}>
                        <div className="team-calendar-size">
                            <FullCalendar
                                plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
                                headerToolbar={{
                                  left: 'prev,next today',
                                  center: 'title',
                                  right: 'dayGridMonth,timeGridWeek,timeGridDay'
                                }}
                                editable={true}
                                initialView="dayGridMonth"
                                weekends={true}
                                eventDisplay={'block'}
                                eventTextColor={'#FFF'}
                                eventColor={'#F2921D'}
                                height={'100%'}
                                events={calendar}
                            />
                        </div>
                        <div className="team-calendar-text">
                            <p>예정된 일정</p>
                            {upcoming.filter((_, i)=> i < 4).map((value)=>(
                                <p>{value.content}</p>
                            ))}
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