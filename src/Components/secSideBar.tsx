import React, {useContext} from 'react';
import "../styles/secSideBar.css";
import { UserContext } from "../App";

export default function SecSideBar() {
  const user = useContext(UserContext);
  return (
    <div className={"calendar_sidebar"}>
      <div className="paddingyong">
        <img
          src={"/images/bxs_chat.png"}
          alt={"icon"}
          className={"calendar_sidebar--chaticon"}
        />
        <div className={"calendar_sidebar--side"}>
          <details className={"calendar_sidebar--list"}>
            <summary className={"calendar_sidebar--list--summary"}>
              백엔드
            </summary>
            <ul>
              <li>test</li>
              <li>test2</li>
            </ul>
          </details>
          <details className={"calendar_sidebar--list"}>
            <summary className={"calendar_sidebar--list--summary"}>
              디자인 팀
            </summary>
            <ul>
              <li>test</li>
              <li>test2</li>
            </ul>
          </details>
          <details className={"calendar_sidebar--list"}>
            <summary className={"calendar_sidebar--list--summary"}>
              프론트엔드
            </summary>
            <ul>
              <li>test</li>
              <li>test2</li>
            </ul>
          </details>
        </div>
        <div className={"calendar_sidebar--call"}>
          <img
            src={"/images/phoneicon.png"}
            alt={"icon"}
            className={"calendar_sidebar--callimg"}
          />
          <div className={"calendar_sidebar--call--div"}>
            <div></div>
            <span className={"calendar_sidebar--list"}>백엔드 회의</span>
          </div>
        </div>
        <div className={"calendar_sidebar--codeshare"}>
          <img
            src={"/images/clarity_code-line.png"}
            alt={"icon"}
            className={"calendar_sidebar--codeshareimg"}
          />
          <p className={"calendar_codeshare"}>
            여기를 눌러 새로운 코드 공유방을 생성하세요.
          </p>
        </div>
        <div className={"calendar_sidebar--product"}>
          <img
            src={"/images/clovericon.png"}
            alt={"icon"}
            className={"calendar_sidebar--product--img"}
          />
          <div className={"calendar_sidebar--product--div"}>
            <div>4</div>
            <span className={"calendar_sidebar--list"}>상품 기능 아이디어</span>
          </div>
        </div>
      </div>
      <div className={"calendar_sidebar--user"}>
        <div className={"calendar_sidebar--user--div"}>
          <div className={"calendar_sidebar--userimg"}></div>
          <p className={'secSideBar-nickname'}>{user.nickname}</p>
        </div>
        <div className={"calendar_sidebar--user--icons"}>
          <img
            src={"/images/micicon.png"}
            alt={"icon"}
            className={"calendar_sidebar--user--mic"}
          />
          <img
            src={"/images/headphone.png"}
            alt={"icon"}
            className={"calendar_sidebar--user--head"}
          />
        </div>
      </div>
    </div>
  );
}