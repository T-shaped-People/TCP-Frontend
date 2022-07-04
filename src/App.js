import React from 'react';
import Main from './Components/Main';
import Canvas from './Components/Canvas';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import BeforeLogin from "./Components/BeforeLogin";
import Sidebar from "./Components/Sidebar";
import Community from './Components/community';
import Nav from "./Components/Nav";
import Calendar from "./Components/Calendar";
import './styleComponents/App.css';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path={"/Main"} element={<Main />}/>
                <Route path={"/canvas"} element={<Canvas />}/>
                <Route path={"/"} element={<BeforeLogin />}></Route>
                <Route path={"/sidebar"} element={<Sidebar/>}></Route>
                <Route path={"/community"} element={<Community/>}></Route>
                <Route path={"/navbar"} element={<Nav/>}></Route>
                <Route path={"/calendar"} element={<Calendar/>}></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;