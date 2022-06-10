import React from 'react';
import Main from './Components/Main';
import Canvas from './Components/Canvas';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import BeforeLogin from "./Components/BeforeLogin";
import Nav from "./Components/Nav";
import Calendar from "./Components/Calendar";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path={"/Main"} element={<Main />}/>
                <Route path={"/canvas"} element={<Canvas />}/>
                <Route path={"/"} element={<BeforeLogin />}></Route>
                <Route path={"/navbar"} element={<Nav/>}></Route>
                <Route path={"/calender"} element={<Calendar/>}></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
