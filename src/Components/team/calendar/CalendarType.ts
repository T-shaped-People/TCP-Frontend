import React from "react";

export interface CalendarIn {
    closeModal: (modal: ModalType, setModal: React.Dispatch<React.SetStateAction<ModalType>>) => void
    modal: {isOpen: boolean}
    setModal: React.Dispatch<React.SetStateAction<{isOpen: boolean}>>
    teamId: string;
}

export interface ModalType{
    id?: number
    isOpen: boolean
}

export interface CalendarScheduleListType {
    id: number
    usercode: string
    teamId: string
    startDate: string
    endDate: string
    content: string
}

export interface CalendarScheduleType {
    title: string
    start: string
    end: string
}

export interface CalendarInputType {
    teamId: string
    endDate: string
    startDate: string
    content: string
}