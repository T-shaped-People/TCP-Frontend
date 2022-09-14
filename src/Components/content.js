import { MainHeader } from "../allFiles";
import { useParams, useNavigate } from "react-router-dom";
import React from "react";
import axios, { AxiosError } from "axios";
import "../styles/content.css";
import { UserContext } from "../App";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

// interface CommentType {
//   id: number; // 댓글 id
//   deleted: boolean; // 삭제된 댓글이면 true 아니면 false
//   usercode: number; // 댓글 작성자의 유저 코드
//   nickname: string; // 댓글 작성자의 닉네임
//   depth: number; // 댓글의 깊이, 0 이면 그냥 댓글, 0 이상이면 대댓글
//   createdAt: string; // 작성 날짜
//   content: string; // 댓글의 내용
//   permission: boolean; // 댓글 삭제 권한
// }

export default function Content() {
  const param = useParams();
  const nav = useNavigate();
  const user = React.useContext(UserContext);

  // const input = React.useRef<any>();
  const [input, setInput] = React.useState("");
  // const [deleted, setDeleted] = React.useState(false); // 삭제는 게시글 작성자만 가능
  const [comment, setComment] = React.useState([]); // 댓글
  const [content, setContent] = React.useState({
    // 글
    commentCnt: 0,
    content: "",
    createdAt: "",
    hit: 0,
    id: 0,
    nickname: "",
    permission: true,
    title: "",
    usercode: 0,
  });

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
        <div className="write-comment">
          {/* <textarea
            className="write-comment-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          /> */}
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
      <div className="read-comment-root">
        {comment.map((value) => {
          if (value.deleted !== true) {
            return (
              <div className="read-comment">
                <p className="read-comment-nickname">{value.nickname}</p>
                <p className="read-comment-date">{value.createdAt}</p>
                <p className="read-comment-content">{value.content}</p>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}
