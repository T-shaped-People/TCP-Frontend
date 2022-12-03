import "../../../styles/team/calendar.css"
import React from "react";
import axios from "axios";
import { ModalType } from './CalendarType'

interface DeleteCalendarPropsType {
    modal: ModalType
    close:  (modal: ModalType, setModal: React.Dispatch<React.SetStateAction<ModalType>>) => void
    setModal:  React.Dispatch<React.SetStateAction<ModalType>>
}

export default function DeleteCalendar({ modal, close, setModal }: DeleteCalendarPropsType){
    
    console.log(modal);

    const CalendarDelete = async () => {
        try{
            await axios.delete(`/api/calendar/${modal.id}`)
            close(modal, setModal);
        }catch(error){
            console.log(error)
        }
    }

    return(
        <div className={"delete-calendar"}>
            <p className="delete-calendar-title">정말 삭제하시겠습니까?</p>
            <div className="delete-calendar-check">
                <button className="delete-calendar-button" onClick={CalendarDelete}>예</button>
                <button className="delete-calendar-button" onClick={()=> close(modal, setModal) }>아니요</button>
            </div>
        </div>
    )
}