import axios from "axios";
import { useState, useContext, useEffect } from "react";
import { TeamMemberType } from "../../../types/todo";
import { UserContext } from "../../../App";

type MyTodoType = {
  teamId: string;
  toggleMyTodoModal: () => void;
};

type InputStateType = {
  title: string;
  todo: string;
  endAt: string;
  teamId: string;
};

const MyTodo = ({ teamId, toggleMyTodoModal }: MyTodoType) => {
  const initialInputState: InputStateType = {
    title: "",
    todo: "",
    endAt: "",
    teamId: teamId,
  };

  const [userCode, setUserCode] = useState<number>(0);
  const [teamMemberList, setTeamMemberList] = useState<TeamMemberType[]>([]);
  const [input, setInput] = useState<InputStateType>(initialInputState);
  const [text, setText] = useState<string>("");
  const user = useContext(UserContext);

  const postTodo = async () => {
    try {
      const result = await axios.post("/api/todo/upload", input);
      let mentionResult;
      if(userCode !== 0) { 
        mentionResult = await axios.post("/api/todo/mention", {
          todoId: result.data.id,
          teamId: teamId,
          mentionUsercode: userCode,
        });
      }
      if (result || mentionResult) {
        toggleMyTodoModal();
      } else {
        setText("실패했습니다.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const changeData = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
    setUserCode(Number(value));
  };

  useEffect(() => {
    const getMemberList = async () => {
      try {
        const response = await axios(`/api/team/${teamId}/member`);
        let newMemberList = response.data;
        newMemberList.splice(
          newMemberList.findIndex(
            (item: any) => user.usercode === Number(item.usercode)
          ),
          1
        );
        setTeamMemberList(newMemberList);
      } catch (error) {
        console.log(error);
      }
    };
    getMemberList();
  }, [teamId, user.usercode]);

  return (
    <div className="mytodo-root">
      <div className="mytodo-header">
        <h1 className="mytodo-title">할 일 등록</h1>
        <div className="mytodo-button" onClick={toggleMyTodoModal}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
      </div>
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
            onChange={(e) => {
              selectChange(e);
            }}
          >
            <option disabled selected hidden>
              언급할 팀원을 선택하세요
            </option>
            {teamMemberList.map((item) => {
              return (
                <option value={item.usercode} key={item.usercode}>
                  {item.nickname}
                </option>
              );
            })}
          </select>
        </li>
        <div>
          <div className="mytodo-button-div">
            <div className="mytodo-button-cancel" onClick={toggleMyTodoModal}>
              취소
            </div>
            <div className="mytodo-button-submit" onClick={postTodo}>
              등록
            </div>
          </div>
        </div>
      </ul>
      <span>{text}</span>
    </div>
  );
};

export default MyTodo;
