import React, { useState, useEffect } from "react";
import { MainHeader } from "../../allFiles";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import "../../styles/community/Post.css";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useForm } from 'react-hook-form'
function Post() {
  const param = useParams();
  const location = useLocation();
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [color, setColor] = useState('');
  const nav = useNavigate();
  const {
    register,
    handleSubmit,
  } = useForm();
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

  const writePost = async (data) => {
    try {
      const newPost = {
        category: 'normal',
        title: data.title,
        description: data.description,
        content: content,
        field: data.field,
        teamColor: color,
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

  const onChangeColor = (e) => {
    // if (/[0-9a-fA-F]{1,6}/g.test(e.target.value)) {
    setColor(e.target.value)
    // }
  }

  return (
      <div>
        <MainHeader />
        <form onSubmit={handleSubmit((data) => writePost(data))}>
          <div className="Post-div">
            <div className="Post-title-div">
              {param.mode === 'post' ? <h1 className="Post-title">글쓰기</h1> : (param.mode === 'modify' ? <h1 className="Post-title">글수정</h1> : <h1 className="Post-title">공지사항</h1>)}
              <h2 className="post-sub">제목</h2>
              <input {...register('title')} className="input-title" placeholder="제목" />
              <h2 className="post-sub">한 줄 소개</h2>
              <input {...register('description')} className="input-title" placeholder="한 줄 소개" />
              <div className="post-div-short">
                <h2 className="post-sub-short">모집 분야</h2>
                <input {...register('field')} className="input-title-short" placeholder="모집 분야" /><br />
              </div>
              <div className="post-div-short">
                <h2 className="post-sub-short">팀 컬러</h2>
                <div className="content-color" style={{ backgroundColor: '#' + (color ? color : '000') }}></div>
                <input value={color} maxLength='6' className="input-title-short" placeholder="000000" onChange={(e) => onChangeColor(e)} />
              </div>
              <h2 className="post-sub">팀 상세 설명</h2>
            </div>
            <CKEditor
                editor={ClassicEditor}
                // {...register('content')}
                data={content}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setContent(data);
                }}
            />
            <div className="Post-btn-div">
              <button onClick={cancelPost}>취소</button>
              {param.mode === 'post' ? <button type="submit" onClick={writePost}>글작성</button> : (param.mode === 'modify' ? <button onClick={modifyPost}>글수정</button> : <button onClick={noticePost}>글작성</button>)}
            </div>
          </div>
        </form>
      </div >
  );
}

export default Post;