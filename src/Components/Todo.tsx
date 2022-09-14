import React, { useEffect, useState } from "react";
import { TiPlus } from "react-icons/ti";
import { TeamHeader, Sidebar, SecSideBar } from "../allFiles";
import "../styles/Todo.css";
import axios from "axios";
import { useParams } from "react-router-dom";

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
    const result = await axios.post("/api/todo/upload", input);
    if (result != null) {
      func();
    } else {
      setText("실패했습니다.");
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
        <li className="mytodo-li">
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
        <li className="mytodo-li">
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
        <li className="mytodo-li">
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

const TodoList = ({ item }: { item: Todo }) => {
  console.log(item);
  const { title, completed, todo } = item;
  const [complete, setComplete] = useState("완료됨");
  // useEffect(() => {
  //   completed ? setComplete("완료됨") : setComplete("진행중");
  // }, []);
  return (
    <div>
      <div className="Todo-content-list-line">
        <span className="Todo-content-list-line-todo">{title}</span>
        <span className="Todo-content-list-line-complete">{complete}</span>
      </div>
    </div>
  );
};

function Todo() {
  const [myTodoModal, setMyTodoModal] = useState(false);
  const [todo, setTodo] = useState<Todo[]>([]);
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
  }, []);

  const getTodo = () => {
    return axios.get(`/api/todo/${param.teamId}`);
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
          {myTodoModal ? (
            <MyTodo teamId={param.teamId} func={addMyTodo}></MyTodo>
          ) : (
            <></>
          )}
          <div className="Todo-content">
            <div className="Todo-content-header">
              <h1 className="Todo-content-title">MY TODO</h1>
              <TiPlus size={24} onClick={addMyTodo} />
            </div>
            <div className="Todo-content-list">
              {todo.map((item: Todo) => {
                return <TodoList item={item} key={item.id} />;
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