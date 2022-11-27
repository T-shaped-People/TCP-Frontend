import { useState, useEffect } from "react";
import { TodoType } from "../../../types/todo";
import Modal from "react-modal";
import TodoModal from "./TodoModal";

type TodoListType = {
    item: TodoType
}

const TodoList = ({ item }: TodoListType) => {
    const { title, completed, todo, nickname, createdAt, endAt, id } = item;
    const [complete, setComplete] = useState("진행중");
    const [modal, setModal] = useState(false);
    const created = createdAt.substring(0, 10);
    const end = endAt.substring(0, 10);
    Modal.setAppElement("#root");

    useEffect(() => {
        completed ? setComplete("완료됨") : setComplete("진행 중");
    }, [item, completed]);

    return (
        <div>
            <div className="Todo-content-list-line" onClick={() => setModal(true)}>
                <span className="Todo-content-list-line-todo">{title}</span>
                <span className="Todo-content-list-line-date">{created}</span>
                <span className="Todo-content-list-line-complete">{complete}</span>
            </div>
            <Modal
                isOpen={modal}
                onRequestClose={() => setModal(false)}
                style={{
                    overlay: {
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        zIndex: 100,
                    },
                    content: {
                        width: "400px",
                        height: "500px",
                        margin: "auto",
                        borderRadius: "20px",
                        overflowX: "hidden",
                        boxShadow: "0 1px 2px rgba(0, 0, 0, 0.40)"
                    },
                }}
            >
                <TodoModal
                    id={id}
                    title={title}
                    setModal={setModal}
                    nickname={nickname}
                    created={created}
                    end={end}
                    todo={todo}
                />
            </Modal>
        </div>
    );
};

export default TodoList;