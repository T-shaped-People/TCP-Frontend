import {TeamHeader, SecSideBar, Sidebar} from '../allFiles';
import "../styles/calendar.css"
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { AiOutlinePlusSquare } from 'react-icons/ai'
import Modal from 'react-modal';

function CalendarInput({ closeModal, setRefreshCalendar, setInput, input })
{
  const onChange = (
    e
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
    setRefreshCalendar((prev)=>!prev);
  }

  return(
    <div className='calendar-input'>
      <ul className='calendar-input-ul'>
        <li className='calendar-input-ul-li'>
          <p>일정 내용</p>
          <input type="text" name="content" value={input.title} onChange={(e)=>{onChange(e)}} />
        </li>
        <li className='calendar-input-ul-li'>
          <p>시작</p>
          <input type="date" name="startDate" value={input.start} onChange={(e)=>{onChange(e)}} />
        </li>
        <li className='calendar-input-ul-li'>
          <p>끝</p>
          <input type="date" name="endDate" value={input.end} onChange={(e)=>{onChange(e)}} />
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

    useEffect(()=>{
      (async()=>{
        try{
          if(input.content !== "" && input.startDate !== "" && input.endDate !== ""){
            console.log(input);
            await axios.post(`/api/calendar/upload/`, input);
          }
          else{
            input.content = "";
            input.endDate = "";
            input.startDate = "";
          }
          const newArray = [];
          const viewCalendar = (await getCalendar()).data;
          viewCalendar.map((value) => {
            const newSchedule = {
              title: value.content,
              start: value.startDate.substring(0, 10),
              end: value.endDate.substring(0, 10),
            }
            newArray.push(newSchedule);
          })
          setSchedule(newArray);
        }catch(error){
          console.log(error);
        }
      })();
    }, [refreshCalendar])

    const testPostCalendar = async () => {
      try{
        const data = {
          teamId: param.teamId,
          endDate: '2022-09-15',
          startDate: '2022-09-13',
          content: '테스트5',
        }
        await axios.post('/api/calendar/upload', data);
      }catch(error){
        console.log(error);
      }
    }

    const getCalendar = async () => {
      return axios.get(`/api/calendar/${param.teamId}`);
    } 

    const closeModal = () => {
      setModal(false);
    }

    const openModal = () =>{
      setModal(true);
    }

    return(
        <div className={"calendar-root"}>
            <TeamHeader/>
            <Sidebar/>
            <div className={"sideAndSide"}>
                <SecSideBar/>
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
            <button onClick={testPostCalendar}>클릭</button>
        </div>
    )
}