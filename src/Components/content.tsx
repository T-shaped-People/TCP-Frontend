import { TeamHeader, Sidebar } from '../allFiles';
import { useLocation } from 'react-router-dom';
import React from 'react';
import axios from 'axios'
import '../styles/content.css';

export default function Content()
{
    const state = useLocation();
    console.log(state);

    const [content, setContent] = React.useState({
        commentCnt: 0,
        content: '',
        createAt: '',
        hit: 0,
        id: 0,
        nickname: '',
        permission: true,
        title: '',
        usercode: 0,
    });

    React.useEffect(()=>{
        axios.get(`/api/board/post/${state.state}`)
        .then((response)=>{
            return response;
        })
        .then((data)=>{
            console.log(data.data);
            setContent(data.data);
            console.log(content);
        })
    }, [content, state.state])

    return(
        <div className="content-root">
            <TeamHeader/>
            <Sidebar/>
            <div className="content">
                <h1>{content.title}</h1>
                <p>{content.nickname}</p>
                <p>{content.content}</p>
            </div>
        </div>
    )
}