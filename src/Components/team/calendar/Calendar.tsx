import "../../../styles/team/calendar.css"
import FullCalendar, {EventClickArg, EventDropArg} from '@fullcalendar/react';
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { EventResizeDoneArg } from "@fullcalendar/interaction";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { AiOutlinePlusSquare } from 'react-icons/ai'
import Modal from 'react-modal';
import CalendarInput from "./CalendarInput";
import { CalendarScheduleListType, CalendarScheduleType, ModalType} from "./CalendarType";
import DeleteCalendar from "./deleteCalendar";
import { CreateScheduleModalStyle, DeleteScheduleModalStyle } from "../../../styles/team/GeneralModalStyle";

export default function Calendar() {

    const [schedule, setSchedule] = useState([]);
    const [modal, setModal] = useState({
        isOpen: false
    });
    const [refreshCalendar, setRefreshCalendar] = useState(false);
    const param = useParams();
    const [deleteModal, setDeleteModal] = useState<ModalType>({
        id: "",
        isOpen: false
    });

    const getEventColor = (id: number) => {
        const colors = ["#6554C0", "#4FCBDF", "#EC994B", "#36B37E"];
        return colors[id % colors.length];
    }

    useEffect(() => {
        (async () => {
            try {
                const newArray: CalendarScheduleType[] = [];
                const viewCalendar: CalendarScheduleListType[] = (await getCalendar()).data;
                viewCalendar.map((value: CalendarScheduleListType) => {
                    const newSchedule = {
                        id: value.id,
                        title: value.content,
                        start: value.startDate.substring(0, 10),
                        end: value.endDate.substring(0, 10),
                        color: getEventColor(value.id)
                    }
                    newArray.push(newSchedule);
                })
                setSchedule(newArray);
            } catch (error) {
                console.log(error);
            }
        })();
    }, [refreshCalendar]);

    const getCalendar = async () => {
        return axios.get(`/api/calendar/${param.teamId}`);
    }

    const closeModal = (modal: ModalType, setModal: React.Dispatch<React.SetStateAction<ModalType>>) => {
        try{
            const newModal = {
                ...modal,
                isOpen: false,
            }
            setModal(newModal);
            setRefreshCalendar((prev) => !prev);
        }catch(error){
            console.log(error)
        }
    }

    const openModal = () => {
        setModal({
            isOpen: true
        });
    }

    const ScheduleDrag = (event: (EventDropArg | EventResizeDoneArg)) => {
        const {start, end} = event.event._instance.range;
        const {publicId, title} = event.event._def
        const convertStart: Array<string> = ((start.toLocaleDateString()).replaceAll(' ', '')).split('.')
        const convertEnd: Array<string> = ((end.toLocaleDateString()).replaceAll(' ', '')).split('.')

        const newStart = `${convertStart[0]}-${convertStart[1].padStart(2, "0")}-${convertStart[2].padStart(2, "0")}`
        const newEnd = `${convertEnd[0]}-${convertEnd[1].padStart(2, "0")}-${convertEnd[2].padStart(2, "0")}`

        axios.put('/api/calendar', {
            id: publicId,
            endDate: newEnd,
            startDate: newStart,
            content: title
        })
    }

    const deleteSchedule = (event: EventClickArg) => {
        const { publicId } = event.event._def
        const newDel = {
            id: publicId,
            isOpen: true,
        }
        setDeleteModal(newDel);
    }

    return (
        <div className={"calendar-root"}>
            <div className={"calendar"}>
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
                    height={'100%'}
                    events={schedule}
                    eventDrop={ScheduleDrag}
                    eventResize={ScheduleDrag}
                    eventClick={deleteSchedule}
                />
            </div>
            <div className='add-calendar' onClick={openModal}>
                <span>일정 추가</span>
                <AiOutlinePlusSquare className='add-calendar-plus' />
            </div>
            <Modal
                isOpen={modal.isOpen}
                onRequestClose={() => closeModal(modal, setModal)}
                style={CreateScheduleModalStyle}
                className="popup">
                <CalendarInput closeModal={closeModal} modal={modal} setModal={setModal} teamId={param.teamId} />
            </Modal>
            <Modal
                isOpen={deleteModal.isOpen}
                onRequestClose={() => closeModal(deleteModal, setDeleteModal)}
                style={DeleteScheduleModalStyle}
                className={"popup"}
            >
                <DeleteCalendar modal={deleteModal} close={closeModal} setModal={setDeleteModal} />
            </Modal>
        </div>
    );
}