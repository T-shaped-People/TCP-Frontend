import '../../styles/comment/Recomment.css';
import styled from 'styled-components'
import axios from 'axios';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useState } from 'react';


const ReReadComment = styled.div`
    width: 100%;
    font-size: 15px;
    max-width: 65em;
    margin-left: ${(props) => props.depth * 20}px;
    /* margin-top: 20px; */
    overflow: scroll;
    position: relative;
    padding: 10px;
    border-radius: 10px;
    transition: .25s;
    cursor: pointer;
    &::-webkit-scrollbar{
        display: none;
    }
    &:hover{
        background-color: rgb(239, 239, 239);
    }
`

export default function Recomment({ postId, comment, deleteComment }) {
    const createMarkup = () => {
        return { __html: comment.content };
    }
    const created = comment.createdAt;
    const hour = Number(comment.createdAt.substring(12, 13)) + 9;
    const realHour = Number(hour) < 10 ? "0" + String(hour) : String(hour);
    const date = created.substring(0, 10) + " " + realHour + "시 " + created.substring(14, 16) + "분 " + created.substring(17, 19) + "초";
    const postComment = () => {
        setChange((prev) => !prev);
    }

    const [input, setInput] = useState("");
    const [change, setChange] = useState(false);
    const Reply = async () => {
        try {
            const response = await axios.post(`/api/board/comment/${postId}`, {
                depth: comment.depth + 1,
                parentId: comment.id,
                content: input
            })
            console.log(response)
        } catch (error) {
            console.log(error)
        }
        setChange(false);
    }


    return (
        <div>
            <ReReadComment onClick={() => postComment()} depth={comment.depth}>
                <div className='read-comment-div'>
                    <img src={`https://auth.bssm.kro.kr/resource/user/profile/${comment.usercode}.png`} alt='유저 프로필' className='comment-profileImg' />
                    <div>
                        <p className="read-comment-nickname">{comment.nickname}</p>
                        <p className="read-comment-date">{date}</p>
                    </div>
                </div >
                <p className="re-read-comment-content" dangerouslySetInnerHTML={createMarkup()}></p>
                {
                    comment.permission && <button onClick={() => deleteComment(comment.id)} className="re-read-comment-delete">
                        삭제
                    </button>
                }
                {
                    change &&
                    <div className="write-comment" onClick={(e) => e.stopPropagation()}>
                        <CKEditor
                            editor={ClassicEditor}
                            data={input}
                            onChange={(event, editor) => {
                                const data = editor.getData();
                                setInput(data);
                            }}
                        />
                        <button onClick={() => Reply()} className="write-comment-button">
                            작성
                        </button>
                    </div>
                }
            </ReReadComment >
            {
                comment.child && comment.child.map((value) => {
                    if (value.deleted !== true) {
                        return <Recomment postId={postId} comment={value} deleteComment={deleteComment} />
                    }
                    else {
                        return <div className="deleted-comment">
                            <p>삭제된 댓글입니다.</p>
                        </div>
                    }
                })
            }
        </div>
    )
}