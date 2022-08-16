import axios from "axios";
import React from "react";
import { TeamHeader, Sidebar } from "../allFiles";
import '../styles/community.css'
import { User } from "../types/user";
import { useNavigate } from 'react-router-dom';

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

    const [post, setPost] = React.useState<Post[]>([],);
    const [page, setPage] = React.useState(1);

    const nav = useNavigate();

    React.useEffect(()=>{
        axios.get(`/api/board/post?category=normal&limit=5&page=${page}`)
        .then((response)=>{
            return response;
        }).then((data)=>{
            console.log(data.data.posts);
            setPost(data.data.posts);
        })
    }, [page])

    return (
        <main className="community--main">
            <TeamHeader user={props.user} />
            <Sidebar />
            <div className="community_container">
                <h1 className="title">커뮤니티</h1>
                {post.map((value) => {
                    const date = value.createdAt.substring(0,10)
                    return(
                        <span className="board" onClick={()=>{
                            nav('/content', {state: value.id});
                        }}>
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