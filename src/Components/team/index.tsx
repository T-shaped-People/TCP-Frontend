import { Route, Routes } from "react-router-dom";
import { Calendar, Canvas, Chatting, NotFound, Notice, TeamHeader, Todo } from "../../allFiles";
import TeamDashboard from "./teamDashboard";

export default function Team() {

    return (
        <>
            <TeamHeader />
            <Routes>
                <Route path={"canvas"} element={<Canvas />} />
                <Route path={"notice/:postId"} element={<Notice />}></Route>
                <Route path={"todo"} element={<Todo />}></Route>
                <Route path={"calendar"} element={<Calendar />}></Route>
                <Route path={":roomId/chatting"} element={<Chatting />}></Route>
                <Route path={""} element={<TeamDashboard />}></Route>
            </Routes>
        </>
    );
}