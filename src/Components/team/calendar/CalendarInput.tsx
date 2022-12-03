import React, {useState} from "react";
import axios from "axios";
import { ModalType } from './CalendarType'

interface CalendarIn{
    closeModal: (modal: ModalType, setModal: React.Dispatch<React.SetStateAction<ModalType>>) => void
    modal: {isOpen: boolean}
    setModal: React.Dispatch<React.SetStateAction<{isOpen: boolean}>>
    teamId: string;
}

export default function CalendarInput({ closeModal, modal, setModal, teamId }: CalendarIn) {
    const [input, setInput] = useState({
        teamId: teamId,
        endDate: "",
        startDate: "",
        content: "",
    });

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

    const uploadSchedule = async () => {
        closeModal(modal, setModal);
        if (input.content !== "" && input.startDate !== "" && input.endDate !== "") {
            await axios.post(`/api/calendar/upload/`, input);
        } else {
            input.content = "";
            input.endDate = "";
            input.startDate = "";
        }
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
                        value={input.content}
                        onChange={(e) => { onChange(e) }}
                    />
                </li>
                <li className='calendar-input-ul-li'>
                    <p>시작</p>
                    <input
                        className="calendar-input-ul-li-input"
                        type="date"
                        name="startDate"
                        value={input.startDate}
                        onChange={(e) => { onChange(e) }}
                    />
                </li>
                <li className='calendar-input-ul-li'>
                    <p>끝</p>
                    <input
                        className="calendar-input-ul-li-input"
                        type="date"
                        name="endDate"
                        value={input.endDate}
                        onChange={(e) => { onChange(e) }}
                    />
                </li>
                <button className='calendar-button' onClick={uploadSchedule}>추가</button>
            </ul>
        </div>
    )
}