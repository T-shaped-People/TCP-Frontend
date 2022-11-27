import "../../../styles/team/calendar.css"
import React from "react";
import axios from "axios";

interface ModalType{
    id?: number
    isOpen: boolean
}

interface DeleteCalendarPropsType{
    modal: ModalType
    close:  (modal: ModalType, setModal: React.Dispatch<React.SetStateAction<ModalType>>) => void
    setModal:  React.Dispatch<React.SetStateAction<ModalType>>
}

export default function DeleteCalendar({ modal, close, setModal }: DeleteCalendarPropsType){

    const CalendarDelete = () => {
        axios.delete(`/api/calendar/${modal.id}`)
    }

    return(
        <div className={"delete-calendar"}>
            <p>정말 삭제하시겠습니까?</p>
            <div>
                <button onClick={CalendarDelete}>예</button>
                <button onClick={()=> close(modal, setModal) }>아니요</button>
            </div>
        </div>
    )
}