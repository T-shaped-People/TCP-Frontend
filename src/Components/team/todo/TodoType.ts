export interface TodoType {
    id: number;
    completed: boolean;
    nickname: string;
    createdAt: string;
    endAt: string;
    title: string;
    todo: string;
}

export interface TeamMemberType {
    usercode: number;
    teamId: string;
    nickname: string;
}