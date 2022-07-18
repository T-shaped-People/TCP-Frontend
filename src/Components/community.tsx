import axios from "axios";
import React from "react";
import Sidebar from "./Sidebar"
import { TeamHeader } from "../allFiles";
import '../styles/community.css'
import { User } from "../types/user";

interface CommunityProps{
    user: User
}

export default function Community(props: CommunityProps){
    return (
        <main className="community--main">
            <TeamHeader user={props.user} />
            <Sidebar />
            <div className="community_container">
            <h1 className="title">커뮤니티</h1>
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
            </span>
            <span className="board">
                <h3 className="board--title">신규 프로젝트 ‘검은 마법사’ 에서 프론트엔드를 모집합니다</h3>
                <span className="board--stack"></span>
                <span className="board--recruit">2/10 명 모집중</span>
                <span className="board--date">2022-02-04</span>
            </span>
            </div>
        </main>
    )
}