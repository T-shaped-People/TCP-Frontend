export interface Chat {
    id: number;
    roomId: string;
    deleted: boolean;
    usercode: number;
    nickname: string;
    date: Date;
    content: string;
}