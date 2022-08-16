import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Chatting, Main, Canvas, Community, BeforeLogin, Calendar, Content} from './allFiles';
import axios, { AxiosError } from 'axios';
import './styles/App.css';

function App() {
    const [user, setUser] = React.useState({
        isLogin: false,
        usercode: 0,
        nickname: '',
        enrolled: 0,
        grade: 0,
        classNo: 0,
        studentNo: 0,
        name: '',
        email: ''
    });

    React.useEffect(() => {
        (async () => {
            try {
                setUser({
                    ...(await getUserInfo()).data,
                    isLogin: true
                });
            } catch (error) {
                if (error instanceof AxiosError && error.response?.status == 401) {
                    setUser(prev => ({...prev, isLogin: false}));
                }
            }
        })();
    }, []);

    const getUserInfo = () => {
        return axios.get('/api/user', {withCredentials: true}); 
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<BeforeLogin user={user} />}></Route>
                <Route path={"/Main"} element={<Main user={user} />}/>
                <Route path={"/canvas"} element={<Canvas user={user} />}/>
                <Route path={"/community"} element={<Community user={user} />}></Route>
                <Route path={"/calendar"} element={<Calendar user={user} />}></Route>
                <Route path={"/chatting"} element={<Chatting user={user} />}></Route>
                <Route path={"/content"} element={<Content user={user}/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;