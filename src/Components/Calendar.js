import {TeamHeader, SecSideBar, Sidebar} from '../allFiles';
import "../styles/calendar.css"
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction";
function Calendar() {

    const handleDateClick = (arg) => {
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
                        editable={true}
                        initialView="dayGridMonth"
                        eventDisplay={'block'}
                        eventTextColor={'#FFF'}
                        eventColor={'#F2921D'}
                        height={'100%'}
                        events={[
                            {
                              title: 'All Day Event',
                              start: '2022-08-15'
                            },
                            {
                              title: 'Long Event',
                              start: '2020-02-07',
                              end: '2022-08-20'
                            },
                            {
                              groupId: 999,
                              title: 'Repeating Event',
                              start: '2022-08-25T16:00:00'
                            },
                            {
                              groupId: 999,
                              title: 'Repeating Event',
                              start: '2022-08-26T16:00:00'
                            },
                        ]}
                    />
                </div>
            </div>
        </div>
    )
}
export default Calendar;
