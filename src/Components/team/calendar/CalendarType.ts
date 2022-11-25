export interface CalendarIn {
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