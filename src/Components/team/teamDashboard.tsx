import { useNavigate, useParams } from "react-router-dom";
import '../../styles/team/dashboard.css'
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction";
import { FormEvent, useLayoutEffect, useState} from "react";
import { ajax, HttpMethod } from "../../utils/ajax";
import { TodoType } from "./todo/TodoType";
import { Alarm } from "../../types/alarm";
import Modal from "react-modal";

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

interface Link {
    id: number;
    teamId: string;
    title: string;
    link: string;
}

export default function TeamDashboard() {
  const nav = useNavigate();
  const param = useParams();
  const [todoList, setTodoList] = useState<TodoType[]>([]);
  const [alarmList, setAlarmList] = useState<Alarm[]>([]);
  const [upcomingList, setUpcomingList] = useState<UpcomingSchedule[]>([]);
  const [scheduleList, setScheduleList] = useState<Schedule[]>([]);
  const [linkList, setLinkList] = useState<Link[]>([]);
  const [createLinkModal, setCreateLinkModal] = useState<boolean>(false);
  const [newLink, setNewLink] = useState<string>('');
  const [newLinkTitle, setNewLinkTitle] = useState<string>('');
  Modal.setAppElement("#root");

    useLayoutEffect(() => {
        getDashboardInfo();
    }, [param.teamId]);

    const getDashboardInfo = async () => {
        const [todos, alarms, schedules, upcomings, links] = await Promise.all([
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
            }),
            ajax<Link[]>({
                url: `/api/link/${param.teamId}`,
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
        setLinkList(links);
    }

    const createLink = async (e: FormEvent) => {
        e.preventDefault();
        await ajax({
            url: '/api/link',
            method: HttpMethod.POST,
            payload: {
                teamId: param.teamId,
                title: newLinkTitle,
                link: newLink
            }
        });
        setNewLinkTitle('');
        setNewLink('');
        setCreateLinkModal(false);

        const links = await ajax<Link[]>({
            url: `/api/link/${param.teamId}`,
            method: HttpMethod.GET
        });
        setLinkList(links);
    }

    return (
        <div className="dashboard scroll-bar">
            <div className="dashboard--top-wrap">
                <div className="dashboard--content todo scroll-bar" onClick={() => nav(`/team/${param.teamId}/todo`)}>
                    <h4>Todos</h4>
                    <ul>{
                        todoList.map(todo => (
                            <li className="dashboard--item">
                                <p className="item-title">
                                    {todo.completed && <span className="todo-completed">[완료됨]</span>}
                                    {todo.title}
                                </p>
                                <p className="item-content">{todo.todo}</p>
                            </li>
                        ))
                    }</ul>
                </div>
                <div className="dashboard--content alarm scroll-bar">
                    <h4>알림</h4>
                    <ul>{
                        alarmList.map(alarm => (
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
                            upcomingList.map(upcoming => {
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
                        <div className="rows">
                            <h4>바로가기</h4>
                            <span className='add' onClick={() => setCreateLinkModal(true)}>+</span>
                        </div>
                        <ul>{
                            linkList.map(link => (
                                <li className="dashboard--item">
                                    <a target='_blank' rel='noopener noreferrer' className="item-title" href={link.link}>{link.title}</a>
                                </li>
                            ))
                        }</ul>
                        <Modal
                            isOpen={createLinkModal}
                            onRequestClose={() => setCreateLinkModal(false)}
                            style={{
                                overlay: {
                                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                                    zIndex: 100,
                                },
                                content: {
                                    width: "320px",
                                    height: "250px",
                                    margin: "auto",
                                    borderRadius: "20px",
                                    overflowX: "hidden",
                                },
                            }}
                        >
                            <h1>바로가기 링크 생성</h1>
                            <form onSubmit={createLink} className='create-link-box'>
                                <input
                                    type="text"
                                    placeholder="제목 입력"
                                    name="link"
                                    required
                                    value={newLinkTitle}
                                    onChange={(e) => setNewLinkTitle(e.target.value)}
                                />
                                <input
                                    type="text"
                                    placeholder="바로가기 링크 입력"
                                    name="link"
                                    required
                                    value={newLink}
                                    onChange={(e) => setNewLink(e.target.value)}
                                />
                                <button type="submit">확인</button>
                            </form>
                        </Modal>
                    </div>
                </div>
            </div>
        </div>
    );
}