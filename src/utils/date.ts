export enum MilliSecondTime {
    YEAR = 1000 * 60 * 60 * 24 * 365,
    MONTH = 1000 * 60 * 60 * 24 * 30,
    DAY = 1000 * 60 * 60 * 24,
    HOUR = 1000 * 60 * 60,
    MINUTE = 1000 * 60 * 60,
}

export const elapsedTime = (time: string, maxTime?: number | MilliSecondTime): string | null => {
    const diff = (new Date().getTime() - new Date(time).getTime());
    if (maxTime && diff >= maxTime) return new Date(time).toLocaleDateString();
    const times = [
        {name: "년", time: 1000 * 60 * 60 * 24 * 365},
        {name: "개월", time: 1000 * 60 * 60 * 24 * 30},
        {name: "일", time: 1000 * 60 * 60 * 24},
        {name: "시간", time: 1000 * 60 * 60},
        {name: "분", time: 1000 * 60},
    ];
    for (const value of times) {
        const betweenTime = Math.floor(diff / value.time);
        if (betweenTime > 0) return `${betweenTime}${value.name} 전`;
    }
    return "방금 전";
}
