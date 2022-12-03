import { MainHeader, Comment } from "../../allFiles";
import { useParams, useNavigate } from "react-router-dom";
import React from "react";
import axios, { AxiosError } from "axios";
import "../../styles/community/content.css";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { AiOutlineEye } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { elapsedTime, MilliSecondTime } from "../../utils/date";
// import { connect } from "http2";


export default function Content() {
  const param = useParams();
  const nav = useNavigate();

  const [input, setInput] = React.useState("");
  const [comment, setComment] = React.useState([]);
  const [content, setContent] = React.useState({});

  React.useEffect(() => {
    (async () => {
      try {
        setContent((await getPost()).data);
      } catch (error) {
        if (error instanceof AxiosError && error.response.status === 404) {
          alert("게시글을 찾을 수 없습니다");
          nav("/community");
        }
      }
    })();
  }, []);

  React.useEffect(() => {
    (async () => {
      try {
        setComment((await getComment()).data.comments);
        console.log((await getComment()).data.comments);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const postComment = async () => {
    console.log(input);
    if (input !== null) {
      const data = {
        depth: 0,
        parentId: 0,
        content: input,
      };
      try {
        await axios.post(`/api/board/comment/${param.postId}`, data);
        setInput("");
        setComment((await getComment()).data.comments);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const deletePost = () => {
    axios.delete(`/api/board/post/${param.postId}`);
    nav("/community");
  };

  const modifyPost = () => {
    nav(`/post/modify/${param.postId}`);
  }

  const getPost = () => {
    return axios.get(`/api/board/post/${param.postId}`);
  };

  const getComment = () => {
    return axios.get(`/api/board/comment/${param.postId}`);
  };

  const deleteComment = async (id) => {
    axios.delete(`/api/board/comment/${param.postId}/${id}`);
    try {
      setComment((await getComment()).data.comments);
    } catch (error) {
      console.log(error);
    }
  }

  const getTextColorByBackgroundColor = (hexColor) => {
    const rgb = parseInt(hexColor, 16)
    const r = (rgb >> 16) & 0xff
    const g = (rgb >> 8) & 0xff
    const b = (rgb >> 0) & 0xff
    const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b
    return luma < 127.5 ? "white" : "black"
    // return luma < 200 ? "white" : "black"
  }

  console.log(getTextColorByBackgroundColor())

  return (
    <div className="content-root">
      <MainHeader />
      <div className="content">
        <div className="content-header" style={{ backgroundColor: "#" + content.teamColor, color: getTextColorByBackgroundColor(content.teamColor) }}>
          <h1 className="content-title">{content.title}</h1>
          <p className="content-nickname">{content.nickname}</p>
          <div className="content-info">
            <AiOutlineEye size={16} />
            &nbsp;
            <span className="content-info-view">{content.hit}</span>
            <FaRegComment size={12} />
            &nbsp;
            <span className="content-info-view">{content.commentCnt}</span>
            <span className="content-info-date">{elapsedTime(content.createdAt, MilliSecondTime.MONTH)}</span>
          </div>
        </div>
        <div>
          <h2 className="content-sub">프로젝트 소개</h2>
          <p
            className="content-content"
            dangerouslySetInnerHTML={{ __html: content.content }}
          />
          <h2 className="content-sub">모집 분야</h2>
          <p
            className="content-content"
          >{content.field}</p>
        </div>
      </div>
      <div className="read-comment-root">
        {comment.map((value) => {
          if (value.deleted !== true) {
            return <Comment postId={param.postId} comment={value} deleteComment={deleteComment} />
          }
          else {
            return <div className="deleted-comment">
              <p>삭제된 댓글입니다.</p>
            </div>
          }
        })}
      </div>
      <div className="write-comment">
        <CKEditor
          editor={ClassicEditor}
          data={input}
          onChange={(event, editor) => {
            const data = editor.getData();
            setInput(data);
          }}
        />
        <div className="comment-button-div">
          <button onClick={postComment} className="write-comment-button">
            작성
          </button>
          {content.permission && (
            <div>
              <button onClick={deletePost} className="delete-button">
                글 삭제
              </button>
              <button onClick={modifyPost} className="modify-button">
                글 수정
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
