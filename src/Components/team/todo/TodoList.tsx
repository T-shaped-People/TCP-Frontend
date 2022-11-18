import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Todo, teamMember } from "./TodoType";
import Modal from "react-modal";
import axios from "axios";

const TodoList = ({ item }: { item: Todo }) => {

    const { title, completed, todo, nickname, createdAt, endAt, id } = item;
    const [complete, setComplete] = useState("진행중");
    const [modal, setModal] = useState(false);
    const param = useParams();
    let created = createdAt.substring(0, 10);
    let end = endAt.substring(0, 10);
    Modal.setAppElement("#root");
    useEffect(() => {
      completed ? setComplete("완료됨") : setComplete("진행중");
    }, [item]);
  
    const completeTodo = async () => {
      try {
        await axios.put(`/api/todo/modify/${param.teamId}/${id}`);
        setModal(false);
      } catch (error) {
        console.log(error);
      }
    };
    return (
      <div>
        <div className="Todo-content-list-line" onClick={() => setModal(true)}>
          <span className="Todo-content-list-line-todo">{title}</span>
          <span className="Todo-content-list-line-date">{created}</span>
          <span className="Todo-content-list-line-complete">{complete}</span>
        </div>
        <Modal
          isOpen={modal}
          onRequestClose={() => setModal(false)}
          style={{
            overlay: {
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              zIndex: 100,
            },
            content: {
              width: "400px",
              height: "500px",
              margin: "auto",
              borderRadius: "20px",
              borderStartEndRadius: "20px",
              overflowX: "hidden",
              boxShadow: "0 1px 2px rgba(0, 0, 0, 0.40)"
            },
          }}
        >
          <>
            <div className="modal-top">
              <h1 className="modal-title">{title}</h1>
              <div className="modal-btn" onClick={() => completeTodo()}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div className="modal-info">
              <span className="modal-nickname">{nickname}</span>
              <span className="modal-date">
                {created} ~ {end}
              </span>
            </div>
            <div className="modal-content">{todo}</div>
          </>
        </Modal>
      </div>
    );
  };

export default TodoList;