import React from 'react';
import Main from './Components/Main';
import Canvas from './Components/Canvas';
import {BrowserRouter, Route, Routes} from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path={"/"} element={<Main />}/>
                <Route path={"/canvas"} element={<Canvas />}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
