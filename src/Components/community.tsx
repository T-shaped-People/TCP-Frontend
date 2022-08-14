import axios from "axios";
import React from "react";
import Sidebar from "./Sidebar"
import { TeamHeader } from "../allFiles";
import '../styles/community.css'
import { User } from "../types/user";
import QueryString from "qs";

interface CommunityProps{
    user: User
}

export default function Community(props: CommunityProps){

    const [content, setContent] = React.useState();
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

    const test = () =>{
        
        const data = {
            category: 'normal',
            title: '테스트',
            content: '테스트 글입니다'
        }

        axios.post('/api/board/post', data)
        .then(function (response) {
            console.log('성공');
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    return (
        <main className="community--main">
            <TeamHeader user={props.user} />
            <Sidebar />
            <div className="community_container">
                <h1 className="title">커뮤니티</h1>
                <button onClick={test}>테스트</button>
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
                
            </div>
        </main>
    )
}