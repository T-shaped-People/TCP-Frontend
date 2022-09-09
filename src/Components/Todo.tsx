import React, { useEffect, useState } from "react";
import { TiPlus } from "react-icons/ti";
import { TeamHeader, Sidebar, SecSideBar } from "../allFiles";
import "../styles/Todo.css";
import axios from "axios";
import { useParams } from "react-router-dom";

function MyTodo({teamId} : {teamId: string}) {
  return(
    <div>

    </div>
  )
}


function Todo() {
  const [myTodoModal, setMyTodoModal] = useState(false);
  const [todo, setTodo] = useState({
    text: "1페이지 수정 후 업로드",
    complete: "진행 예정",
  });
  const { text, complete } = todo;
  const param = useParams();

  const addMyTodo = () => {
    setMyTodoModal((prev) => !prev);
  }

  useEffect(()=>{

  }, [])

  const getTodo = () =>{
    return axios.get(`/api/todo/${param.teamId}`);
  }
  return (
    <div className="Todo-root">
      <TeamHeader />
      <Sidebar />
      <SecSideBar />
      <div className="Todo">
        <div className="Todo-title-div">
          <h1 className="Todo-title">TODO</h1>
        </div>
        <div className="Todo-content-div">
          <div className="Todo-content">
            <div className="Todo-content-header">
              <h1 className="Todo-content-title">MY TODO</h1>
              <TiPlus size={24} onClick={addMyTodo} />
            </div>
            {myTodoModal ? <MyTodo teamId={param.teamId}></MyTodo> : <></>}
            <div className="Todo-content-list">
              <div className="Todo-content-list-line">
                <span className="Todo-content-list-line-todo">{text}</span>
                <span className="Todo-content-list-line-complete">
                  {complete}
                </span>
              </div>
              <div className="Todo-content-list-line">
                <span className="Todo-content-list-line-todo">{text}</span>
                <span className="Todo-content-list-line-complete">
                  {complete}
                </span>
              </div>
            </div>
          </div>
          <div className="Todo-content">
            <h1 className="Todo-content-title">MY TODO</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Todo;
