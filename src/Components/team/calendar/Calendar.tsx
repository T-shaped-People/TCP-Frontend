import "../../../styles/team/calendar.css"
import FullCalendar, { EventDropArg } from '@fullcalendar/react';
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { EventResizeDoneArg } from "@fullcalendar/interaction";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { AiOutlinePlusSquare } from 'react-icons/ai'
import Modal from 'react-modal';
import { CreateScheduleModalStyle } from "../../../styles/team/GeneralModalStyle";
import CalendarInput from "./CalendarModal";
import { CalendarInputType, CalendarScheduleListType, CalendarScheduleType } from "./CalendarType";

export default function Calendar() {

  const [schedule, setSchedule] = useState<CalendarScheduleType[]>([]);
  const [modal, setModal] = useState<boolean>(false);
  const [refreshCalendar, setRefreshCalendar] = useState<boolean>(false);
  const param = useParams();
  const [input, setInput] = useState<CalendarInputType>({
    teamId: param.teamId,
    endDate: "",
    startDate: "",
    content: "",
  });

  useEffect(() => {
    (async () => {
      try {
        if (input.content !== "" && input.startDate !== "" && input.endDate !== "") {
          console.log(input);
          await axios.post(`/api/calendar/upload/`, input);
        } else {
          input.content = "";
          input.endDate = "";
          input.startDate = "";
        }
        const newArray: CalendarScheduleType[] = [];
        const viewCalendar: CalendarScheduleListType[] = (await getCalendar()).data;
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
    })();
  }, [refreshCalendar]);

  const getCalendar = async () => {
    return axios.get(`/api/calendar/${param.teamId}`);
  }

  const closeModal = () => {
    setModal(false);
  }

  const openModal = () => {
    setModal(true);
  }

  const ScheduleDrag = (event: (EventDropArg | EventResizeDoneArg)) => {
    const { start, end } = event.event._instance.range;
    const { publicId, title } = event.event._def
    const convertStart: Array<string> = ((start.toLocaleDateString()).replaceAll(' ', '')).split('.')
    const convertEnd: Array<string> = ((end.toLocaleDateString()).replaceAll(' ', '')).split('.')

    const newStart = `${convertStart[0]}-${convertStart[1].padStart(2, "0")}-${convertStart[2].padStart(2, "0")}`
    const newEnd = `${convertEnd[0]}-${convertEnd[1]}-${convertEnd[2]}`

    axios.put('/api/calendar', {
      id: publicId,
      endDate: newEnd,
      startDate: newStart,
      content: title
    })
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
          eventColor={'#F2921D'}
          height={'100%'}
          events={schedule}
          eventDrop={ScheduleDrag}
          eventResize={ScheduleDrag}
        />
      </div>
      <div className='add-calendar' onClick={openModal}>
        <span>일정 추가</span>
        <AiOutlinePlusSquare className='add-calendar-plus' />
      </div>
      <Modal
        isOpen={modal}
        onRequestClose={closeModal}
        style={CreateScheduleModalStyle}
        className="popup">
        <CalendarInput closeModal={closeModal} setRefreshCalendar={setRefreshCalendar} setInput={setInput} input={input} />
      </Modal>
    </div>
  );
}