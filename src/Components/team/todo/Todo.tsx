import React, { useEffect, useState } from "react";
import { TiPlus } from "react-icons/ti";
import { TeamHeader, Sidebar, SecSideBar } from "../../../allFiles";
import "../../../styles/team/Todo.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import Modal from "react-modal";
import MyTodo from "./TodoFormModal";
import { Todo , teamMember } from "./TodoType";
import TodoList from "./TodoList";


function TodoContainer() {
  const [myTodoModal, setMyTodoModal] = useState(false);
  const [todo, setTodo] = useState<Todo[]>([]);
  const [isCompletedTodo, setIsCompletedTodo] = useState([false, false]);
  const [todoIndex, setTodoIndex] = useState(0);

  const param = useParams();

  const toggleMyTodoModal = () => {
    setMyTodoModal((prev) => !prev);
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await getTodo(todoIndex);
        setTodo(response.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [isCompletedTodo, myTodoModal, todoIndex]);

  const showCompletedTodo = (index: number) => {
    let newIsCompletedTodo = isCompletedTodo;
    newIsCompletedTodo[index] = !newIsCompletedTodo[index];
    setIsCompletedTodo([...newIsCompletedTodo]);
  };

  const getTodo = (index: number) => {
    if (isCompletedTodo[index])
      return axios.get(`/api/todo/completed/${param.teamId}`);
    else return axios.get(`/api/todo/incompleted/${param.teamId}`);
  };
  return (
    <div className="Todo-root">
      <TeamHeader />
      <Sidebar />
      <SecSideBar />
      <div className="Todo">
        <div className="Todo-title-div">
          <h1 className="Todo-title">Todos</h1>
        </div>
        <div className="Todo-content-div">
          <Modal
            isOpen={myTodoModal}
            onRequestClose={() => setMyTodoModal(false)}
            style={{
              overlay: {
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                zIndex: 100,
              },
              content: {
                width: "45%",
                height: "85%",
                margin: "auto",
                borderRadius: "20px",
                borderStartEndRadius: "20px",
                boxShadow: "0 1px 2px rgba(0, 0, 0, 0.40)"
              },
            }}
          >
            <MyTodo teamId={param.teamId} toggleMyTodoModal={toggleMyTodoModal} />
          </Modal>
          <div className="Todo-content">
            <div className="Todo-content-header">
              <h1 className="Todo-content-title">MY TODO</h1>
              <span
                className="Todo-content-completed"
                onClick={() => {
                  showCompletedTodo(0);
                  setTodoIndex(0);
                }}
              >
                {!isCompletedTodo[0] ? "Completed TODO" : "Incompleted TODO"}
              </span>
              <TiPlus
                size={24}
                onClick={toggleMyTodoModal}
                className="Todo-content-new"
              />
            </div>
            <div className="Todo-content-list">
              {todo.map((item: Todo) => {
                return <TodoList item={item} key={item.id} />;
              })}
            </div>
          </div>
          {/* <div className="Todo-content">
            <div className="Todo-content-header">
              <h1 className="Todo-content-title">ALL TODO</h1>
              <span
                className="Todo-content-completed"
                onClick={() => {
                  showCompletedTodo(1);
                  setTodoIndex(1);
                }}
              >
                {!isCompletedTodo[1] ? "Completed TODO" : "Incompleted TODO"}
              </span>
              <TiPlus
                size={24}
                onClick={addMyTodo}
                className="Todo-content-new"
              />
            </div>
            <div className="Todo-content-list">
              {allTodo.map((item: Todo) => {
                return <TodoList item={item} key={item.id} />;
              })}
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default TodoContainer;
