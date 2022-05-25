import React from 'react';
import Main from './Components/Main';
import Login from './Components/Login';
import {BrowserRouter, Route, Routes} from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<Main />}/>
                <Route path={"/login"} element={<Login />}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
