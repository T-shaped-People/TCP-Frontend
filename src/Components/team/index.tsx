import { Route, Routes } from "react-router-dom";
import { Calendar, Canvas, Chatting, NotFound, Notice, TeamHeader, Todo } from "../../allFiles";
import TeamDashboard from "./teamDashboard";

export default function Team() {

    return (
        <>
            <TeamHeader />
            <Routes>
                <Route path={":teamId/canvas"} element={<Canvas />} />
                <Route path={"*"} element={<NotFound />} />
                <Route path={":teamId/notice/:postId"} element={<Notice />}></Route>
                <Route path={":teamId/todo"} element={<Todo />}></Route>
                <Route path={":teamId/calendar"} element={<Calendar />}></Route>
                <Route path={":teamId/:roomId/chatting"} element={<Chatting />}></Route>
                <Route path={":teamId"} element={<TeamDashboard />}></Route>
            </Routes>
        </>
      );
}