import React, { useEffect, useState } from "react";
import { TiPlus } from "react-icons/ti";
import { TeamHeader, Sidebar, SecSideBar } from "../../allFiles";
import "../../styles/team/Todo.css";
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

interface teamMember {
  usercode: number;
  teamId: string;
  nickname: string;
}

function MyTodo({ teamId, func }: { teamId: string; func: any }) {
  const [userCode, setUserCode] = useState(0);
  const [teamMemberList, setTeamMemberList] = useState<teamMember[]>([]);

  const postTodo = async () => {
    try {
      console.log(userCode);
      const result = await axios.post("/api/todo/upload", input);
      const mentionResult = await axios.post("/api/todo/mention", {
        todoId: result.data.id,
        teamId: teamId,
        mentionUsercode: userCode,
      });
      console.log(mentionResult);
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

  const selectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    console.log(value);
    setUserCode(Number(value));
  };

  const getMemberList = async () => {
    try {
      const response = await axios(`/api/team/${teamId}/member`);
      setTeamMemberList(response.data);
    } catch (error) {
      console.log(error);
    }
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
        <li className="mytodo-li">
          <span className="mytodo-span">언급하기</span>
          <select
            className="mytodo-input"
            value={userCode}
            name="mention"
            onFocus={() => getMemberList()}
            onChange={(e) => {
              selectChange(e);
            }}
          >
            <option value={0}></option>
            {teamMemberList.map((item) => {
              return (
                <option value={item.usercode} key={item.usercode}>
                  {item.nickname}
                </option>
              );
            })}
          </select>
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
            overflowX: "hidden",
          },
        }}
      >
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
      </Modal>
    </div>
  );
};

function Todo() {
  const [myTodoModal, setMyTodoModal] = useState(false);
  const [todo, setTodo] = useState<Todo[]>([]);
  const [allTodo, setAllTodo] = useState<Todo[]>([]);
  const [isCompletedTodo, setIsCompletedTodo] = useState([false, false]);
  const [todoIndex, setTodoIndex] = useState(0);
  // const [isCompletedTodo, setIsCompletedTodo] = useState(false);
  const param = useParams();

  const addMyTodo = () => {
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
          {myTodoModal && <MyTodo teamId={param.teamId} func={addMyTodo} />}
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
                onClick={addMyTodo}
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

export default Todo;
