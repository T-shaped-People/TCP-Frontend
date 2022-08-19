import { MainHeader, Sidebar } from "../allFiles";
import { useParams, useNavigate } from "react-router-dom";
import React from "react";
import axios, { AxiosError } from "axios";
import "../styles/content.css";
import { UserContext } from "../App";

interface CommentType {
  id: number; // 댓글 id
  deleted: boolean; // 삭제된 댓글이면 true 아니면 false
  usercode: number; // 댓글 작성자의 유저 코드
  nickname: string; // 댓글 작성자의 닉네임
  depth: number; // 댓글의 깊이, 0 이면 그냥 댓글, 0 이상이면 대댓글
  createdAt: string; // 작성 날짜
  content: string; // 댓글의 내용
  permission: boolean; // 댓글 삭제 권한
}

export default function Content() {
  const param = useParams();
  const nav = useNavigate();
  const user = React.useContext(UserContext);

  const input = React.useRef<any>();
  const [deleted, setDeleted] = React.useState(false); // 삭제는 게시글 작성자만 가능
  const [reload, setReload] = React.useState(true); // 댓글 재요청용
  const [comment, setComment] = React.useState<CommentType[]>([]); // 댓글
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
        if (user.usercode === (await getPost()).data.usercode) setDeleted(true);
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
  }, [reload]);

  const postComment = () => {
    console.log(input.current.value);
    if (input.current.value !== null) {
      const data = {
        depth: 0,
        parentId: 0,
        content: input.current.value,
      };
      axios
        .post(`/api/board/comment/${param.postId}`, data)
        .then((response) => {
          console.log("성공");
        })
        .catch((e) => {
          console.log(e);
        });
      input.current.value = "";
    }
  };

  const reloadComment = () => {
    setReload(!reload);
  };

  const deletePost = () => {
    axios.delete(`/api/board/post/${param.postId}`);
  };

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
        <p className="content-content">{content.content}</p>
        <div className="write-comment">
          <textarea className="write-comment-input" ref={input} />
          <div className="comment-button-div">
            <button onClick={reloadComment} className="reload-button">
              댓글 새로고침
            </button>
            <button onClick={postComment} className="write-comment-button">
              작성
            </button>
            {deleted ? (
              <button onClick={deletePost} className="delete-button">
                글 삭제
              </button>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="read-comment-root">
          {comment.map((value) => {
            if (value.deleted !== true) {
              return (
                <div className="read-comment">
                  <span className="read-comment-nickname">
                    {value.nickname}
                  </span>
                  <span className="read-comment-date">{value.createdAt}</span>
                  <span className="read-comment-content">{value.content}</span>
                </div>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
}
