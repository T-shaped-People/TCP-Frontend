import React from 'react';
import Main from './Components/Main';
import Canvas from './Components/Canvas';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import BeforeLogin from "./Components/BeforeLogin";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path={"/Main"} element={<Main />}/>
                <Route path={"/canvas"} element={<Canvas />}/>
                <Route path={"/"} element={<BeforeLogin />}></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
