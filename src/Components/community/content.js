import { MainHeader, Comment } from "../../allFiles";
import { useParams, useNavigate } from "react-router-dom";
import React from "react";
import axios, { AxiosError } from "axios";
import "../../styles/community/content.css";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

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
 
  const deleteComment = (id) => {
    axios.delete(`/api/board/comment/${param.postId}/${id}`);
  }

  return (
    <div className="content-root">
      <MainHeader />
      <div className="content">
        <div className="content-header">
          <h1 className="content-title">{content.title}</h1>
          <p className="content-nickname">{content.nickname}</p>
          <div className="content-info">
            <span className="content-info-comment">
              댓글: {content.commentCnt}
            </span>
            <span className="content-info-date">{content.createdAt}</span>
          </div>
        </div>
        <p
          className="content-content"
          dangerouslySetInnerHTML={{ __html: content.content }}
        />
      </div>
      <div className="read-comment-root">
        {comment.map((value)=>{
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
