import { Link, useNavigate, useParams } from "react-router-dom";
import '../../styles/team/team.css'
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction";
import { TeamHeader, Sidebar } from "../../allFiles";
import axios from "axios";
import {useEffect, useLayoutEffect, useState} from "react";
import { TiPlus } from "react-icons/ti";

interface UpcomingSchedule {
  id: number
  usercode: number
  teamId: string
  startDate: string
  endDate: string
  content: string
}

interface CalendarScheduleListType{
  id: number
  usercode: string
  teamId: string
  startDate: string
  endDate: string
  content: string
}

interface CalendarScheduleType{
  title: string
  start: string
  end: string
}

export default function Team() {
  const nav = useNavigate();
  const param = useParams();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [todo, setTodo] = useState([]);
  const [notice, setNotice] = useState([]);
  const [upcoming, setUpcoming] = useState<UpcomingSchedule[]>([]);
  const [schedule, setSchedule] = useState([]);

  useLayoutEffect(() => {
    const getTeamInfo = async () => {
      try {
        axios.get(`/api/todo/incompleted/${param.teamId}`)
            .then((response) => {
              return response
            }).then((data) => {
          setTodo(data.data);
        })
        setLoading(true);
        const response = await axios.get(`/api/team/${param.teamId}`);
        const userResponse = await axios.get('/api/user');
        if (response.data.leaderId === userResponse.data.usercode) {
          setIsAdmin(true);
        }
        const noticeResponse = await axios.get(`/api/alarm/${param.teamId}`);
        setNotice(noticeResponse.data);
        const upcoming = await axios.get(`/api/calendar/upcoming/${param.teamId}`)
        setUpcoming(upcoming.data);
        const newArray: CalendarScheduleType[] = [];
        const viewCalendar: CalendarScheduleListType[] = (await axios.get(`/api/calendar/${param.teamId}`)).data;
        viewCalendar.map((value: CalendarScheduleListType) => {
          const newSchedule = {
            id: value.id,
            title: value.content,
            start: value.startDate.substring(0, 10),
            end: value.endDate.substring(0, 10),
          }
          newArray.push(newSchedule);
        })
        setSchedule(newArray);
      } catch (error) {
        console.log(error);
      }
    }
    getTeamInfo();
    setLoading(false);
  }, [param.teamId])

  return (
    <div className="team-root">
      <TeamHeader />
      {/* <div className="team-title">
        <h1>{team.name}</h1>
        <span>마감까지 D-기한</span>
      </div> */}
      <div className="team">
        <div className="team-div1">
          <div className="team-todo" onClick={() => {
            nav(`/team/${param.teamId}/todo`)
          }}>
            <div className="team-mytodo">
              <p>My Todo</p>
              {todo.filter((value, i) => i < 5).map((value) => {
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
                plugins={[dayGridPlugin, interactionPlugin]}
                editable={true}
                headerToolbar={{
                  left: "title",
                  center: "",
                  right: ""
                }}
                initialView="dayGridMonth"
                eventDisplay={'block'}
                eventTextColor={'#FFF'}
                eventColor={'#F2921D'}
                height={'100%'}
                events={schedule}
              />
            </div>
            <div className="team-calendar-text">
              <p>예정된 일정</p>
              {upcoming.map((value: UpcomingSchedule)=>{
                const date = (new Date(value.endDate).toLocaleDateString()).replaceAll(".", '')
                return(
                    <p>{date}까지 : {value.content}</p>
                )
              })}
            </div>
          </div>
          <div className="team-notice">
            <p>공지사항</p>
            {notice.reverse().filter((value, i) => i < 2).map((item) => {
              return <Link to={'/'}>
                <div className="team-notice-list">
                  <span className="team-notice-title">{item.title}</span>
                </div>
              </Link>
            })}
            <Link to={'/post/notice/0'} state={{ teamId: param.teamId }} className='notice-plus'>
              {isAdmin && !loading && <TiPlus size={24} color="black" />}
            </Link>
          </div>

          <div className="team-direct">
            <p>바로가기</p>
            <a href="https://www.figma.com/file/X60Jy15c8mHbCHmM31bZaT/tcp-design">피그마</a>
          </div>
        </div>
      </div>
    </div >
  )
}