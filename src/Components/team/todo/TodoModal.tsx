import axios from "axios";
import { useParams } from "react-router-dom";

type TodoModalProps = {
    id: number
    title: string
    setModal: (isModal: boolean) => void
    nickname: string
    created: string
    end: string
    todo: string
}

const TodoModal = ({
    id,
    title,
    setModal,
    nickname,
    created,
    end,
    todo
}: TodoModalProps) => {

    const param = useParams();

    const putCompleteTodo = async () => {
        try {
            await axios.put(`/api/todo/modify/${param.teamId}/${id}`);
            setModal(false);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <div className="modal-top">
                <h1 className="modal-title">{title}</h1>
                <div className="modal-btn" onClick={() => putCompleteTodo()}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
            </div>
            <div className="modal-info">
                <span className="modal-nickname">{nickname}</span>
                <span className="modal-date">
                    {created} ~ {end}
                </span>
            </div>
            <div className="modal-content">{todo}</div>
        </>
    );
}

export default TodoModal;
