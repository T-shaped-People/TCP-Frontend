import axios from "axios";
import React from "react";
import Sidebar from "./Sidebar"
import { TeamHeader } from "../allFiles";
import '../styles/community.css'
import { User } from "../types/user";

interface CommunityProps{
    user: User
}

interface Post{
    category: string,
    commendCnt: number,
    createdAt: string,
    hit: number,
    id: number,
    nickname: string,
    title: string,
    usercode: number,
}

export default function Community(props: CommunityProps){

    const [content, setContent] = React.useState<Post[]>([],);
    const [page, setPage] = React.useState(1);

    React.useEffect(()=>{
        axios.get(`/api/board/post?category=normal&limit=5&page=${page}`)
        .then((response)=>{
            return response;
        }).then((data)=>{
            console.log(data.data.posts);
            setContent(data.data.posts);
        })
    }, [page])


    return (
        <main className="community--main">
            <TeamHeader user={props.user} />
            <Sidebar />
            <div className="community_container">
                <h1 className="title">커뮤니티</h1>
                {/* <span className="board">
                    <h3 className="board--title">신규 프로젝트 ‘검은 마법사’ 에서 프론트엔드를 모집합니다</h3>
                    <span className="board--stack"></span>
                    <span className="board--recruit">2/10 명 모집중</span>
                    <span className="board--date">2022-02-04</span>
                </span>
                <span className="board">
                    <h3 className="board--title">신규 프로젝트 ‘검은 마법사’ 에서 프론트엔드를 모집합니다</h3>
                    <span className="board--stack"></span>
                    <span className="board--recruit">2/10 명 모집중</span>
                    <span className="board--date">2022-02-04</span>
                </span>
                <span className="board">
                    <h3 className="board--title">신규 프로젝트 ‘검은 마법사’ 에서 프론트엔드를 모집합니다</h3>
                    <span className="board--stack"></span>
                    <span className="board--recruit">2/10 명 모집중</span>
                    <span className="board--date">2022-02-04</span>
                </span>
                <span className="board">
                    <h3 className="board--title">신규 프로젝트 ‘검은 마법사’ 에서 프론트엔드를 모집합니다</h3>
                    <span className="board--stack"></span>
                    <span className="board--recruit">2/10 명 모집중</span>
                    <span className="board--date">2022-02-04</span>
                </span>
                <span className="board">
                    <h3 className="board--title">신규 프로젝트 ‘검은 마법사’ 에서 프론트엔드를 모집합니다</h3>
                    <span className="board--stack"></span>
                    <span className="board--recruit">2/10 명 모집중</span>
                    <span className="board--date">2022-02-04</span>
                </span> */}
                {content.map((value) => {
                    const date = value.createdAt.substring(0,10)
                    return(
                        <span className="board">
                            <h3 className="board--title">{value.title}</h3>
                            <span className="board--stack"></span>
                            <span className="board--recruit"></span>
                            <span className="board--date">{date}</span>
                        </span>
                    )
                })}
            </div>
        </main>
    )
}