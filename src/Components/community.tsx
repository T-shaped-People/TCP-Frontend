import axios from "axios";
import React from "react";
import { MainHeader, Sidebar, LoadingPage } from "../allFiles";
import "../styles/community.css";
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
}
export default function Community() {
  const [post, setPost] = React.useState<Post[]>([]);
  const [page, setPage] = React.useState(1);
  const [loading, setLoading] = React.useState(false);

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
        setLoading(true);
      });
  }, [page]);

  return (
    <main className="community--main">
      <MainHeader />
      {loading ? (
        <div className="community_container">
          <div className="community-top">
            <h1 className="title">팀원 모집</h1>
            <Link to={"/post"}>
              <TiPlus size={48} display="inline" className="writePost" color="black"/>
            </Link>
          </div>
          {post.map((value) => {
            const date = value.createdAt.substring(0, 10);
            return (
              <span
                className="board"
                onClick={() => {
                  nav(`/content/${value.id}/${page}`);
                }}
              >
                <h3 className="board--title">{value.title}</h3>
                <span className="board--stack"></span>
                <span className="board--recruit"></span>
                <span className="board--date">{date}</span>
              </span>
            );
          })}
        </div>
      ) : (
        <LoadingPage />
      )}
    </main>
  );
}
