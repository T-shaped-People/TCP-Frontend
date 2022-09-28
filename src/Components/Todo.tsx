import React, { useEffect, useState } from "react";
import { TiPlus } from "react-icons/ti";
import { TeamHeader, Sidebar, SecSideBar } from "../allFiles";
import "../styles/Todo.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import Modal from "react-modal";

interface Todo {
  id: number;
  completed: boolean;
  nickname: string;
  createdAt: string;
  endAt: string;
  title: string;
  todo: string;
}

function MyTodo({ teamId, func }: { teamId: string; func: any }) {
  const postTodo = async () => {
    try {
      const result = await axios.post("/api/todo/upload", input);
      if (result != null) {
        func();
      } else {
        setText("실패했습니다.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const changeData = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const nextInput = {
      ...input,
      [name]: value,
    };
    setInput(nextInput);
  };

  const [input, setInput] = useState({
    title: "",
    todo: "",
    endAt: "",
    teamId: teamId,
  });
  const [text, setText] = useState("");

  return (
    <div className="mytodo-root">
      <h1 className="mytodo-title">할 일 등록</h1>
      <ul className="mytodo-ul">
        <li className="mytodo-li-1">
          <span className="mytodo-span">할 일</span>
          <input
            type="text"
            placeholder="할 일명을 입력하세요."
            className="mytodo-input"
            name="title"
            onChange={(e) => {
              changeData(e);
            }}
          />
        </li>
        <li className="mytodo-li-2">
          <span className="mytodo-span">설명</span>
          <textarea
            placeholder="설명을 입력하세요."
            className="mytodo-textarea"
            name="todo"
            onChange={(e) => {
              changeData(e);
            }}
          />
        </li>
        <li className="mytodo-li-3">
          <span className="mytodo-span">마감일</span>
          <input
            type="date"
            className="mytodo-input"
            name="endAt"
            onChange={(e) => {
              changeData(e);
            }}
          />
        </li>
        <div className="mytodo-button-div">
          <button className="mytodo-button" onClick={postTodo}>
            등록
          </button>
          <button
            className="mytodo-button"
            onClick={() => {
              func();
            }}
          >
            취소
          </button>
        </div>
      </ul>
      <span>{text}</span>
    </div>
  );
}

const TodoList = ({
  item,
  modal,
  setModal,
}: {
  item: Todo;
  modal: boolean;
  setModal: any;
}) => {
  const { title, completed, todo, nickname, createdAt, endAt, id } = item;
  const [complete, setComplete] = useState({
    complete: "",
    completeBtn: "",
    disabled: false,
  });
  const param = useParams();
  let created = createdAt.substr(0, 10);
  let end = endAt.substr(0, 10);
  Modal.setAppElement("#root");
  useEffect(() => {
    completed
      ? setComplete({
          complete: "완료됨",
          completeBtn: "완료됨",
          disabled: true,
        })
      : setComplete({
          complete: "진행중",
          completeBtn: "완료하기",
          disabled: false,
        });
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
        <span className="Todo-content-list-line-complete">
          {complete.complete}
        </span>
      </div>
      <Modal
        isOpen={modal}
        onRequestClose={() => setModal(false)}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.1)",
            zIndex: 100,
          },
          content: {
            width: "400px",
            height: "500px",
            margin: "auto",
            borderRadius: "20px",
            overflowX: "hidden",
          },
        }}
      >
        <div className="modal-top">
          <h1 className="modal-title">{title}</h1>
          <button
            className="modal-btn"
            onClick={() => completeTodo()}
            disabled={complete.disabled}
          >
            {complete.completeBtn}
          </button>
        </div>
        <div className="modal-info">
          <span className="modal-nickname">{nickname}</span>
          <span className="modal-date">
            {created} ~ {end}
          </span>
        </div>
        <div className="modal-content">{todo}</div>
      </Modal>
    </div>
  );
};

function Todo() {
  const [myTodoModal, setMyTodoModal] = useState(false);
  const [modal, setModal] = useState(false);
  const [todo, setTodo] = useState<Todo[]>([]);
  const [isCompletedTodo, setIsCompletedTodo] = useState(false);
  const [incompleted, setIncompleted] = useState("Completed TODO");
  const param = useParams();

  const addMyTodo = () => {
    setMyTodoModal((prev) => !prev);
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await getTodo();
        setTodo(response.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [isCompletedTodo, myTodoModal, incompleted, modal]);

  const showCompletedTodo = () => {
    setIsCompletedTodo((prev) => !prev);
    setIncompleted(isCompletedTodo ? "Completed TODO" : "Incompleted TODO");
  };

  const getTodo = () => {
    if (isCompletedTodo)
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
          <h1 className="Todo-title">TODO</h1>
        </div>
        <div className="Todo-content-div">
          {myTodoModal && <MyTodo teamId={param.teamId} func={addMyTodo} />}
          <div className="Todo-content">
            <div className="Todo-content-header">
              <h1 className="Todo-content-title">MY TODO</h1>
              <span
                className="Todo-content-completed"
                onClick={showCompletedTodo}
              >
                {incompleted}
              </span>
              <TiPlus
                size={24}
                onClick={addMyTodo}
                className="Todo-content-new"
              />
            </div>
            <div className="Todo-content-list">
              {todo.map((item: Todo) => {
                return (
                  <TodoList
                    item={item}
                    key={item.id}
                    modal={modal}
                    setModal={setModal}
                  />
                );
              })}
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
