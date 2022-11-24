import { useNavigate, useParams } from "react-router-dom";
import '../../styles/team/dashboard.css'
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction";
import { useLayoutEffect, useState} from "react";
import { ajax, HttpMethod } from "../../utils/ajax";
import { TodoType } from "./todo/TodoType";
import { Alarm } from "../../types/alarm";

interface UpcomingSchedule {
  id: number
  usercode: number
  teamId: string
  startDate: string
  endDate: string
  content: string
}

interface RawSchedule {
  id: number
  usercode: string
  teamId: string
  startDate: string
  endDate: string
  content: string
}

interface Schedule {
  title: string
  start: string
  end: string
}

export default function TeamDashboard() {
  const nav = useNavigate();
  const param = useParams();
  const [todoList, setTodoList] = useState<TodoType[]>([]);
  const [alarmList, setAlarmList] = useState<Alarm[]>([]);
  const [upcomingList, setUpcomingList] = useState<UpcomingSchedule[]>([]);
  const [scheduleList, setScheduleList] = useState<Schedule[]>([]);

    useLayoutEffect(() => {
        getDashboardInfo();
    }, [param.teamId]);

    const getDashboardInfo = async () => {
        const [todos, alarms, schedules, upcomings] = await Promise.all([
            ajax<TodoType[]>({
                url: `/api/todo/${param.teamId}`,
                method: HttpMethod.GET
            }),
            ajax<Alarm[]>({
                url: `/api/alarm/${param.teamId}`,
                method: HttpMethod.GET
            }),
            ajax<RawSchedule[]>({
                url: `/api/calendar/${param.teamId}`,
                method: HttpMethod.GET
            }),
            ajax<UpcomingSchedule[]>({
                url: `/api/calendar/upcoming/${param.teamId}`,
                method: HttpMethod.GET
            })
        ]);
        setTodoList(todos);
        setScheduleList(schedules.map(schedule => ({
            id: schedule.id,
            title: schedule.content,
            start: schedule.startDate.substring(0, 10),
            end: schedule.endDate.substring(0, 10),
        })));
        setAlarmList(alarms);
        setUpcomingList(upcomings);
    }

    return (
        <div className="dashboard scroll-bar">
            <div className="dashboard--top-wrap">
                <div className="dashboard--content todo scroll-bar" onClick={() => nav(`/team/${param.teamId}/todo`)}>
                    <h4>Todos</h4>
                    <ul>{
                        todoList.filter((_, i) => i < 5).map(todo => (
                            <li className="dashboard--item">
                                <p className="item-title">{todo.title}</p>
                                <p className="item-content">{todo.todo}</p>
                            </li>
                        ))
                    }</ul>
                </div>
                <div className="dashboard--content alarm scroll-bar">
                    <h4>알림</h4>
                    <ul>{
                        alarmList.filter((_, i) => i < 5).map(alarm => (
                            <li className="dashboard--item">
                                <p className="item-title">{alarm.title}</p>
                            </li>
                        ))
                    }</ul>
                </div>
            </div>
            <div className="dashboard--bottom-wrap">
                <div className="dashboard--content calendar" onClick={() => nav('calendar')}>
                    <FullCalendar
                        plugins={[dayGridPlugin, interactionPlugin]}
                        editable={true}
                        headerToolbar={{
                            left: "title",
                            center: "",
                            right: ""
                        }}
                        eventDisplay={'block'}
                        eventTextColor={'#FFF'}
                        eventColor={'#F2921D'}
                        height={'100%'}
                        events={scheduleList}
                    />
                </div>
                <div className="dashboard--bottom-wrap cols">
                    <div className="dashboard--content upcoming scroll-bar" onClick={() => nav('calendar')}>
                        <h4>다가오는 일정</h4>
                        <ul>{
                            upcomingList.filter((_, i) => i < 5).map(upcoming => {
                                const date = (new Date(upcoming.endDate).toLocaleDateString()).replaceAll(".", '')
                                return (
                                    <li className="dashboard--item">
                                        <p className="item-title">{upcoming.content}</p>
                                        <p className="item-content">{date}까지</p>
                                    </li>
                                );
                            })
                        }</ul>
                    </div>
                    <div className="dashboard--content link scroll-bar">
                        <h4>바로가기</h4>
                        <ul>{
                            upcomingList.filter((_, i) => i < 5).map(upcoming => {
                                const date = (new Date(upcoming.endDate).toLocaleDateString()).replaceAll(".", '')
                                return (
                                    <li className="dashboard--item">
                                        <a className="item-title" href="https://www.figma.com/file/X60Jy15c8mHbCHmM31bZaT/tcp-design">피그마</a>
                                    </li>
                                );
                            })
                        }</ul>
                    </div>
                </div>
            </div>
        </div>
    );
}