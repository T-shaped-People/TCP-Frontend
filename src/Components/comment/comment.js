import '../../styles/comment/comment.css';
import { Recomment } from '../../allFiles';
import { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios';
import { elapsedTime, MilliSecondTime } from '../../utils/date';

function PostComment({ postComment }) {
    return (
        <div>

        </div>
    )
}

export default function Comment({ postId, comment, deleteComment }) {
    const [input, setInput] = useState("");
    const [change, setChange] = useState(false);
    const createMarkup = () => {
        return { __html: comment.content };
    }

    const postComment = () => {
        setChange((prev) => !prev);
    }

    const hour = Number(comment.createdAt.substring(12, 13)) + 9;
    const realHour = Number(hour) < 10 ? "0" + String(hour) : String(hour);

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
    }

    return (
        <>
            <div className="read-comment" onClick={postComment} >
                <div className='read-comment-div'>
                    <img src={`https://auth.bssm.kro.kr/resource/user/profile/${comment.usercode}.png`} alt='유저 프로필' className='comment-profileImg'
                        onError={e => e.currentTarget.src = '/images/profile_default.png'} />
                    <div>
                        <p className="read-comment-nickname">{comment.nickname}</p>
                        <p className="read-comment-date">{elapsedTime(comment.createdAt, MilliSecondTime.MONTH)}</p>
                    </div>
                </div>
                <p className="read-comment-content" dangerouslySetInnerHTML={createMarkup()}></p>
                {comment.permission && <button onClick={(e) => {
                    deleteComment(comment.id);
                    e.stopPropagation();
                }} className="read-comment-delete">
                    삭제
                </button>}
                {change &&
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
                    </div>}
            </div>
            {comment.child && comment.child.map((value) => {
                if (value.deleted !== true) {
                    return <Recomment postId={postId} comment={value} deleteComment={deleteComment} />
                }
                else {
                    return <div className="deleted-comment">
                        <p>삭제된 댓글입니다.</p>
                    </div>
                }
            })}
        </>
    )
}