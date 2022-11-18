import axios from "axios";
import { useState } from "react";
import { Todo, teamMember } from "./TodoType";

function MyTodo({ teamId, toggleMyTodoModal }: { teamId: string; toggleMyTodoModal: any }) {
    const [userCode, setUserCode] = useState(0);
    const [teamMemberList, setTeamMemberList] = useState<teamMember[]>([]);
  
    const postTodo = async () => {
      try {
        const result = await axios.post("/api/todo/upload", input);
        const mentionResult = await axios.post("/api/todo/mention", {
          todoId: result.data.id,
          teamId: teamId,
          mentionUsercode: userCode,
        });
        if (result != null) {
          toggleMyTodoModal();
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
        <div className="mytodo-header">
          <h1 className="mytodo-title">할 일 등록</h1>
          <div
            className="mytodo-button"
            onClick={() => { toggleMyTodoModal(); }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
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
          <div>
            <div className="mytodo-button-div">
              <div
                className="mytodo-button-cancel"
                onClick={() => { toggleMyTodoModal(); }}
              >
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
}

export default MyTodo;
