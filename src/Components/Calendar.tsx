import {TeamHeader, SecSideBar, Sidebar} from '../allFiles';
import "../styles/calendar.css"
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction";
function Calendar() {

    const handleDateClick = (arg: any) => {
        const calEl = document.querySelector(`[role="gridcell"][data-date="${arg.dateStr}"] .fc-daygrid-day-events`);
        const plan = prompt('입력하고 싶은 내용을 적어주세요');
        if(calEl === null) return;
        calEl.innerHTML = plan??"";
    }
    
    return(
        <div className={"calendar-root"}>
            <TeamHeader/>
            <Sidebar/>
            <div className={"sideAndSide"}>
                <SecSideBar/>
                <div className={"calendar"}>
                    <FullCalendar
                        plugins={[dayGridPlugin, interactionPlugin]}
                        dateClick={handleDateClick}
                        initialView="dayGridMonth"
                        eventDisplay={'block'}
                        eventTextColor={'#FFF'}
                        eventColor={'#F2921D'}
                        height={'100%'}
                    />
                </div>
            </div>
        </div>
    )
}
export default Calendar;
