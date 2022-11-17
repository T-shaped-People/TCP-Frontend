import axios from "axios";
import React from "react";
import { MainHeader, Sidebar, LoadingPage } from "../../allFiles";
import "../../styles/community/community.css";
import { TiPlus } from "react-icons/ti";
import { Link, useNavigate } from "react-router-dom";

interface Post {
  category: string;
  commendCnt: number;
  createdAt: string;
  hit: number;
  id: number;
  nickname: string;
  title: string;
  usercode: number;
  img: string;
}
export default function Community() {
  const [post, setPost] = React.useState<Post[]>([]);
  const [page, setPage] = React.useState(1);

  const nav = useNavigate();

  React.useEffect(() => {
    axios
      .get(`/api/board/post?category=normal&limit=5&page=${page}`)
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
            {post.map((value) => {
              const date = value.createdAt.substring(0, 10);
              return (
                <div
                  className="board"
                  onClick={() => {
                    nav(`/content/${value.id}/${page}`);
                  }}
                >
                  <img src={value.img} alt="팀 모집 사진"></img>
                  <h3 className="board--title">{value.title}</h3>
                  <span>{value.nickname}</span>
                  {/* <span className="board--stack"></span>
                  <span className="board--recruit"></span> */}
                  <span className="board--date">{date}</span>
                </div>
              );
            })}
          </div>
        </div>
    </main>
  );
}
