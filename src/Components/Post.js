import React, { useState, useEffect } from "react";
import { MainHeader } from "../allFiles";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import "../styles/Post.css";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";

function Post() {
  const param = useParams();
  const location = useLocation();
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const nav = useNavigate();
  useEffect(() => {
    if (param.mode === 'modify') {
      axios.get(`/api/board/post/${param.postId}`)
        .then((response) => {
          return response;
        }).then((data) => {
          setTitle(data.data.title);
          setContent(data.data.content);
        })
    }
  }, [])

  const writePost = async () => {
    try {
      const newPost = {
        category: 'normal',
        title: title,
        content: content,
      }
      await axios.post('/api/board/post', newPost);
      console.log(newPost);
      nav('/community');
    } catch (error) {
      console.log(error);
    }
  }

  const modifyPost = async () => {
    try {
      const modifyPost = {
        category: 'normal',
        title: title,
        content: content,
      }
      await axios.put(`/api/board/post/${param.postId}`, modifyPost);
      nav("/community");
    } catch (error) {
      console.log(error);
    }
  }

  const noticePost = async () => {
    try {
      const response = await axios.post('/api/board/post/team', {
        category: 'notice',
        title: `[공지사항] ${title}`,
        content: content,
        teamId: location.state.teamId
      })
      console.log(response);
      nav(`/team/${location.state.teamId}`);
    } catch (error) {
      console.log(error);
    }
  }

  const cancelPost = () => {
    nav('/community');
  }


  return (
    <div>
      <MainHeader />
      <div className="Post-div">
        <div className="Post-title-div">
          {param.mode === 'post' ? <h1 className="Post-title">글쓰기</h1> : (param.mode === 'modify' ? <h1 className="Post-title">글수정</h1> : <h1 className="Post-title">공지사항</h1>)}
          <input name={title} onChange={e => setTitle(e.target.value)} value={title} className="input-title" />
        </div>
        <CKEditor
          editor={ClassicEditor}
          data={content}
          onChange={(event, editor) => {
            const data = editor.getData();
            setContent(data);
          }}
        />
        <div className="Post-btn-div">
          <button onClick={cancelPost}>취소</button>
          {param.mode === 'post' ? <button onClick={writePost}>글작성</button> : (param.mode === 'modify' ? <button onClick={modifyPost}>글수정</button> : <button onClick={noticePost}>글작성</button>)}
        </div>
      </div>
    </div>
  );
}

export default Post;
