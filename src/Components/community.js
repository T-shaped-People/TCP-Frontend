import axios from "axios";
import {React} from "react";
import Sidebar from "./Sidebar"
import '../styleComponents/community.css'
// import CommunityText from "./communityText";

export default function Community(){
    axios.defaults.withCredentials = true;
    
    let config = {
        method: 'post',
        url: 'http://localhost:3000/api/user/oauth/bsm',
        data: {
            authcode: '2f35b5ccc93b1d8c5aac1c8c1a818b60' 
        }
    };

    (async () => {
        await axios(config).data;

        config = {
            method: 'get',
            url: 'http://localhost:3000/api/user'
        };
        const result = await axios(config);
        console.log(result);
    })();



    return (
        <main className="community--main">
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