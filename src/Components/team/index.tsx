import "../../styles/team/base.css";
import { Route, Routes } from "react-router-dom";
import { Calendar, Canvas, Chat, Notice, TeamHeader, Todo } from "../../allFiles";
import TeamDashboard from "./teamDashboard";

export default function Team() {

    return (
        <>
            <TeamHeader />
            <section className="team-section">
                <Routes>
                    <Route path={"canvas"} element={<Canvas />} />
                    <Route path={"notice/:postId"} element={<Notice />}></Route>
                    <Route path={"todo"} element={<Todo />}></Route>
                    <Route path={"calendar"} element={<Calendar />}></Route>
                    <Route path={":roomId/chatting"} element={<Chat />}></Route>
                    <Route path={""} element={<TeamDashboard />}></Route>
                </Routes>
            </section>
        </>
    );
}