import React, { useState } from "react";
import { TiPlus } from "react-icons/ti";
import { TeamHeader, Sidebar, SecSideBar } from "../allFiles";
import "../styles/Todo.css";

function Todo() {
  const [todo, setTodo] = useState({
    text: "1페이지 수정 후 업로드",
    complete: "진행 예정",
  });
  const { text, complete } = todo;
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
              <TiPlus size={24} />
            </div>
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
