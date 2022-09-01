import { useState } from "react";
import axios, { AxiosError } from "axios";
import "../styles/JoinTeam.css";

function JoinTeam({ onClick }: { onClick: any }) {
  const [code, setCode] = useState("");
  const [isConfirm, setIsConfirm] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [text, setText] = useState('');

  const confirm = async () => {{
    if(code.length < 6) setText('팀 코드가 잘못됐습니다.');
    else{
      try{
        await axios.post('/api/team/join', {
          teamCode: code,
        });
        setIsCorrect(true);
      }catch(e){
        if (e instanceof AxiosError) {
          const error = e.response.status;
          switch(error){
            case 409: setText('이미 가입된 팀입니다.'); break;
            case 404: setText('팀이 없습니다.'); break;
          }
        }
      }
    }
    }
    setIsConfirm(true);
  };

  return (
    <div className="modal" onClick={onClick}>
      <div className="JoinTeam-div" onClick={(e) => e.stopPropagation()}>
        {/* <h1>팀 만들기</h1> */}
        <div>
          <h2>팀 코드를 입력해주세요.</h2>
        </div>
        <div className="JoinTeam-input-div">
          <input
            type="text"
            maxLength={6}
            value={code || ""}
            onChange={(e) => setCode(e.target.value)}
            className="JoinTeam-input"
            placeholder="코드 입력"
          ></input>
          {isConfirm &&
            (isCorrect ? (
              onClick()
            ) : (
              <span className="JoinTeam-notCorrect">
                {text}
              </span>
            ))}
        </div>
        <button className="JoinTeam-confirm" onClick={() => confirm()}>
          확인
        </button>
      </div>
    </div>
  );
}

export default JoinTeam;