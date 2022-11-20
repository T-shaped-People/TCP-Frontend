import { TeamHeader } from '../../allFiles';
import "../../styles/team/calendar.css"
import FullCalendar, { EventDropArg } from '@fullcalendar/react';
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { EventResizeDoneArg } from "@fullcalendar/interaction";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { AiOutlinePlusSquare } from 'react-icons/ai'
import Modal from 'react-modal';

interface CalendarIn{
  closeModal: () => void
  setRefreshCalendar: React.Dispatch<React.SetStateAction<boolean>>
  setInput: React.Dispatch<React.SetStateAction<{
    teamId: string;
    endDate: string;
    startDate: string;
    content: string;
  }>>
  input: any
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

function CalendarInput({ closeModal, setRefreshCalendar, setInput, input }: CalendarIn) {
  const onChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    const nextInputs = {
      ...input,
      [name]: value,
    };
    setInput(nextInputs);
  }

  const uploadSchedule = () => {
    closeModal();
    setRefreshCalendar((prev) => !prev);
  }

  return (
    <div className='calendar-input'>
      <ul className='calendar-input-ul'>
        <li className='calendar-input-ul-li'>
          <p>일정 내용</p>
          <input type="text" name="content" value={input.title} onChange={(e) => { onChange(e) }} />
        </li>
        <li className='calendar-input-ul-li'>
          <p>시작</p>
          <input type="date" name="startDate" value={input.start} onChange={(e) => { onChange(e) }} />
        </li>
        <li className='calendar-input-ul-li'>
          <p>끝</p>
          <input type="date" name="endDate" value={input.end} onChange={(e) => { onChange(e) }} />
        </li>
        <li className='calendar-input-ul-li'>
          <button className='calendar-button' onClick={uploadSchedule}>추가</button>
        </li>
      </ul>
    </div>
  )
}

export default function Calendar() {

  const [schedule, setSchedule] = useState([]);
  const [modal, setModal] = useState(false);
  const [refreshCalendar, setRefreshCalendar] = useState(false);
  const param = useParams();
  const [input, setInput] = useState({
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
        }
        else {
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
  }, [refreshCalendar])

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
    const {start, end} = event.event._instance.range;
    const {publicId, title} = event.event._def
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
      <TeamHeader />
      <div className={"sideAndSide"}>
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
      </div>
      <div className='add-calendar' onClick={openModal}>
        <span>일정 추가</span>
        <AiOutlinePlusSquare className='add-calendar-plus' />
      </div>
      <Modal
        isOpen={modal}
        onRequestClose={closeModal}
        style={{
          overlay: {
            position: "fixed",
            inset: "0px",
            backgroundColor: "rgba(42, 42, 42, 0.75)",
            zIndex: "4"
          }
        }}
        className="popup">
        <CalendarInput closeModal={closeModal} setRefreshCalendar={setRefreshCalendar} setInput={setInput} input={input} />
      </Modal>
    </div>
  )
}