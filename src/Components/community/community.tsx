import axios from "axios";
import React from "react";
import { MainHeader, Sidebar, LoadingPage } from "../../allFiles";
import "../../styles/community/community.css";
import { TiPlus } from "react-icons/ti";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEye } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";

interface Post {
  category: string;
  commentCnt: number;
  createdAt: string;
  hit: number;
  id: number;
  nickname: string;
  title: string;
  usercode: number;
  img: string;
  description: string;
}
export default function Community() {
  const [post, setPost] = React.useState<Post[]>([]);
  const [page, setPage] = React.useState(1);

  const nav = useNavigate();

  React.useEffect(() => {
    axios
      .get(`/api/board/post?category=normal&limit=15&page=${page}`)
      .then((response) => {
        return response;
      })
      .then((data) => {
        console.log(data.data.posts);
        setPost(data.data.posts);
      });
  }, [page]);

  return (
    <main className="community--main">
      <MainHeader />
      <div className="community_container">
        <div className="community-top">
          <h1 className="title">팀원 모집</h1>
          <Link to={"/post/post/0"}>
            <TiPlus
              size={48}
              display="inline"
              className="writePost"
              color="black"
            />
          </Link>
        </div>
        <div className="board-root">
          {post.map((item) => {
            const date = item.createdAt.substring(0, 10);
            return (
              <div
                className="board"
                onClick={() => {
                  nav(`/content/${item.id}/${page}`);
                }}
              >
                <img
                  src={"/images/bsmicon.png"}
                  alt="팀 사진"
                  className="board--img"
                />
                <div className="board--card">
                  <div className="board--title--line">
                    <h3 className="board--title">{item.title}</h3>
                  </div>
                  {/* <span className="board--stack"></span>
                  <span className="board--recruit"></span> */}
                  <div className="board--sub--line">
                    <span className="board--nick">by {item.nickname}</span>
                    <AiOutlineEye size={16} />
                    &nbsp;
                    <span className="board--nick">{item.hit}</span>
                    <FaRegComment size={12} />
                    &nbsp;
                    <span className="board--nick">{item.commentCnt}</span>
                  </div>
                  <div className="board--content">{item.description}</div>
                  <span className="board--date">{date}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
