import { CalendarIn } from "./CalendarType";

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
        setRefreshCalendar((prev: boolean) => !prev);
    }

    return (
        <div className='calendar-input'>
            <ul className='calendar-input-ul'>
                <p>일정 추가하기</p>
                <li className='calendar-input-ul-li'>
                    <p>일정 내용</p>
                    <input 
                        className="calendar-input-ul-li-input"
                        type="text" 
                        name="content" 
                        value={input.title} 
                        onChange={(e) => { onChange(e) }} 
                    />
                </li>
                <li className='calendar-input-ul-li'>
                    <p>시작</p>
                    <input 
                        className="calendar-input-ul-li-input"
                        type="date" 
                        name="startDate" 
                        value={input.start}
                        onChange={(e) => { onChange(e) }} 
                    />
                </li>
                <li className='calendar-input-ul-li'>
                    <p>끝</p>
                    <input 
                        className="calendar-input-ul-li-input"
                        type="date" 
                        name="endDate" 
                        value={input.end} 
                        onChange={(e) => { onChange(e) }} 
                    />
                </li>
                <button className='calendar-button' onClick={uploadSchedule}>추가</button>
            </ul>
        </div>
    )
}

export default CalendarInput;
