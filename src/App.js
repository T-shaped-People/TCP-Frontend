import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import './styles/App.css';
import {Chatting, Main, Canvas, Community, BeforeLogin, Calendar} from './allFiles';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path={"/Main"} element={<Main />}/>
                <Route path={"/canvas"} element={<Canvas />}/>
                <Route path={"/"} element={<BeforeLogin />}></Route>
                <Route path={"/community"} element={<Community/>}></Route>
                <Route path={"/calendar"} element={<Calendar/>}></Route>
                <Route path={"/chatting"} element={<Chatting/>}></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;