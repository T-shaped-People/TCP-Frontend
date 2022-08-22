import React, { createContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  Chatting,
  MakeProject,
  Canvas,
  Community,
  BeforeLogin,
  Calendar,
  Content,
  NotFound,
  MakeTeam,
  MyTeam,
  JoinTeam,
} from "./allFiles";
import axios, { AxiosError } from "axios";
import "./styles/App.css";

const userInfo = {
  isLogin: false,
  usercode: 0,
  nickname: "",
  enrolled: 0,
  grade: 0,
  classNo: 0,
  studentNo: 0,
  name: "",
  email: "",
};

export const UserContext = createContext(userInfo);

function App() {
  const [user, setUser] = React.useState(userInfo);

  React.useEffect(() => {
    (async () => {
      try {
        setUser({
          ...(await getUserInfo()).data,
          isLogin: true,
        });
      } catch (error) {
        if (error instanceof AxiosError && error.response?.status === 401) {
          setUser((prev) => ({ ...prev, isLogin: false }));
        }
      }
    })();
  }, []);

  const getUserInfo = () => {
    return axios.get("/api/user", { withCredentials: true });
  };

  return (
    <BrowserRouter>
      <UserContext.Provider value={user}>
        <Routes>
          <Route path={"/"} element={<BeforeLogin />} />
          <Route path={"/makeproject"} element={<MakeProject />} />
          <Route path={"/canvas"} element={<Canvas />} />
          <Route path={"/community"} element={<Community />}></Route>
          <Route path={"/calendar"} element={<Calendar />}></Route>
          <Route path={"/chatting"} element={<Chatting />}></Route>
          <Route path={"/content/:postId/:page"} element={<Content />}></Route>
          <Route path={"*"} element={<NotFound />} />
          <Route path={"/maketeam"} element={<MakeTeam />}></Route>
          <Route path={"/team"} element={<MyTeam />}></Route>
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
